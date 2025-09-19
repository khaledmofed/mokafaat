# InquiryModal - دليل الاستخدام

## نظرة عامة

`InquiryModal` هو مكون قابل لإعادة الاستخدام لعرض نموذج استفسار في جميع أنحاء الموقع. يمكن فتحه من أي مكان باستخدام Context.

## المميزات

- ✅ تصميم متجاوب
- ✅ حقول مطلوبة مع تحقق
- ✅ أيقونات لكل حقل
- ✅ قائمة دول شاملة
- ✅ قابل للتخصيص (العنوان والنص الفرعي)
- ✅ إدارة حالة عالمية

## كيفية الاستخدام

### 1. في أي مكون React:

```tsx
import { useInquiryModal } from "@context";

const MyComponent = () => {
  const { openModal } = useInquiryModal();

  const handleInquiryClick = () => {
    openModal("عنوان مخصص", "نص فرعي مخصص");
  };

  return <button onClick={handleInquiryClick}>استفسر الآن</button>;
};
```

### 2. فتح البوب أب مع عنوان افتراضي:

```tsx
const { openModal } = useInquiryModal();

// فتح مع العنوان والنص الفرعي الافتراضي
openModal();

// فتح مع عنوان مخصص
openModal("استفسار عن العقار");

// فتح مع عنوان ونص فرعي مخصص
openModal("استفسار عن الخدمة", "احصل على معلومات إضافية");
```

### 3. أمثلة على الاستخدام:

#### في بطاقة عقار:

```tsx
const handlePropertyInquiry = () => {
  openModal("استفسار عن العقار", `استفسر عن ${propertyTitle}`);
};
```

#### في صفحة الخدمات:

```tsx
const handleServiceInquiry = () => {
  openModal("استفسار عن الخدمة", "احصل على عرض سعر مجاني");
};
```

#### في صفحة الاستثمار:

```tsx
const handleInvestmentInquiry = () => {
  openModal("استفسار عن الاستثمار", "تعرف على الفرص الاستثمارية");
};
```

## الحقول المتاحة

| الحقل        | النوع    | مطلوب | الوصف                 |
| ------------ | -------- | ----- | --------------------- |
| Full Name    | text     | ✅    | الاسم الكامل          |
| Phone Number | tel      | ✅    | رقم الهاتف            |
| Email        | email    | ✅    | البريد الإلكتروني     |
| Country      | select   | ✅    | الدولة (قائمة منسدلة) |
| Message      | textarea | ✅    | رسالة الاستفسار       |

## التخصيص

### تغيير العنوان والنص الفرعي:

```tsx
openModal("عنوان مخصص", "نص فرعي مخصص");
```

### إضافة منطق إرسال مخصص:

يمكن تعديل `handleSubmit` في `InquiryModal.tsx` لإضافة منطق إرسال البيانات إلى API.

## الدول المدعومة

- Turkey
- UAE
- Saudi Arabia
- Kuwait
- Qatar
- Bahrain
- Oman
- Jordan
- Lebanon
- Egypt
- Other

## الأيقونات المستخدمة

- 👤 `IoPersonOutline` - الاسم
- 📞 `IoCallOutline` - الهاتف
- 📧 `IoMailOutline` - البريد الإلكتروني
- 📍 `IoLocationOutline` - الدولة
- ✉️ `IoPaperPlaneOutline` - إرسال الرسالة
- ❌ `IoClose` - إغلاق البوب أب

## التصميم

- خلفية شفافة سوداء
- تصميم أبيض مع حواف مدورة
- ظلال وتأثيرات بصرية
- متجاوب مع جميع أحجام الشاشات
- دعم RTL/LTR

## الأمان

- جميع الحقول مطلوبة
- تحقق من صحة البريد الإلكتروني
- تحقق من صحة رقم الهاتف
- منع إرسال النموذج الفارغ
