/** Section index label — "№ · hairline · title", the ledger's voice. */
export function Label({ n, title }: { n: string; title: string }) {
  return (
    <div
      data-reveal
      className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.42em] text-ivory/45"
    >
      <span className="text-gold">{n}</span>
      <span className="h-px w-12 bg-hairline" aria-hidden />
      <span>{title}</span>
    </div>
  );
}
