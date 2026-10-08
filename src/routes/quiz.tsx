import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StepShell } from "@/components/layout/StepShell";
import { QUIZ, FAMILY_LABEL } from "@/lib/content";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Mini-quiz — Learning Experience Hub" },
      {
        name: "description",
        content: "Poné a prueba lo aprendido sobre la Suite Ultra IP con 6 preguntas rápidas.",
      },
      { property: "og:title", content: "Mini-quiz — Learning Experience Hub" },
      {
        property: "og:description",
        content: "6 preguntas rápidas sobre las familias de productos de la Suite Ultra IP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Quiz,
});

function Quiz() {
  const navigate = useNavigate();
  const { state, answerQuiz, setLastStep } = useSession();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!state.participant) navigate({ to: "/", replace: true });
  }, [state.participant, navigate]);

  useEffect(() => {
    setLastStep("/quiz");
  }, [setLastStep]);

  if (!state.participant) return null;

  const question = QUIZ[index] ?? QUIZ[0]!;
  const answer = state.quiz[question.id];
  const isLast = index === QUIZ.length - 1;
  const correctCount = Object.values(state.quiz).filter((a) => a.correct).length;

  const select = (optionIndex: number) => {
    if (answer) return;
    answerQuiz(question.id, optionIndex, optionIndex === question.correctIndex);
  };

  const next = () => {
    if (isLast) navigate({ to: "/feedback" });
    else setIndex((i) => i + 1);
  };

  return (
    <StepShell
      step={2}
      kicker={`Pregunta ${index + 1} de ${QUIZ.length} · ${FAMILY_LABEL[question.family]}`}
      title={question.question}
      subtitle={!answer ? "Elegí una opción. El feedback es inmediato." : undefined}
    >
      <div className="space-y-3" key={question.id}>
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = answer?.selected === i;
          let cls =
            "border-input bg-card text-foreground hover:border-primary/60 hover:bg-secondary/40";
          if (answer) {
            if (isCorrect) cls = "border-success bg-success/15 text-foreground";
            else if (isSelected) cls = "border-destructive bg-destructive/15 text-foreground";
            else cls = "border-border bg-card text-muted-foreground opacity-60";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => select(i)}
              disabled={!!answer}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${cls}`}
            >
              <span className="font-mono-display flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm font-medium sm:text-base">{option}</span>
              {answer && isCorrect && <span className="ml-auto text-success">✓</span>}
              {answer && isSelected && !isCorrect && (
                <span className="ml-auto text-destructive">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {answer && (
        <div className="animate-step-in mt-6 space-y-5">
          <div
            className={`rounded-xl border p-4 text-sm leading-relaxed ${
              answer.correct
                ? "border-success/40 bg-success/10 text-foreground"
                : "border-destructive/40 bg-destructive/10 text-foreground"
            }`}
          >
            <strong>{answer.correct ? "¡Correcto! " : "Casi. "}</strong>
            {question.reinforcement}
          </div>
          <button
            type="button"
            onClick={next}
            className="glow-primary w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
          >
            {isLast
              ? `Ver mi resultado (${correctCount}/${QUIZ.length}) →`
              : "Siguiente pregunta →"}
          </button>
        </div>
      )}
    </StepShell>
  );
}
