import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { StepShell } from "@/components/layout/StepShell";
import { FAMILIES, QUIZ, FAMILY_LABEL } from "@/lib/content";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/gracias")({
  head: () => ({
    meta: [
      { title: "¡Gracias! — Learning Experience Hub" },
      {
        name: "description",
        content: "Tu resumen personal de la capacitación Suite Ultra IP & Danaide.",
      },
      { property: "og:title", content: "¡Gracias! — Learning Experience Hub" },
      {
        property: "og:description",
        content: "Resumen personal del cierre de la capacitación de productos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Gracias,
});

function Gracias() {
  const navigate = useNavigate();
  const { state, setLastStep, reset } = useSession();

  useEffect(() => {
    if (!state.participant) navigate({ to: "/", replace: true });
  }, [state.participant, navigate]);

  useEffect(() => {
    setLastStep("/gracias");
  }, [setLastStep]);

  if (!state.participant) return null;

  const total = QUIZ.length;
  const correct = Object.values(state.quiz).filter((a) => a.correct).length;
  const pct = Math.round((correct / total) * 100);

  // Fortalezas y a reforzar según quiz por familia
  const familyResults = FAMILIES.map((f) => {
    const qs = QUIZ.filter((q) => q.family === f.id);
    const ok = qs.filter((q) => state.quiz[q.id]?.correct).length;
    return { family: f, ok, total: qs.length, confidence: state.confidence[f.id] ?? 0 };
  });
  const strong = familyResults.filter((r) => r.total > 0 && r.ok === r.total);
  const reinforce = familyResults.filter((r) => r.total > 0 && r.ok < r.total);

  const message =
    pct === 100
      ? "¡Dominás la Suite de punta a punta!"
      : pct >= 66
        ? "¡Muy buen resultado! Ya tenés el panorama claro."
        : pct >= 40
          ? "Buen arranque — con un repaso más lo tenés."
          : "No pasa nada: el material queda disponible para repasar.";

  return (
    <StepShell
      step={4}
      kicker="Experiencia completada"
      title={`¡Gracias, ${state.participant.nombre}!`}
      subtitle={message}
    >
      <div className="space-y-6">
        <div className="glow-primary rounded-2xl border border-primary/30 bg-card p-6 text-center">
          <p className="font-mono-display text-xs tracking-widest text-muted-foreground uppercase">
            Resultado del quiz
          </p>
          <p className="mt-2 text-6xl font-bold text-primary">
            {correct}
            <span className="text-2xl text-muted-foreground">/{total}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{pct}% de aciertos</p>
        </div>

        {strong.length > 0 && (
          <div className="rounded-2xl border border-success/40 bg-success/10 p-5">
            <h3 className="mb-2 font-semibold text-foreground">💪 Familias que dominás</h3>
            <div className="flex flex-wrap gap-2">
              {strong.map((r) => (
                <span
                  key={r.family.id}
                  className="rounded-full px-3 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: `var(--color-${r.family.colorVar})`,
                    color: `var(--color-${r.family.colorVar}-foreground)`,
                  }}
                >
                  {FAMILY_LABEL[r.family.id]}
                </span>
              ))}
            </div>
          </div>
        )}

        {reinforce.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-2 font-semibold text-foreground">📌 Para reforzar</h3>
            <ul className="space-y-2">
              {reinforce.map((r) => (
                <li key={r.family.id} className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{FAMILY_LABEL[r.family.id]}:</span>{" "}
                  {r.family.products.map((p) => p.name).join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Tu feedback ya quedó registrado y nos ayuda a mejorar la próxima capacitación.
        </p>

        <button
          type="button"
          onClick={() => {
            reset();
            navigate({ to: "/" });
          }}
          className="w-full rounded-xl border border-input bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Volver al inicio
        </button>
      </div>
    </StepShell>
  );
}
