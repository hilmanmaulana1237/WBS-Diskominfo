# 🎨 Panduan Desain & Styling WBS

## Tampilan & Tema

### Warna Utama
- **Primary Blue**: `#1e40af` - Warna utama untuk navbar, button, header
- **Secondary Blue**: `#3b82f6` - Warna aksen dan gradien
- **Success Green**: `#10b981` - Status selesai, berhasil
- **Warning Orange**: `#f59e0b` - Status pending
- **Danger Red**: `#ef4444` - Status ditolak, error
- **Purple**: `#8b5cf6` - Status diproses

### Background
- Gradient ungu-biru dengan pattern overlay
- Efek backdrop blur untuk card dan section
- Transparan dengan glassmorphism effect

### Typography
- **Font**: Poppins (Google Fonts)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

## Fitur Desain

### 1. Glassmorphism
Card dan navbar menggunakan efek kaca dengan:
- Background semi-transparan: `rgba(255, 255, 255, 0.98)`
- Backdrop filter blur: `blur(10px)`
- Shadow dengan opacity rendah

### 2. Animasi & Transitions
- Hover effect pada card: `translateY(-8px)`
- Navbar link underline animation
- Button shadow effect saat hover
- Smooth transitions 0.3s ease

### 3. Responsive Design
Breakpoint:
- Desktop: > 768px
- Mobile: < 768px

### 4. Shadow System
- `--shadow-sm`: `0 2px 8px rgba(0,0,0,0.08)` - Small elements
- `--shadow-md`: `0 4px 16px rgba(0,0,0,0.12)` - Cards
- `--shadow-lg`: `0 8px 24px rgba(0,0,0,0.16)` - Hover states

## Bootstrap 5.3.8

### Lokasi File
```
public/assets/
├── bootstrap/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   └── bootstrap.min.css.map
│   └── js/
│       ├── bootstrap.bundle.min.js
│       └── bootstrap.bundle.min.js.map
└── bootstrap-icons/
    ├── bootstrap-icons.css
    └── fonts/
```

### Komponen yang Digunakan
1. **Navbar** - Navigation dengan collapse menu
2. **Cards** - Content containers dengan shadow
3. **Forms** - Input, textarea, select dengan validation
4. **Buttons** - Primary, success, warning, danger
5. **Badges** - Status indicators
6. **Tables** - Data display dengan hover
7. **Modal** - Detail laporan
8. **Alerts** - Success/error messages
9. **Grid System** - Layout 12 columns

### Custom Override
File `style.css` meng-override Bootstrap default:
- Border radius: 15px (cards), 5px (buttons, inputs)
- Colors: menggunakan CSS variables
- Hover effects: custom animation
- Background: gradient + pattern

## Cara Customisasi

### 1. Ubah Warna Utama
Edit di `public/css/style.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### 2. Ubah Font
Ganti Google Fonts import:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@...');
```

Lalu update:
```css
body {
    font-family: 'YourFont', 'Segoe UI', sans-serif;
}
```

### 3. Ubah Background
Edit gradient di `body`:
```css
body {
    background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### 4. Nonaktifkan Glassmorphism
Hapir atau comment backdrop-filter:
```css
.card {
    background: rgba(255, 255, 255, 1); /* Solid white */
    /* backdrop-filter: blur(10px); */
}
```

## Icon Usage

### Bootstrap Icons
Tersedia 2000+ icons. Contoh:
```html
<i class="bi bi-shield-check"></i>
<i class="bi bi-megaphone"></i>
<i class="bi bi-file-earmark-plus"></i>
```

Full icon list: https://icons.getbootstrap.com/

## Performance Tips

1. **Bootstrap lokal** lebih cepat daripada CDN (no external request)
2. **Minified files** untuk production
3. **Backdrop filter** bisa di-disable untuk performa lebih baik di device lama
4. **CSS variables** memudahkan theme switching

## Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 9+)
- IE11: ❌ Not supported (backdrop-filter)

## Update Bootstrap

Jika ingin update versi Bootstrap:
```bash
npm install bootstrap@latest bootstrap-icons@latest
npm run copy-assets
```

## Troubleshooting

### Icons tidak muncul
- Pastikan `npm run copy-assets` sudah dijalankan
- Cek folder `public/assets/bootstrap-icons/fonts/` ada file font

### Styling tidak apply
- Clear browser cache
- Hard reload: Ctrl+Shift+R
- Cek console untuk error CSS

### Background pattern tidak muncul
- Cek browser support untuk backdrop-filter
- Fallback: solid color background

---

**Happy Styling! 🎨**
