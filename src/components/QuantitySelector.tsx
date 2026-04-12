import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiMinus, FiPlus } from "react-icons/fi";

type QuantitySelectorProps = {
  maxQty: number;
  onQuantityChange: (q: number) => void;
};

/**
 * Self-contained quantity selector. Uses pointer events so it works
 * with both mouse and touch; state lives here to avoid parent re-render issues.
 */
export default function QuantitySelector({
  maxQty,
  onQuantityChange,
}: QuantitySelectorProps) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity, onQuantityChange]);

  const handleDecrement = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrement = () => {
    setQuantity((q) => Math.min(maxQty, q + 1));
  };

  const handlePointerDown = (
    e: React.PointerEvent,
    action: "increment" | "decrement"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (action === "increment") handleIncrement();
      else handleDecrement();
    });
  };

  return (
    <div
      className="flex items-center justify-center gap-4 my-8 select-none relative z-10"
      style={{ touchAction: "manipulation" }}
      role="group"
      aria-label={t("common.quantityAria")}
    >
      <button
        type="button"
        onPointerDown={(e) => handlePointerDown(e, "decrement")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="relative z-10 w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 active:scale-95 transition-all cursor-pointer shrink-0 border-0"
        aria-label={t("common.decreaseQuantityAria")}
      >
        <FiMinus className="text-white pointer-events-none" />
      </button>
      <span
        className="relative z-10 w-12 text-center font-medium text-lg tabular-nums min-w-[3rem]"
        data-quantity={quantity}
      >
        {quantity}
      </span>
      <button
        type="button"
        onPointerDown={(e) => handlePointerDown(e, "increment")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="relative z-10 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 active:scale-95 transition-all cursor-pointer shrink-0 border-0"
        aria-label={t("common.increaseQuantityAria")}
      >
        <FiPlus className="pointer-events-none" />
      </button>
    </div>
  );
}
