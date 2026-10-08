import type { ReactNode } from "react";

export const STEPS = [
  { path: "/", label: "Inicio" },
  { path: "/experiencia", label: "Suite" },
  { path: "/quiz", label: "Quiz" },
  { path: "/feedback", label: "Feedback" },
  { path: "/gracias", label: "Cierre" },
] as const;

interface StepShellProps {
  step: number; // 0..4
  kicker?: string;
  title: string;
  subtitle?: string | undefined;
  children: ReactNode;
  wide?: boolean;
}

export function StepShell({ step, kicker, title, subtitle, children, wide = true }: StepShellProps) {
  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="surface-grid min-h-screen bg-background">
      <div
        className={`mx-auto flex min-h-screen w-full ${
          wide ? "max-w-[80rem]" : "max-w-2xl"
        } flex-col px-5 py-6 sm:px-8`}
      >
        <header className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono-display text-xs tracking-widest text-primary uppercase">
              Ultra IP · Learning Experience Hub
            </span>
            <span className="font-mono-display text-xs text-muted-foreground">
              {step + 1}/{STEPS.length}
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 hidden justify-between sm:flex">
            {STEPS.map((s, i) => (
              <span
                key={s.path}
                className={`font-mono-display text-[10px] tracking-wide uppercase ${
                  i <= step ? "text-primary" : "text-muted-foreground/50"
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </header>

        <main className="animate-step-in flex-1" key={step}>
          {kicker && (
            <p className="mb-2 flex items-center justify-start gap-2 font-mono-display text-xs tracking-widest text-muted-foreground uppercase">
              <span className="animate-pulse-dot inline-flex h-1.5 w-1.5 justify-start rounded-full bg-primary" />
              {kicker}
            </p>
          )}
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </main>

        <footer className="mt-10 border-t border-border pt-4">
          <p className="text-center font-mono-display text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            Danaide · Suite Ultra IP — Capacitación de productos
          </p>
        </footer>
      </div>
    </div>
  );
}
