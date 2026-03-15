import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMembershipVerify } from "@hooks/api/useMokafaatQueries";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { AxiosError } from "axios";
import { LogoLight } from "@assets";

const CARD_GRADIENT = "linear-gradient(180deg, #6A0DAD 0%, #4B0082 100%)";
const PURPLE_DEEP = "#4B0082";

function formatDigitsSpaced(raw: string) {
  const d = String(raw).replace(/\D/g, "");
  if (!d) return raw;
  const parts: string[] = [];
  let i = d.length;
  while (i > 0) {
    parts.unshift(d.slice(Math.max(0, i - 3), i));
    i -= 3;
  }
  return parts.join(" ");
}

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

/** ترجمة حالة الاشتراك للإظهار بالعربي */
function translateStatus(status: string): string {
  const s = String(status || "")
    .toLowerCase()
    .trim();
  const map: Record<string, string> = {
    active: "فعال",
    expired: "منتهي",
    cancelled: "ملغي",
    canceled: "ملغي",
    pending: "قيد الانتظار",
    suspended: "موقوف",
    inactive: "غير فعال",
  };
  return map[s] || status || "—";
}

/** بيانات العضو بعد تطبيعها من استجابة API */
interface NormalizedMember {
  fullName: string;
  membershipNumber: string;
  idNumber: string;
  isActive: boolean;
  status: string;
  planName: string;
  startDate: string;
  endDate: string;
  walletBalance?: number;
  pointsBalance?: number;
  hasActiveSubscription?: boolean;
}

/** تطبيع استجابة GET /api/membership/verify/{membership_number} */
function normalizeVerifyResponse(data: unknown): NormalizedMember | null {
  if (!data || typeof data !== "object") return null;
  const raw = data as Record<string, unknown>;
  // الهيكل الفعلي: data.membership { membership_number, member_name, is_active, status, ... }
  const membership = raw.membership as Record<string, unknown> | undefined;
  const user = (raw.user ?? raw.member ?? raw) as
    | Record<string, unknown>
    | undefined;
  const sub = (raw.subscription ?? raw.sub) as
    | Record<string, unknown>
    | undefined;

  const membershipNumber = String(
    membership?.membership_number ??
      user?.membership_number ??
      raw.membership_number ??
      raw.membershipNumber ??
      "",
  ).trim();
  if (!membershipNumber) return null;

  const fullName = String(
    membership?.member_name ??
      user?.member_name ??
      user?.first_name ??
      user?.firstName ??
      "",
  ).trim();
  const fullNameFallback =
    [String(user?.first_name ?? ""), String(user?.last_name ?? "")]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    (user?.name as string) ||
    (user?.full_name as string) ||
    "";
  const displayName = fullName || fullNameFallback || "—";

  const idNumber = String(
    membership?.id_number ??
      user?.id_number ??
      user?.idNumber ??
      raw.id_number ??
      membershipNumber,
  ).trim();

  const status = String(
    membership?.status ?? sub?.status ?? raw.status ?? "active",
  ).toLowerCase();
  const isActive =
    membership?.is_active === true || status === "active" || status === "فعال";

  const planName = String(
    membership?.plan_name ?? sub?.plan_name ?? raw.plan_name ?? "",
  ).trim();
  const startDate = String(
    membership?.start_date ?? sub?.start_date ?? raw.start_date ?? "",
  ).trim();
  const endDate = String(
    membership?.end_date ?? sub?.end_date ?? raw.end_date ?? "",
  ).trim();

  const userMeta = raw.user_meta as Record<string, unknown> | undefined;
  const walletBalance =
    userMeta?.wallet_balance != null
      ? Number(userMeta.wallet_balance)
      : undefined;
  const pointsBalance =
    userMeta?.points_balance != null
      ? Number(userMeta.points_balance)
      : undefined;
  const hasActiveSubscription =
    userMeta && "has_active_subscription" in userMeta
      ? Boolean(userMeta.has_active_subscription)
      : undefined;

  return {
    fullName: displayName,
    membershipNumber,
    idNumber,
    isActive,
    status,
    planName,
    startDate,
    endDate,
    walletBalance,
    pointsBalance,
    hasActiveSubscription,
  };
}

/** صف عرض في البطاقة: تسمية + قيمة */
function CardRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number | undefined;
  mono?: boolean;
}) {
  const v = value === undefined || value === null ? "—" : String(value);
  return (
    <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-b border-gray-100 py-2 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span
        className={
          mono
            ? "font-mono text-sm font-semibold text-gray-800"
            : "text-sm font-medium text-gray-800"
        }
      >
        {v}
      </span>
    </div>
  );
}

/** بطاقة عرض بيانات العضو (نفس تصميم بطاقة البروفايل) */
function MembershipVerifyCard({
  fullName,
  membershipNumber,
  idNumber,
  isActive,
  status,
  planName,
  startDate,
  endDate,
  walletBalance,
  pointsBalance,
  hasActiveSubscription,
}: NormalizedMember) {
  const proofLine = idNumber || membershipNumber;
  const displayBig = formatDigitsSpaced(membershipNumber);
  const qrValue = useMemo(
    () =>
      JSON.stringify({
        type: "mokafaat_member",
        membership_number: membershipNumber,
      }),
    [membershipNumber],
  );
  const qrSrc = useMemo(() => {
    const enc = encodeURIComponent(qrValue);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data=${enc}`;
  }, [qrValue]);

  return (
    <div
      className="mx-auto max-w-sm rounded-2xl px-3 py-4 shadow-xl sm:px-4 sm:py-5"
      style={{
        backgroundImage: CARD_GRADIENT,
        backgroundAttachment: "fixed",
      }}
      dir="rtl"
    >
      <div
        className="rounded-t-2xl px-4 py-3.5 text-center text-white sm:py-4"
        style={{
          backgroundImage: CARD_GRADIENT,
          backgroundAttachment: "fixed",
        }}
      >
        <h3 className="text-base font-bold tracking-wide sm:text-lg">
          البطاقة التعريفية
        </h3>
      </div>
      <div className="relative overflow-hidden rounded-b-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] sm:rounded-b-3xl">
        <div
          className="pointer-events-none absolute left-0 top-1/2 z-10 h-9 w-4 -translate-y-1/2 rounded-r-full sm:h-10 sm:w-5"
          style={{
            marginLeft: "-2px",
            backgroundImage: CARD_GRADIENT,
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-1/2 z-10 h-9 w-4 -translate-y-1/2 rounded-l-full sm:h-10 sm:w-5"
          style={{
            marginRight: "-2px",
            backgroundImage: CARD_GRADIENT,
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
          aria-hidden
        />

        <div className="px-5 pb-8 pt-5 text-center sm:px-6 sm:pb-10 sm:pt-6">
          <p className="mb-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
            تستخدم هذه البطاقة في الدفع للمتاجر
          </p>

          <div className="mb-5 flex justify-center sm:mb-6">
            <img
              src={qrSrc}
              alt=""
              width={200}
              height={200}
              className="block h-[180px] w-[180px] sm:h-[200px] sm:w-[200px]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="my-4 border-t border-dashed border-gray-300 sm:my-5" />

          <p className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
            {fullName || "—"}
          </p>
          <p className="mb-4 text-xs text-gray-600 sm:text-sm">
            رقم إثبات /{" "}
            <span className="font-mono font-semibold text-gray-800">
              {proofLine}
            </span>
          </p>

          <p
            className="mb-4 font-mono text-2xl font-bold leading-snug sm:text-2xl"
            style={{
              wordBreak: "break-word",
              color: PURPLE_DEEP,
            }}
          >
            {displayBig}
          </p>

          <div className="mb-5 rounded-xl bg-gray-50 px-4 py-3 text-right">
            <CardRow label="حالة الاشتراك" value={translateStatus(status)} />
            <CardRow label="اسم الباقة" value={planName} />
            <CardRow label="تاريخ البداية" value={formatDate(startDate)} />
            <CardRow label="تاريخ النهاية" value={formatDate(endDate)} />
            {walletBalance !== undefined && (
              <CardRow label="رصيد المحفظة" value={walletBalance} mono />
            )}
            {pointsBalance !== undefined && (
              <CardRow label="رصيد النقاط" value={pointsBalance} mono />
            )}
            {hasActiveSubscription !== undefined && (
              <CardRow
                label="اشتراك فعّال"
                value={hasActiveSubscription ? "نعم" : "لا"}
              />
            )}
          </div>

          {/* حالة البطاقة — فعالة (أخضر) أو منتهية (رمادي) */}
          <div
            className={`mx-auto flex max-w-[150px] flex-col items-center gap-1 rounded-2xl px-5 py-4 ${
              isActive ? "" : "bg-gray-100"
            }`}
            style={isActive ? { backgroundColor: "#EAF8EE" } : undefined}
          >
            <div
              className={`flex items-center justify-center rounded-xl p-2 ${
                isActive ? "" : "bg-gray-200"
              }`}
              style={
                isActive
                  ? { backgroundColor: "rgb(4 120 87 / 15%)" }
                  : undefined
              }
            >
              {isActive ? (
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M16 2.5L5.5 6.2v7.8c0 6.2 4.3 12 10.5 13.5 6.2-1.5 10.5-7.3 10.5-13.5V6.2L16 2.5z"
                    fill="#047857"
                  />
                  <path
                    d="M14 16.2l2.2 2.2 4.8-4.8"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              )}
            </div>
            <span className="text-[11px] text-gray-500 sm:text-xs">
              حالة البطاقة
            </span>
            <span
              className={`text-base font-bold sm:text-lg ${
                isActive ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {isActive ? "فعالة" : "الحالة منتهية"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const MembershipVerifyPage: React.FC = () => {
  const { membershipNumber } = useParams<{ membershipNumber: string }>();
  const { data, isLoading, isError, error } = useMembershipVerify(
    membershipNumber?.trim(),
  );

  const member = useMemo(() => {
    const raw = data as Record<string, unknown> | undefined;
    const payload = raw?.data ?? raw;
    return normalizeVerifyResponse(payload);
  }, [data]);

  return (
    <>
      <Helmet>
        <title>التحقق من العضوية — مكافآت</title>
      </Helmet>
      <div
        className="min-h-screen px-4 py-8 sm:py-12"
        style={{
          backgroundImage: CARD_GRADIENT,
          backgroundAttachment: "fixed",
        }}
        dir="rtl"
      >
        <div className="mb-0 flex justify-center">
          <img
            src={LogoLight}
            alt="مكافآت"
            className="h-12 object-contain sm:h-14"
          />
        </div>
        {isLoading && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && isError && (
          <div className="mx-auto max-w-md rounded-2xl bg-white/95 p-6 text-center shadow-xl backdrop-blur sm:p-8">
            <p className="text-lg font-semibold text-gray-800">
              تعذر التحقق من العضوية
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {error instanceof AxiosError && error.response?.status === 404
                ? "رقم العضوية غير موجود أو انتهى الاشتراك."
                : "حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقاً."}
            </p>
          </div>
        )}

        {!isLoading && !isError && member && (
          <MembershipVerifyCard {...member} />
        )}

        {!isLoading && !isError && data && !member && (
          <div className="mx-auto max-w-md rounded-2xl bg-white/95 p-6 text-center shadow-xl backdrop-blur sm:p-8">
            <p className="text-lg font-semibold text-gray-800">
              بيانات غير كاملة
            </p>
            <p className="mt-2 text-sm text-gray-600">
              استجابة الخادم لا تحتوي على رقم عضوية صالح.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MembershipVerifyPage;
