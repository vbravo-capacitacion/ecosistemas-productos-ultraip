import { useState } from "react";
import type { Family } from "@/lib/content";
import { ScaleInput } from "@/components/forms/ScaleInput";

interface FamilyCardProps {
  family: Family;
  confidence: number;
  onConfidence: (value: number) => void;
}

export function FamilyCard({ family, confidence, onConfidence }: FamilyCardProps) {
  const [open, setOpen] = useState(false);
  const c = family.colorVar;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-secondary/40"
      >
        <span
          className="h-10 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: `var(--color-${c})` }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-card-foreground">{family.name}</h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{family.headline}</p>
        </div>
        <span
          className={`font-mono-display text-xs text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="animate-step-in space-y-4 border-t border-border p-5">
          {family.products.map((p) => (
            <article key={p.id} className="rounded-xl bg-secondary/50 p-4">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h4 className="font-semibold text-card-foreground">{p.name}</h4>
                <span className="font-mono-display text-xs" style={{ color: `var(--color-${c})` }}>
                  {p.tagline}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
            </article>
          ))}

          <div className="rounded-xl border border-border p-4">
            <p className="mb-3 text-sm font-medium text-card-foreground">
              ¿Cuánto recordás de esta familia?
            </p>
            <ScaleInput
              value={confidence}
              onChange={onConfidence}
              lowLabel="Casi nada"
              highLabel="Muy claro"
            />
          </div>
        </div>
      )}
    </section>
  );
}
