import { supabase } from "@/integrations/supabase/client";
import type { SessionState } from "@/hooks/use-session";
import { QUIZ } from "@/lib/content";

export async function saveSession(state: SessionState) {
    const p = state.participant;
    if (!p) throw new Error("Sin participante");

    const sessionId = crypto.randomUUID();
    const correct = Object.values(state.quiz).filter((a) => a.correct).length;

    const { error: e1 } = await supabase.from("onboarding_sessions").insert({
        id: sessionId,
        onboarding_name: "onboarding productos",
        first_name: p.nombre,
        last_name: p.apellido,
        area: p.area,
        feedback_clarity: state.feedback.claridad,
        feedback_usefulness: state.feedback.utilidad,
        feedback_confidence: state.feedback.confianzaAplicar,
        feedback_nps: state.feedback.nps!,
        feedback_comment: state.feedback.mejora || null,
        quiz_score: correct,
        quiz_total: QUIZ.length,
        started_at: p.startedAt,
    });
    if (e1) throw e1;

    const reviews = Object.entries(state.confidence).map(([family_id, rating]) => ({
        session_id: sessionId, family_id, rating,
    }));
    const answers = Object.entries(state.quiz).map(([question_id, a]) => ({
        session_id: sessionId, question_id,
        selected_option: a.selected, is_correct: a.correct,
    }));

    const [r, q] = await Promise.all([
        supabase.from("family_reviews").insert(reviews),
        supabase.from("quiz_answers").insert(answers),
    ]);
    if (r.error) throw r.error;
    if (q.error) throw q.error;
}
