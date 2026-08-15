const steps = [
  {
    step: "01",
    title: "Pick your wallet",
    description:
      "Choose from 20+ supported wallets and exchanges — MetaMask, Coinbase, Trust Wallet, and more.",
  },
  {
    step: "02",
    title: "Approve the connection",
    description:
      "Authenticate securely from your wallet or exchange app — we never see your keys or credentials.",
  },
  {
    step: "03",
    title: "You're connected",
    description:
      "Manage balances, positions, and activity across every connected account from one dashboard.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-zinc-200 bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Get started
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Three steps to get connected
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent md:block" />
          {steps.map((item) => (
            <div key={item.step} className="relative flex flex-col items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-sm font-semibold text-zinc-900">
                {item.step}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-zinc-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
