declare global {
  interface Window {
    Moyasar?: {
      init: (config: Record<string, unknown>) => void;
    };
  }
}

// سكربت وستايل ميسر من jsDelivr (بديل عن CDN ميسر عند حدوث AccessDenied)
// https://www.jsdelivr.com/package/npm/moyasar-payment-form
const MOYASAR_CSS_URL =
  import.meta.env.VITE_MOYASAR_CSS_URL ||
  "https://cdn.jsdelivr.net/npm/moyasar-payment-form@2.2.7/dist/moyasar.css";
const MOYASAR_SCRIPT_SRC =
  import.meta.env.VITE_MOYASAR_SCRIPT_URL ||
  "https://cdn.jsdelivr.net/npm/moyasar-payment-form@2.2.7/dist/moyasar.umd.min.js";

let moyasarPromise: Promise<typeof window.Moyasar> | null = null;

async function loadMoyasarScript(): Promise<typeof window.Moyasar> {
  if (typeof window === "undefined") {
    throw new Error("Moyasar can only be used in the browser.");
  }
  if (window.Moyasar) {
    return window.Moyasar;
  }
  if (!moyasarPromise) {
    moyasarPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${MOYASAR_SCRIPT_SRC}"]`
      );
      if (existing) {
        existing.addEventListener("load", () => resolve(window.Moyasar!));
        existing.addEventListener("error", () =>
          reject(new Error("Failed to load Moyasar script"))
        );
        return;
      }
      // تحميل الـ CSS أولاً
      const existingCss = document.querySelector<HTMLLinkElement>(
        `link[href="${MOYASAR_CSS_URL}"]`
      );
      if (!existingCss) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = MOYASAR_CSS_URL;
        document.head.appendChild(link);
      }
      const script = document.createElement("script");
      script.src = MOYASAR_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve(window.Moyasar!);
      script.onerror = () =>
        reject(new Error("Failed to load Moyasar script"));
      document.head.appendChild(script);
    });
  }
  return moyasarPromise;
}

export interface MoyasarPaymentConfig {
  amountHalala: number;
  currency: string;
  description: string;
  publishableKey: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
  elementSelector?: string;
  methods?: string[];
  /** شبكات البطاقات المدعومة — حسب التوثيق: visa, mastercard, mada, amex */
  supportedNetworks?: string[];
}

/**
 * تهيئة نموذج الدفع من ميسر باستخدام publishable key و metadata و callback_url.
 * لا يتعامل مع إنشاء الـ payment نفسه، بل يفتح الفورم حسب توثيق ميسر.
 */
export async function initMoyasarPayment(config: MoyasarPaymentConfig) {
  const Moyasar = await loadMoyasarScript();
  if (!Moyasar?.init) {
    throw new Error("Moyasar is not available on window.");
  }

  const element = config.elementSelector ?? ".mysr-form";
  const amount = Math.max(100, Math.floor(config.amountHalala));

  Moyasar.init({
    element,
    amount,
    currency: config.currency || "SAR",
    description: config.description,
    publishable_api_key: config.publishableKey,
    callback_url: config.callbackUrl,
    methods: config.methods ?? ["creditcard"],
    supported_networks: config.supportedNetworks ?? ["visa", "mastercard", "mada"],
    metadata: config.metadata ?? {},
  });
}

export {};

