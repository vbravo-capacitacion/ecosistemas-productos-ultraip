import { Sparkles } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

const CARD_DETAILS = [
  { label: "Ecosistema", value: "Danaide - Ultra IP" },
  { label: "Experiencia", value: "25 años" },
  {
    label: "Objetivo",
    value: "Software factory de seguridad urbana pública y privada",
  },
] as const;

const CARD_CTA = "Escribinos";
const CONTACT_HREF = "/contacto";

export function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipOnKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsFlipped((current) => !current);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] pb-9 pt-24 min-[860px]:mt-3">
      <p className="absolute right-0 top-12 rotate-[7deg] font-hand text-2xl text-brand">
        conocé Danaide
      </p>
      <p className="absolute -right-2 bottom-6 rotate-[-8deg] font-hand text-2xl text-brand">
        ¡girala!
      </p>
      <div className="absolute left-1/2 top-0 h-24 w-[3px] -translate-x-1/2 bg-ink" aria-hidden />
      <div className="perspective-distant">
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          aria-label={isFlipped ? "Girar tarjeta al frente" : "Girar tarjeta para conocer Danaide"}
          onClick={() => setIsFlipped((current) => !current)}
          onKeyDown={flipOnKey}
          className={`relative h-[390px] w-full cursor-pointer transform-3d rounded-[1.75rem] transition-transform duration-700 motion-reduce:transition-none ${
            isFlipped ? "rotate-y-180" : "-rotate-[3deg]"
          } focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.75rem] border-[8px] border-white bg-paper p-8 text-center shadow-soft backface-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.2rem] border border-ink/5">
              <span className="text-3xl font-bold tracking-[-0.07em]">Danaide - Ultra IP</span>
              <div className="mt-10 flex items-center gap-3">
                <Sparkles aria-hidden="true" size={18} strokeWidth={1.7} />
                <span className="text-xl font-medium tracking-tight">Bienvenidos</span>
                <Sparkles aria-hidden="true" size={18} strokeWidth={1.7} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col rounded-[1.75rem] border-[8px] border-white bg-paper p-7 shadow-soft backface-hidden rotate-y-180">
            <div className="flex flex-1 flex-col justify-center">
              {CARD_DETAILS.map(({ label, value }) => (
                <div key={label} className="border-b border-dotted border-ink/35 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
                    {label}
                  </p>
                  <p className="mt-1 text-sm leading-snug">{value}</p>
                </div>
              ))}
            </div>
            <a
              href={CONTACT_HREF}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {CARD_CTA}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
