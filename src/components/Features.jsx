import { IconBolt, IconGlobe, IconLayers, IconShield } from "./Icons";

const features = [
  {
    icon: IconShield,
    title: "Audited & secure",
    description:
      "Every supported wallet and exchange passes rigorous security review and continuous monitoring before it reaches you.",
  },
  {
    icon: IconBolt,
    title: "Instant connection",
    description:
      "Connect once and switch between wallets and exchanges without repeated approvals, redirects, or lost session state.",
  },
  {
    icon: IconLayers,
    title: "Unified dashboard",
    description:
      "Track balances, positions, and activity across every connected protocol from a single, unified view.",
  },
  {
    icon: IconGlobe,
    title: "Cross-chain native",
    description:
      "Built on a chain-agnostic core so your identity and assets move with you across 14 supported networks.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="border-t border-zinc-200 bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Why DappToken
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Built for speed, security, and scale
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            A single, uncompromising foundation for interacting with the
            decentralized applications you rely on every day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-7 transition duration-300 hover:border-zinc-300 hover:bg-zinc-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900 transition group-hover:bg-zinc-900 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-zinc-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
