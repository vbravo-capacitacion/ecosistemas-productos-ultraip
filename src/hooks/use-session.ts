import { useCallback, useEffect, useState } from "react";

export interface Participant {
  nombre: string;
  apellido: string;
  area: string;
  startedAt: string;
}

export interface SessionState {
  participant: Participant | null;
  confidence: Record<string, number>; // familyId -> 1..5
  quiz: Record<string, { selected: number; correct: boolean }>; // questionId -> answer
  feedback: {
    claridad: number;
    utilidad: number;
    confianzaAplicar: number;
    nps: number | null;
    mejora: string;
  };
  lastStep: string;
}

const KEY = "lxh-session-v1";

const initialState: SessionState = {
  participant: null,
  confidence: {},
  quiz: {},
  feedback: { claridad: 0, utilidad: 0, confianzaAplicar: 0, nps: null, mejora: "" },
  lastStep: "/",
};

function load(): SessionState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return initialState;
    return { ...initialState, ...JSON.parse(raw) };
  } catch {
    return initialState;
  }
}

export function useSession() {
  const [state, setState] = useState<SessionState>(load);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable — non-fatal for the MVP
    }
  }, [state]);

  const setParticipant = useCallback((participant: Participant) => {
    setState((s) => ({ ...s, participant, lastStep: "/experiencia" }));
  }, []);

  const setConfidence = useCallback((familyId: string, value: number) => {
    setState((s) => ({ ...s, confidence: { ...s.confidence, [familyId]: value } }));
  }, []);

  const answerQuiz = useCallback((questionId: string, selected: number, correct: boolean) => {
    setState((s) =>
      s.quiz[questionId] ? s : { ...s, quiz: { ...s.quiz, [questionId]: { selected, correct } } },
    );
  }, []);

  const setFeedback = useCallback((patch: Partial<SessionState["feedback"]>) => {
    setState((s) => ({ ...s, feedback: { ...s.feedback, ...patch } }));
  }, []);

  const setLastStep = useCallback((step: string) => {
    setState((s) => ({ ...s, lastStep: step }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    try {
      window.sessionStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
  }, []);

  return { state, setParticipant, setConfidence, answerQuiz, setFeedback, setLastStep, reset };
}
