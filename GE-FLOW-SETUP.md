# إعداد خط Readex Pro

تم تحديث المشروع لاستخدام خط Readex Pro للعربية بدلاً من Readex Pro.

## الملفات المطلوبة

يجب إضافة ملفات خط Readex Pro التالية إلى مجلد `src/assets/fonts/`:

- `GE-Flow-Regular.ttf` (الوزن العادي - 400)
- `GE-Flow-Bold.ttf` (الوزن الغامق - 700)
- `GE-Flow-Light.ttf` (الوزن الخفيف - 300)
- `GE-Flow-Medium.ttf` (الوزن المتوسط - 500)

## التغييرات المطبقة

### 1. ملف CSS (`src/index.css`)

- تم إضافة تعريفات `@font-face` لخط Readex Pro
- تم تحديث جميع المراجع للعربية لاستخدام Readex Pro

### 2. ملف Tailwind Config (`tailwind.config.js`)

- تم تحديث `readex-pro` ليشير إلى Readex Pro
- تم إضافة `ge-flow` كاسم جديد للخط

### 3. ملفات المكونات

- تم تحديث جميع الملفات التي تستخدم `Readex Pro` لاستخدام `Readex Pro`

## كيفية الاستخدام

بعد إضافة ملفات الخط، يمكنك استخدام الخط بالطرق التالية:

### في Tailwind CSS:

```html
<div class="font-readex-pro">نص بالعربية</div>
<div class="font-ge-flow">نص بالعربية</div>
```

### في CSS المباشر:

```css
.my-text {
  font-family: "Readex Pro", sans-serif;
}
```

### في React Components:

```jsx
<div style={{ fontFamily: "Readex Pro, sans-serif" }}>نص بالعربية</div>
```

## ملاحظات مهمة

1. تأكد من أن ملفات الخط متوافقة مع حقوق الطبع والنشر
2. تأكد من أن الملفات في صيغة TTF أو WOFF2
3. بعد إضافة الملفات، قم بإعادة تشغيل خادم التطوير
4. تحقق من أن الخط يظهر بشكل صحيح في المتصفح
