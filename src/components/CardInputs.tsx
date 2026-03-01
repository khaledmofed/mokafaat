import React from "react";
import {
  formatCardNumber,
  validateCardNumber,
  formatExpiry,
  validateExpiry,
  formatCVV,
  validateCVV,
  sanitizeCardholderName,
  validateCardholderName,
} from "@utils/cardInput";

const errorMessagesEn: Record<string, string> = {
  "رقم البطاقة قصير": "Card number is too short",
  "رقم البطاقة طويل": "Card number is too long",
  "رقم البطاقة غير صالح": "Invalid card number",
  "أدخل MM/YY": "Enter MM/YY",
  "شهر غير صالح": "Invalid month",
  "البطاقة منتهية الصلاحية": "Card has expired",
  "CVV غير مكتمل": "CVV incomplete",
  "CVV غير صالح": "Invalid CVV",
  "أدخل اسم حامل البطاقة": "Enter cardholder name",
  "الاسم قصير جداً": "Name is too short",
};

function translateError(msg: string, isRTL: boolean): string {
  if (!isRTL && errorMessagesEn[msg]) return errorMessagesEn[msg];
  return msg;
}

export interface CardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  isRTL?: boolean;
}

export function CardNumberInput({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "1234 5678 9012 3456",
  label,
  className = "",
  required,
  isRTL = false,
}: CardNumberInputProps) {
  const [touched, setTouched] = React.useState(false);
  const validation = validateCardNumber(value);
  const showError = error ?? (touched && validation !== true ? translateError(validation, isRTL) : undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatCardNumber(e.target.value));
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={22}
        dir="ltr"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-left ${showError ? "border-red-500" : "border-gray-300"} ${className}`}
        style={{ direction: "ltr" }}
        aria-invalid={!!showError}
        aria-describedby={showError ? "card-number-error" : undefined}
      />
      {showError && (
        <p id="card-number-error" className="mt-1 text-sm text-red-600" role="alert">
          {showError}
        </p>
      )}
    </div>
  );
}

export interface ExpiryInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  isRTL?: boolean;
}

export function ExpiryInput({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "MM/YY",
  label,
  className = "",
  required,
  isRTL = false,
}: ExpiryInputProps) {
  const [touched, setTouched] = React.useState(false);
  const validation = validateExpiry(value);
  const showError = error ?? (touched && validation !== true ? translateError(validation, isRTL) : undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatExpiry(e.target.value));
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type="text"
        inputMode="numeric"
        autoComplete="cc-exp"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={5}
        dir="ltr"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-left ${showError ? "border-red-500" : "border-gray-300"} ${className}`}
        style={{ direction: "ltr" }}
        aria-invalid={!!showError}
        aria-describedby={showError ? "expiry-error" : undefined}
      />
      {showError && (
        <p id="expiry-error" className="mt-1 text-sm text-red-600" role="alert">
          {showError}
        </p>
      )}
    </div>
  );
}

export interface CVVInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  isRTL?: boolean;
}

export function CVVInput({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "123",
  label,
  className = "",
  required,
  isRTL = false,
}: CVVInputProps) {
  const [touched, setTouched] = React.useState(false);
  const validation = validateCVV(value);
  const showError = error ?? (touched && validation !== true ? translateError(validation, isRTL) : undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatCVV(e.target.value));
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type="text"
        inputMode="numeric"
        autoComplete="cc-csc"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={4}
        dir="ltr"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-left ${showError ? "border-red-500" : "border-gray-300"} ${className}`}
        style={{ direction: "ltr" }}
        aria-invalid={!!showError}
        aria-describedby={showError ? "cvv-error" : undefined}
      />
      {showError && (
        <p id="cvv-error" className="mt-1 text-sm text-red-600" role="alert">
          {showError}
        </p>
      )}
    </div>
  );
}

export interface CardholderNameInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  isRTL?: boolean;
}

export function CardholderNameInput({
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  label,
  className = "",
  required,
  isRTL = false,
}: CardholderNameInputProps) {
  const [touched, setTouched] = React.useState(false);
  const validation = validateCardholderName(value);
  const showError = error ?? (touched && validation !== true ? translateError(validation, isRTL) : undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(sanitizeCardholderName(e.target.value));
  };

  const handleBlur = () => {
    setTouched(true);
    onChange(sanitizeCardholderName(value));
    onBlur?.();
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type="text"
        autoComplete="cc-name"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${showError ? "border-red-500" : "border-gray-300"} ${className}`}
        aria-invalid={!!showError}
        aria-describedby={showError ? "cardholder-error" : undefined}
      />
      {showError && (
        <p id="cardholder-error" className="mt-1 text-sm text-red-600" role="alert">
          {showError}
        </p>
      )}
    </div>
  );
}

/** تحقق من كل الحقول قبل submit */
export function validateCardForm(values: {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const cn = validateCardNumber(values.cardNumber);
  const ex = validateExpiry(values.expiry);
  const cv = validateCVV(values.cvv);
  const ch = validateCardholderName(values.cardholderName);
  if (cn !== true) errors.cardNumber = cn;
  if (ex !== true) errors.expiry = ex;
  if (cv !== true) errors.cvv = cv;
  if (ch !== true) errors.cardholderName = ch;
  return { valid: Object.keys(errors).length === 0, errors };
}
