import { IconChevronRight } from "./Icons";

function WalletRow({ item, onSelect, active }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`group flex w-full items-center gap-4 border-b border-zinc-200 py-4 text-left transition hover:bg-zinc-100 last:border-none ${
        active ? "bg-zinc-100" : ""
      }`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white text-xs font-bold text-black">
        {item.logo ? (
          <img
            src={item.logo}
            alt={`${item.name} logo`}
            loading="lazy"
            className="h-7 w-7 rounded-full object-contain"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              const fallback = event.currentTarget.nextElementSibling;
              if (fallback) fallback.style.display = "inline";
            }}
          />
        ) : null}
        <span style={{ display: item.logo ? "none" : "inline" }}>
          {item.monogram}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-zinc-900">
          {item.name}
        </span>
        <span className="block text-xs text-zinc-500">
          {active ? "Connected" : "Tap to connect"}
        </span>
      </span>
      <IconChevronRight className="h-4 w-4 shrink-0 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-zinc-900" />
    </button>
  );
}

export default WalletRow;
