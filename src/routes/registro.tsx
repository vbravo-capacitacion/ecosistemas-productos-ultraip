import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { StepShell } from "@/components/layout/StepShell";
import { AREAS } from "@/lib/content";
import { useSession } from "@/hooks/use-session";

const PAGE_TITLE = "Contanos quién sos";
const PAGE_SUBTITLE = "Así podemos personalizar tu recorrido.";
const CONTINUE_LABEL = "Continuar con el feedback →";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Registro — Danaide - Ultra IP" },
      {
        name: "description",
        content: "Ingresá tus datos para continuar con la capacitación de Danaide - Ultra IP.",
      },
    ],
  }),
  component: Registration,
});

function Registration() {
  const navigate = useNavigate();
  const { state, setParticipant } = useSession();
  const [nombre, setNombre] = useState(state.participant?.nombre ?? "");
  const [apellido, setApellido] = useState(state.participant?.apellido ?? "");
  const [area, setArea] = useState(state.participant?.area ?? "");
  const [touched, setTouched] = useState(false);

  const errors = {
    nombre: nombre.trim().length < 2 ? "Ingresá tu nombre" : "",
    apellido: apellido.trim().length < 2 ? "Ingresá tu apellido" : "",
    area: !area ? "Elegí tu área" : "",
  };
  const valid = !errors.nombre && !errors.apellido && !errors.area;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!valid) return;

    setParticipant({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      area,
      startedAt: new Date().toISOString(),
    });
    navigate({ to: "/experiencia" });
  };

  const inputClass =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary";

  return (
    <StepShell
      step={0}
      kicker="Antes de empezar"
      title={PAGE_TITLE}
      subtitle={PAGE_SUBTITLE}
      wide
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-foreground">
              Nombre
            </label>
            <input
              id="nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              maxLength={60}
              placeholder="María"
              className={inputClass}
              autoComplete="given-name"
            />
            {touched && errors.nombre && (
              <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>
            )}
          </div>
          <div>
            <label htmlFor="apellido" className="mb-1.5 block text-sm font-medium text-foreground">
              Apellido
            </label>
            <input
              id="apellido"
              value={apellido}
              onChange={(event) => setApellido(event.target.value)}
              maxLength={60}
              placeholder="González"
              className={inputClass}
              autoComplete="family-name"
            />
            {touched && errors.apellido && (
              <p className="mt-1 text-xs text-destructive">{errors.apellido}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-foreground">
            Área
          </label>
          <select
            id="area"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className={`${inputClass} ${!area ? "text-muted-foreground/60" : ""}`}
          >
            <option value="" disabled>
              Seleccioná tu área…
            </option>
            {AREAS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touched && errors.area && <p className="mt-1 text-xs text-destructive">{errors.area}</p>}
        </div>

        <button
          type="submit"
          className="glow-primary mt-2 w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
        >
          {CONTINUE_LABEL}
        </button>
      </form>
    </StepShell>
  );
}
