# إعداد سكربت ميسر محلياً (اختياري)

التطبيق يستخدم حالياً **jsDelivr** لتحميل مكتبة ميسر (سكربت + CSS)، فلا تحتاج عادةً لخطوات إضافية.

إذا ظهرت رسالة **"تعذر تحميل بوابة الدفع"** (مثلاً بسبب حجب jsDelivr)، يمكنك استضافة السكربت والستايل محلياً.

## الخطوات

### 1. تحميل الملفات

- **السكربت:**  
  https://cdn.jsdelivr.net/npm/moyasar-payment-form@2.2.7/dist/moyasar.umd.min.js  
  احفظه باسم **moyasar.umd.min.js** (أو **moyasar.min.js**).

- **الستايل:**  
  https://cdn.jsdelivr.net/npm/moyasar-payment-form@2.2.7/dist/moyasar.css  
  احفظه باسم **moyasar.css**.

### 2. وضع الملفات في المشروع

- انسخ **moyasar.umd.min.js** (أو moyasar.min.js) و **moyasar.css** داخل مجلد **public**:
  ```
  public/moyasar.umd.min.js
  public/moyasar.css
  ```

### 3. تفعيل المسارات المحلية

- في ملف **.env** أضف (أو عدّل):
  ```
  VITE_MOYASAR_SCRIPT_URL=/moyasar.umd.min.js
  VITE_MOYASAR_CSS_URL=/moyasar.css
  ```

### 4. إعادة تشغيل السيرفر

- أوقف سيرفر التطوير (إن كان يعمل) ثم شغّله من جديد:
  ```bash
  npm run dev
  ```

بعد ذلك جرّب عملية الاشتراك والدفع؛ يفترض أن يُحمَّل السكربت من موقعك وتظهر فورم ميسر.

---

**ملاحظة:** التكامل الافتراضي يستخدم jsDelivr (`moyasar-payment-form@2.2.7`). لا تحتاج لاستضافة محلية إلا إذا فشل تحميل هذه الروابط من شبكتك.
