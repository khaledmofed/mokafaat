# توجيه المستخدم بعد الدفع (Callback Flow)

## التدفق الحالي (المفترض)

1. **ميسر** يوجّه المتصفح إلى **صفحة عندك على الفرونت:**  
   `https://موقعك.com/orders/callback?id=xxx&status=paid&message=APPROVED`

2. **صفحة `/orders/callback`** (فرونت):
   - تعرض "جاري التحقق من الدفع..."
   - تستدعي **API الكول باك عندك:**  
     `GET /api/payment/callback?id=xxx&status=paid`
   - بحسب النتيجة:
     - إذا نجاح → توجيه إلى `/orders/success?...` (مع `order_id` من الرد إن وُجد)
     - إذا فشل أو خطأ من الـ API → توجيه إلى `/orders/failure?...`

3. المستخدم يشوف صفحة النجاح أو الفشل **على موقعك**.

لا حاجة أن الباكند يعيد توجيه (302). يكفي أن يرد بـ JSON (مثلاً `order_id`, `type`, `category`, `restaurant_id`) لاستخدامها في رابط النجاح.

---

## مطلوب من الباكند

- **`GET /api/payment/callback?id=...&status=...`**  
  يتحقق من الدفع، يحدّث الطلب، ويرد بـ **JSON** يحتوي مثلاً على:
  - `order_id`
  - `type` (مثل `offer`)
  - `category`, `restaurant_id` (للعروض)
- الفرونت يستخدم هذه القيم عند التوجيه لصفحة النجاح.

---

## إعداد ميسر (من الفرونت)

عند إنشاء الدفع (عروض)، الفرونت يمرّر لميسر:

- **callback_url** = `{أصل الموقع}/orders/callback`  
  (مثلاً `https://mokafaat.com/orders/callback` أو `http://localhost:5173/orders/callback`)

بهذا ميسر يوجّه المستخدم دائماً لصفحتك، وصفحتك تستدعي الـ API ثم توجّه للنجاح أو الفشل.
