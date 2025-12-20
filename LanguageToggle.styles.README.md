# ستايلات LanguageToggle Component

هذا الملف يحتوي على جميع الستايلات المستخدمة في كومبوننت `LanguageToggle` محولة من Tailwind CSS إلى CSS عادي.

## 📁 الملفات

- `LanguageToggle.styles.css` - ملف CSS يحتوي على جميع الستايلات

## 🚀 كيفية الاستخدام

### 1. إضافة ملف CSS إلى مشروعك

```html
<link rel="stylesheet" href="LanguageToggle.styles.css">
```

أو في React/Next.js:

```javascript
import './LanguageToggle.styles.css';
```

### 2. استخدام الستايلات في HTML/JSX

#### Container الرئيسي
```html
<div class="language-toggle-container">
  <!-- محتوى الكومبوننت -->
</div>
```

#### زر التبديل الرئيسي
```html
<button class="language-toggle-button">
  <div class="language-toggle-globe">
    <IoGlobeOutline class="language-toggle-globe-icon" />
  </div>
  <div class="language-toggle-separator"></div>
  <div class="language-toggle-flag-container">
    <img src="flag.png" alt="Flag" class="language-toggle-flag-image" />
  </div>
</button>
```

#### Dropdown Menu
```html
<div class="language-toggle-dropdown" dir="rtl">
  <!-- محتوى القائمة -->
</div>
```

#### Tabs (التبويبات)
```html
<div class="language-toggle-tabs">
  <button class="language-toggle-tab active">
    <span class="language-toggle-tab-text">اللغات</span>
  </button>
  <button class="language-toggle-tab">
    <span class="language-toggle-tab-text">البلد</span>
  </button>
</div>
```

#### قائمة اللغات
```html
<div class="language-toggle-content">
  <button class="language-toggle-item active" dir="rtl">
    <div class="language-toggle-item-flag">
      <img src="flag.png" class="language-toggle-item-flag-image" />
    </div>
    <div class="language-toggle-item-info">
      <div class="language-toggle-item-name">العربية</div>
      <div class="language-toggle-item-subtitle">المملكة العربية السعودية</div>
    </div>
  </button>
</div>
```

#### Grid البلدان
```html
<div class="language-toggle-countries-grid">
  <button class="language-toggle-country-item" dir="rtl">
    <div class="language-toggle-country-flag">
      <img src="flag.png" class="language-toggle-country-flag-image" />
    </div>
    <div class="language-toggle-country-info">
      <div class="language-toggle-country-name">السعودية</div>
      <div class="language-toggle-country-language">العربية</div>
    </div>
  </button>
</div>
```

## 🎨 الألوان المستخدمة

### Gray Scale
- `gray-50`: `#f9fafb`
- `gray-100`: `#f3f4f6`
- `gray-200`: `#e5e7eb`
- `gray-300`: `#d1d5db`
- `gray-400`: `#9ca3af`
- `gray-500`: `#6b7280`
- `gray-700`: `#374151`
- `gray-800`: `#1f2937`
- `gray-900`: `#111827`

## 📐 الأحجام والمسافات

### Padding
- `px-3 py-2`: `0.75rem 0.5rem`
- `px-4 py-2`: `1rem 0.5rem`
- `px-4 py-3`: `1rem 0.75rem`
- `p-2`: `0.5rem`
- `p-6`: `1.5rem`

### Gap
- `gap-2`: `0.5rem`
- `gap-3`: `0.75rem`

### Border Radius
- `rounded-full`: `9999px`
- `rounded-xl`: `0.75rem`

### Widths
- `w-6`: `1.5rem`
- `w-8`: `2rem`
- `w-96`: `24rem`
- `w-full`: `100%`

### Heights
- `h-6`: `1.5rem`
- `h-9`: `2.25rem`
- `max-h-80`: `20rem`

## 🔄 Transitions

- `transition-all duration-300`: `all 0.3s`
- `transition-colors`: `colors 0.2s`

## 🌍 دعم RTL (Right-to-Left)

الستايلات تدعم اللغة العربية والاتجاه من اليمين لليسار. استخدم `dir="rtl"` على العناصر المناسبة:

```html
<div class="language-toggle-dropdown" dir="rtl">
  <button class="language-toggle-item" dir="rtl">
    <!-- محتوى -->
  </button>
</div>
```

## 📝 ملاحظات

1. **Icons**: الكومبوننت الأصلي يستخدم `react-icons/io5` للأيقونات. تأكد من إضافة المكتبة أو استبدالها بأيقونات مناسبة.

2. **Images**: تأكد من وجود صور الأعلام (flags) في مسار صحيح.

3. **Z-Index**: Dropdown menu يستخدم `z-50` للتأكد من ظهوره فوق العناصر الأخرى.

4. **Responsive**: يمكنك تعديل `w-96` (24rem) لتناسب الشاشات المختلفة.

## 🔧 التخصيص

يمكنك بسهولة تخصيص الألوان والأحجام من خلال تعديل متغيرات CSS في الملف:

```css
.language-toggle-button {
  background-color: #f3f4f6; /* غيّر هذا اللون */
  border-radius: 9999px; /* غيّر هذا الحجم */
}
```

## 📦 المتطلبات

لا توجد متطلبات خارجية. الستايلات تعمل مع أي مشروع HTML/CSS/JS عادي.

## 💡 مثال كامل

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Language Toggle Example</title>
  <link rel="stylesheet" href="LanguageToggle.styles.css">
</head>
<body>
  <div class="language-toggle-container">
    <button class="language-toggle-button">
      <div class="language-toggle-globe">
        <span class="language-toggle-globe-icon">🌐</span>
      </div>
      <div class="language-toggle-separator"></div>
      <div class="language-toggle-flag-container">
        <img src="saudi-flag.png" alt="Saudi" class="language-toggle-flag-image" />
      </div>
    </button>
    
    <div class="language-toggle-dropdown" dir="rtl">
      <div class="language-toggle-tabs">
        <button class="language-toggle-tab active">
          <span class="language-toggle-tab-text">اللغات</span>
        </button>
        <button class="language-toggle-tab">
          <span class="language-toggle-tab-text">البلد</span>
        </button>
      </div>
      
      <div class="language-toggle-content">
        <button class="language-toggle-item active" dir="rtl">
          <div class="language-toggle-item-flag">
            <img src="saudi-flag.png" class="language-toggle-item-flag-image" />
          </div>
          <div class="language-toggle-item-info">
            <div class="language-toggle-item-name">العربية</div>
            <div class="language-toggle-item-subtitle">المملكة العربية السعودية</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</body>
</html>
```

## 📄 الترخيص

يمكنك استخدام هذه الستايلات بحرية في أي مشروع.


