
/* carita sonriente de saludo */
const AVATAR_LABEL = "Hola";


export function FloatingAvatar() {
  return (
    <div
      role="img"
      aria-label={AVATAR_LABEL}
      className="fixed bottom-8 right-8 hidden h-28 w-28 items-center justify-center rounded-full bg-brand/55 p-3 min-[860px]:flex"
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-brand text-ink">
        <span aria-hidden="true" className="relative -mt-1 text-xl tracking-[0.2em]">
          <img className="w-auto h-6 object-cover" src="/uip-1.png" alt="Ultra IP" />
        </span>
      </div>
    </div>
  );
}
