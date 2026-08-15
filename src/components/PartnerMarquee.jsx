const partners = [
  "Ethereum",
  "Arbitrum",
  "Optimism",
  "Base",
  "Polygon",
  "Avalanche",
  "zkSync",
  "Solana",
];

function PartnerMarquee() {
  const items = [...partners, ...partners];

  return (
    <div className="border-y border-zinc-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Integrated across the ecosystem
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-16">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xl font-semibold tracking-tight text-zinc-700"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnerMarquee;
