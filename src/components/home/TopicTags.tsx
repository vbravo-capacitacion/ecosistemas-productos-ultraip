const TOPIC_ROTATIONS = [
  "-rotate-[7deg]",
  "rotate-[3deg]",
  "-rotate-[15deg]",
  "rotate-[5deg]",
  "-rotate-[2deg]",
  "rotate-[6deg]",
  "-rotate-[9deg]",
  "rotate-[2deg]",
  "-rotate-[4deg]",
  "rotate-[1deg]",
  "-rotate-[11deg]",
  "rotate-[4deg]",
] as const;

export const TOPICS = [
  "Control Center",
  "Central de Alarmas",
  "ANPR",
  "ALPR",
  "TVF",
  "Biblioteca Digital",
  "Configurator",
  "PTZ",
  "Cámara Fija",
  "Domo",
  "Reconocimiento Facial",
  "Mobile",
] as const;

export function TopicTags() {
  return (
    <section
      id="capacitaciones"
      aria-label="Temas de capacitación"
      className="mt-16 max-w-4xl sm:mt-20"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-5">
        {TOPICS.map((topic, index) => (
          <span
            key={topic}
            className={`rounded-full border px-5 py-2.5 text-[15px] shadow-soft ${
              TOPIC_ROTATIONS[index]
            } ${
              index % 2 === 0
                ? "border-ink bg-ink text-paper"
                : "border-ink/35 bg-transparent text-ink"
            }`}
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}
