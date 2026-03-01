/**
 * تنسيق وتحقق حقول البطاقة حسب المعايير المعتمدة.
 * لا نرسل البيانات للباكند؛ الدفع الفعلي عبر ميسر.
 */

const CARD_NUMBER_MAX_LENGTH = 19;
const EXPIRY_LENGTH = 5; // MM/YY
const CVV_MIN_LENGTH = 3;
const CVV_MAX_LENGTH = 4;

/** تنسيق رقم البطاقة: أرقام فقط، مجموعات من 4، حد أقصى 19 رقم */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, CARD_NUMBER_MAX_LENGTH);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

/** استخراج الأرقام فقط من رقم البطاقة (للمقارنة/التحقق) */
export function getCardNumberDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** خوارزمية Luhn للتحقق من صحة رقم البطاقة */
export function luhnCheck(cardNumber: string): boolean {
  const digits = getCardNumberDigits(cardNumber);
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i]!, 10);
    if (isEven) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

export function validateCardNumber(value: string): true | string {
  const digits = getCardNumberDigits(value);
  if (digits.length < 13) return "رقم البطاقة قصير";
  if (digits.length > 19) return "رقم البطاقة طويل";
  if (!luhnCheck(value)) return "رقم البطاقة غير صالح";
  return true;
}

/** تنسيق تاريخ الانتهاء: MM/YY، إدخال / تلقائياً بعد شهرين */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export function validateExpiry(value: string): true | string {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 4) return "أدخل MM/YY";
  const month = parseInt(digits.slice(0, 2), 10);
  if (month < 1 || month > 12) return "شهر غير صالح";
  const year = 2000 + parseInt(digits.slice(2, 4), 10);
  const exp = new Date(year, month, 0);
  if (exp.getTime() < Date.now()) return "البطاقة منتهية الصلاحية";
  return true;
}

/** تنسيق CVV: أرقام فقط، 3 أو 4 */
export function formatCVV(value: string): string {
  return value.replace(/\D/g, "").slice(0, CVV_MAX_LENGTH);
}

export function validateCVV(value: string): true | string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < CVV_MIN_LENGTH) return "CVV غير مكتمل";
  if (digits.length > CVV_MAX_LENGTH) return "CVV غير صالح";
  return true;
}

/** تنقية اسم حامل البطاقة: حروف، مسافات، شرطة، apostrophe */
export function sanitizeCardholderName(value: string): string {
  return value
    .replace(/[^\p{L}\p{N}\s\-']/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateCardholderName(value: string): true | string {
  const s = sanitizeCardholderName(value);
  if (!s.length) return "أدخل اسم حامل البطاقة";
  if (s.length < 2) return "الاسم قصير جداً";
  return true;
}

export const CARD_INPUT = {
  cardNumberMaxLength: CARD_NUMBER_MAX_LENGTH,
  expiryLength: EXPIRY_LENGTH,
  cvvMinLength: CVV_MIN_LENGTH,
  cvvMaxLength: CVV_MAX_LENGTH,
} as const;
