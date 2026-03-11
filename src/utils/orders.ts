/**
 * Normalize GET /api/orders response to a unified list for the Orders page.
 * Spec: data.orders.active.orders + data.orders.finished.orders (or legacy data.orders / array).
 */
export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  type: "offer" | "card" | "booking";
  itemId: string;
  companyId?: string;
  title: { ar: string; en: string };
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  addedAt: string;
}

export interface NormalizedOrder {
  id: string;
  orderNumber?: string;
  orderType?: "offer" | "card";
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  completedAt?: string;
  /** من الـ API للتفاصيل والـ voucher */
  activationCode?: string;
  qrCodeUrl?: string;
  voucherUrl?: string;
  usedAt?: string;
  item?: Record<string, unknown>;
  merchant?: Record<string, unknown>;
}

const STATUS_MAP: Record<string, OrderStatus> = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
  canceled: "cancelled",
  active: "confirmed",
  delivered: "completed",
};

function toStatus(s: unknown): OrderStatus {
  const key = String(s ?? "").toLowerCase().trim();
  return STATUS_MAP[key] ?? "pending";
}

function normalizeOrderItem(row: unknown, index: number): OrderItem {
  const r = (row || {}) as Record<string, unknown>;
  const id = String(r.id ?? r.item_id ?? `item_${index}`);
  const titleAr = (r.name_ar ?? r.title_ar ?? r.title ?? r.name ?? "—") as string;
  const titleEn = (r.name_en ?? r.title_en ?? r.title ?? r.name ?? "—") as string;
  const image = (r.image ?? r.logo ?? r.thumbnail ?? "") as string;
  const price = typeof r.price === "number" ? r.price : parseFloat(String(r.price ?? 0)) || 0;
  const quantity = typeof r.quantity === "number" ? r.quantity : parseInt(String(r.quantity ?? 1), 10) || 1;
  return {
    id,
    type: (r.type as OrderItem["type"]) ?? "offer",
    itemId: String(r.item_id ?? r.favorable_id ?? r.id ?? id),
    companyId: r.company_id != null ? String(r.company_id) : undefined,
    title: { ar: String(titleAr), en: String(titleEn) },
    image: typeof image === "string" ? image : "",
    price,
    originalPrice: typeof r.original_price === "number" ? r.original_price : undefined,
    quantity,
    addedAt: (r.created_at ?? r.added_at ?? new Date().toISOString()) as string,
  };
}

function normalizeOrderRow(row: unknown): NormalizedOrder | null {
  const r = row as Record<string, unknown> | undefined;
  if (!r || typeof r !== "object") return null;
  const id = r.id ?? r.order_id ?? r.order_number;
  if (id == null) return null;

  const rawItems = r.items ?? r.order_items ?? r.line_items ?? [];
  const itemList = Array.isArray(rawItems) ? rawItems : [];
  let items: OrderItem[] = itemList.map((item, i) => normalizeOrderItem(item, i));
  if (items.length === 0 && (r.item_name || r.title || r.name)) {
    items.push(
      normalizeOrderItem(
        {
          id: r.item_id ?? r.id,
          name_ar: r.item_name_ar ?? r.name_ar ?? r.title_ar ?? r.item_name ?? r.title ?? r.name,
          name_en: r.item_name_en ?? r.name_en ?? r.title_en ?? r.item_name ?? r.title ?? r.name,
          image: r.item_image ?? r.image ?? r.logo,
          price: r.price ?? r.total ?? r.amount,
          quantity: r.quantity ?? 1,
        },
        0
      )
    );
  }
  if (items.length === 0 && r.item && typeof r.item === "object") {
    const itemObj = r.item as Record<string, unknown>;
    items.push(
      normalizeOrderItem(
        {
          id: itemObj.id ?? r.item_id ?? r.id,
          name_ar: itemObj.name,
          name_en: itemObj.name,
          image: itemObj.image ?? "",
          price: itemObj.price_after ?? r.total_price ?? r.price ?? 0,
          quantity: r.quantity ?? 1,
        },
        0
      )
    );
  }

  const total = r.total ?? r.total_amount ?? r.total_price ?? r.amount ?? r.price ?? 0;
  const totalAmount = typeof total === "number" ? total : parseFloat(String(total)) || 0;
  const paymentMethod = (r.payment_method ?? r.payment_method_name ?? r.method ?? "—") as string;
  const createdAt = (r.created_at ?? r.date ?? r.order_date ?? new Date().toISOString()) as string;
  const completedAt = (r.completed_at ?? r.delivered_at ?? r.updated_at) as string | undefined;

  return {
    id: String(id),
    orderNumber: r.order_number != null ? String(r.order_number) : undefined,
    orderType: (r.order_type as NormalizedOrder["orderType"]) ?? undefined,
    items,
    totalAmount,
    status: toStatus(r.status),
    paymentMethod: String(paymentMethod),
    createdAt: String(createdAt),
    completedAt: completedAt != null ? String(completedAt) : undefined,
    activationCode: r.activation_code != null ? String(r.activation_code) : undefined,
    qrCodeUrl: typeof r.qr_code_url === "string" ? r.qr_code_url : undefined,
    voucherUrl: typeof r.voucher_url === "string" ? r.voucher_url : undefined,
    usedAt: r.used_at != null ? String(r.used_at) : undefined,
    item: r.item && typeof r.item === "object" ? (r.item as Record<string, unknown>) : undefined,
    merchant: r.merchant && typeof r.merchant === "object" ? (r.merchant as Record<string, unknown>) : undefined,
  };
}

export function normalizeOrdersList(data: unknown): NormalizedOrder[] {
  const raw = (data as Record<string, unknown>)?.data ?? data;
  let list: unknown[] = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (raw && typeof raw === "object") {
    const ordersBlock = (raw as Record<string, unknown>).orders;
    if (ordersBlock && typeof ordersBlock === "object") {
      const active = (ordersBlock as Record<string, unknown>).active;
      const finished = (ordersBlock as Record<string, unknown>).finished;
      const activeList = Array.isArray((active as Record<string, unknown>)?.orders)
        ? (active as Record<string, unknown>).orders as unknown[]
        : [];
      const finishedList = Array.isArray((finished as Record<string, unknown>)?.orders)
        ? (finished as Record<string, unknown>).orders as unknown[]
        : [];
      list = [...activeList, ...finishedList];
    } else {
      const arr =
        (raw as Record<string, unknown>).data ??
        (raw as Record<string, unknown>).orders ??
        (raw as Record<string, unknown>).list;
      list = Array.isArray(arr) ? arr : [];
    }
  }
  return list.map(normalizeOrderRow).filter(Boolean) as NormalizedOrder[];
}
