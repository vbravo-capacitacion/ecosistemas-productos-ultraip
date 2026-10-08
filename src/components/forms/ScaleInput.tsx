interface ScaleInputProps {
  value: number; // 0 = sin responder
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
}

export function ScaleInput({
  value,
  onChange,
  min = 1,
  max = 5,
  lowLabel = "Poco",
  highLabel = "Mucho",
}: ScaleInputProps) {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div>
      <div className="flex flex-wrap justify-around gap-2">
        {options.map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`h-11 w-11 rounded-xl border font-mono-display text-sm font-semibold transition-all duration-150 ${
                active
                  ? "animate-pop border-primary bg-primary text-primary-foreground glow-primary"
                  : "border-input bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
