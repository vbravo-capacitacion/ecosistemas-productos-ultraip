import { ArrowUpRight } from "lucide-react";

const EYEBROW = "Capacitaciones";
const TITLE_UNDERLINE = "Tu opinión";
const TITLE_LEAD = "nos ayuda a mejorar";
const TITLE_SERIF = "cada capacitación";
const BUTTON_LABEL = "Dar feedback";

type HeroProps = {
  onSubmit: () => void;
};

export function Hero({ onSubmit }: HeroProps) {
  return (
    <section className="max-w-[780px]">
      <p className="mb-7 text-sm font-medium tracking-wide text-ink/65">{EYEBROW}
        <img className="h-6 w-auto" src="./danaide.png" alt="Danaide" />
        <img className="h-6 w-auto" src="./ultra-ip.png" alt="UltraIP" />
      </p>
      <h1 className="max-w-[820px] text-[clamp(3.2rem,8vw,7.4rem)] font-semibold leading-[0.95] tracking-[-0.075em]">
        <span className="underline-wave">{TITLE_UNDERLINE}</span> {TITLE_LEAD}{" "}
        <span className="font-serif font-medium tracking-[-0.065em]">{TITLE_SERIF}</span>
      </h1>

      <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-3 rounded-full  px-6  max-w-full px-6 md:px[150px]text-paper shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" style={{ backgroundColor: "var(--color-brand)", color: "black", fontSize: "1.35rem", fontWeight: "800", wordSpacing: "3px" }}
        >
          {BUTTON_LABEL}
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.7} />
        </button>
      </div>
    </section>
  );
}
