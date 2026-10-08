import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { StepShell } from "@/components/layout/StepShell";
import { FamilyCard } from "@/components/experience/FamilyCard";
import { FAMILIES } from "@/lib/content";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/experiencia")({
  head: () => ({
    meta: [
      { title: "Mapa de la Suite — Learning Experience Hub" },
      {
        name: "description",
        content:
          "Repasá las 4 familias de productos de la Suite Ultra IP: Infraestructura, Administración, Identificación e Inteligencia.",
      },
      { property: "og:title", content: "Mapa de la Suite — Learning Experience Hub" },
      {
        property: "og:description",
        content: "Las 4 familias de productos de la Suite Ultra IP en un mapa interactivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Experiencia,
});

function Experiencia() {
  const navigate = useNavigate();
  const { state, setConfidence, setLastStep } = useSession();

  useEffect(() => {
    if (!state.participant) navigate({ to: "/", replace: true });
  }, [state.participant, navigate]);

  useEffect(() => {
    setLastStep("/experiencia");
  }, [setLastStep]);

  if (!state.participant) return null;

  const answered = FAMILIES.filter((f) => (state.confidence[f.id] ?? 0) > 0).length;
  const allAnswered = answered === FAMILIES.length;

  return (
    <StepShell
      step={1}
      kicker="Mapa de la suite"
      title={`Hola ${state.participant.nombre} — repasemos la Suite`}
      subtitle="Una sola plataforma: todo nace y se administra desde el Control Center. Abrí cada familia, repasá sus productos y contanos cuánto recordás."
      wide
    >
      <div className="space-y-4">
        {FAMILIES.map((family) => (
          <FamilyCard
            key={family.id}
            family={family}
            confidence={state.confidence[family.id] ?? 0}
            onConfidence={(v) => setConfidence(family.id, v)}
          />
        ))}
      </div>

      <div className="mt-8">
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => navigate({ to: "/quiz" })}
          className={`w-full rounded-xl px-6 py-3.5 font-semibold transition-all duration-150 ${
            allAnswered
              ? "glow-primary bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.99]"
              : "cursor-not-allowed bg-muted text-muted-foreground"
          }`}
        >
          {allAnswered
            ? "Ir al mini-quiz →"
            : `Auto-evaluate en las 4 familias para continuar (${answered}/4)`}
        </button>
      </div>
    </StepShell>
  );
}
