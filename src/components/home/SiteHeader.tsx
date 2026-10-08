const NAV_ITEMS = [
  { label: "Capacitaciones", href: "#capacitaciones" },
  { label: "Feedback", href: "/registro" },
  { label: "Contacto", href: "/contacto" },
] as const;

const BRAND_NAME = "Danaide - Ultra IP";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-5 px-6 pt-6 sm:px-10 sm:pt-7 lg:px-14">
      <a
        href="/"
        aria-label={BRAND_NAME}
        className="inline-flex min-h-10 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <span className="text-lg font-bold tracking-tight">{BRAND_NAME}</span>
      </a>

      <nav aria-label="Navegación principal" className="flex flex-wrap gap-2">
        {NAV_ITEMS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
