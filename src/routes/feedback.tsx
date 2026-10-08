import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { StepShell } from "@/components/layout/StepShell";
import { ScaleInput } from "@/components/forms/ScaleInput";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Tu feedback — Learning Experience Hub" },
      {
        name: "description",
        content:
          "Contanos qué te pareció la charla de la Suite Ultra IP: claridad, utilidad y qué mejorarías.",
      },
      { property: "og:title", content: "Tu feedback — Learning Experience Hub" },
      {
        property: "og:description",
        content: "Feedback medible de la capacitación de productos Suite Ultra IP & Danaide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Feedback,
});

function Feedback() {
  const navigate = useNavigate();
  const { state, setFeedback, setLastStep } = useSession();
  const { feedback } = state;

  useEffect(() => {
    if (!state.participant) navigate({ to: "/", replace: true });
  }, [state.participant, navigate]);

  useEffect(() => {
    setLastStep("/feedback");
  }, [setLastStep]);

  if (!state.participant) return null;

  const complete =
    feedback.claridad > 0 &&
    feedback.utilidad > 0 &&
    feedback.confianzaAplicar > 0 &&
    feedback.nps !== null;

  return (
    <StepShell
      step={3}
      kicker="Tu opinión cuenta"
      title="¿Qué te pareció la charla?"
      subtitle="4 escalas rápidas y un comentario opcional. Es anónimo para el resto del equipo: solo se analiza en conjunto."
    >
      <div className="space-y-7">
        <div>
          <p className="mb-3 font-medium text-foreground">¿Qué tan clara te resultó la charla?</p>
          <ScaleInput
            value={feedback.claridad}
            onChange={(v) => setFeedback({ claridad: v })}
            lowLabel="Nada clara"
            highLabel="Muy clara"
          />
        </div>

        <div>
          <p className="mb-3 font-medium text-foreground">
            ¿Qué tan útil es lo aprendido para tu rol?
          </p>
          <ScaleInput
            value={feedback.utilidad}
            onChange={(v) => setFeedback({ utilidad: v })}
            lowLabel="Poco útil"
            highLabel="Muy útil"
          />
        </div>

        <div>
          <p className="mb-3 font-medium text-foreground">
            ¿Cuánta confianza tenés para explicar la Suite a un cliente o compañero?
          </p>
          <ScaleInput
            value={feedback.confianzaAplicar}
            onChange={(v) => setFeedback({ confianzaAplicar: v })}
            lowLabel="Poca confianza"
            highLabel="Mucha confianza"
          />
        </div>

        <div>
          <p className="mb-3 font-medium text-foreground">
            ¿Qué tan probable es que recomiendes esta capacitación a un compañero? (0–10)
          </p>
          <div className="flex flex-wrap justify-around gap-1.5">
            {Array.from({ length: 11 }, (_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFeedback({ nps: n })}
                className={`h-10 w-10 rounded-lg border font-mono-display text-sm font-semibold transition-all duration-150 ${
                  feedback.nps === n
                    ? "animate-pop border-primary bg-primary text-primary-foreground glow-primary"
                    : "border-input bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Nada probable</span>
            <span>Muy probable</span>
          </div>
        </div>

        <div>
          <label htmlFor="mejora" className="mb-1.5 block font-medium text-foreground">
            ¿Qué mejorarías para la próxima?{" "}
            <span className="text-muted-foreground">(opcional)</span>
          </label>
          <textarea
            id="mejora"
            value={feedback.mejora}
            onChange={(e) => setFeedback({ mejora: e.target.value.slice(0, 500) })}
            rows={3}
            maxLength={500}
            placeholder="Más ejemplos en vivo, más tiempo para preguntas…"
            className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary"
          />
        </div>

        <button
          type="button"
          disabled={!complete}
          onClick={() => navigate({ to: "/gracias" })}
          className={`w-full rounded-xl px-6 py-3.5 font-semibold transition-all duration-150 ${
            complete
              ? "glow-primary bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.99]"
              : "cursor-not-allowed bg-muted text-muted-foreground"
          }`}
        >
          {complete ? "Enviar y ver mi resumen →" : "Completá las 4 escalas para continuar"}
        </button>
      </div>
    </StepShell>
  );
}
