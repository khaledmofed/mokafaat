import ReactFlagsSelect from "react-flags-select";
import { useEffect, useMemo, useState } from "react";

type CountryOption = {
  /** ISO2 upper-case */
  value: string;
  /** Select display text */
  text: string;
};

type CountryMeta = {
  name: string;
  dial: string; // numeric string e.g. "966"
};

type Props = {
  value: string; // numeric string, e.g. "966"
  onChange: (nextCountryCode: string) => void;
  className?: string;
};

function buildDial(root?: string, suffixes?: string[]): string | null {
  const r = (root ?? "").replace(/\D/g, "");
  const s = (suffixes?.[0] ?? "").replace(/\D/g, "");
  const dial = `${r}${s}`.replace(/\D/g, "");
  return dial ? dial : null;
}

export default function CountryCodeSelect({ value, onChange, className }: Props) {
  const [options, setOptionsState] = useState<CountryOption[]>([]);
  const [metaByIso, setMetaByIso] = useState<Record<string, CountryMeta>>({});

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd",
      );
      const resp = (await res.json()) as any[];

      const metas: Record<string, CountryMeta> = {};
      const opts: CountryOption[] = [];

      for (const c of resp ?? []) {
        const iso = String(c?.cca2 ?? "").toUpperCase();
        if (!iso || iso.length !== 2) continue;

        const dial = buildDial(c?.idd?.root, c?.idd?.suffixes);
        if (!dial) continue;

        const name = String(c?.name?.common ?? "").trim();
        metas[iso] = { name: name || iso, dial };
        opts.push({ value: iso, text: `${metas[iso].name}  +${dial}` });
      }

      opts.sort((a, b) => {
        const am = metas[a.value]?.name ?? a.value;
        const bm = metas[b.value]?.name ?? b.value;
        return am.localeCompare(bm, "en");
      });

      setMetaByIso(metas);
      setOptionsState(opts);
    })().catch(() => {
      // fallback minimal
      setMetaByIso({ SA: { name: "Saudi Arabia", dial: "966" } });
      setOptionsState([{ value: "SA", text: "Saudi Arabia  +966" }]);
    });
  }, []);

  const selectedIso = useMemo(() => {
    const target = String(value ?? "").replace(/\D/g, "");
    if (!target) return "SA";

    const found = Object.entries(metaByIso).find(([, m]) => m.dial === target);
    return (found?.[0] ?? "SA").toUpperCase();
  }, [metaByIso, value]);

  return (
    <div className={className}>
      <ReactFlagsSelect
        selected={selectedIso}
        countries={options.map((o) => o.value)}
        customLabels={Object.fromEntries(options.map((o) => [o.value, o.text]))}
        showSelectedLabel
        showOptionLabel
        searchable
        searchPlaceholder="ابحث عن الدولة..."
        onSelect={(iso: string) => {
          const nextDial = metaByIso[String(iso).toUpperCase()]?.dial;
          if (nextDial) onChange(nextDial);
        }}
        className="country-code-flags-select"
      />
    </div>
  );
}

