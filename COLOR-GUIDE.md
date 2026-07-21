# 🎨 QUICK COLOR REFERENCE - WBS Diskominfo

## 🆕 NEW COLOR PALETTE (Current)

### Primary Colors
```css
Royal Blue:      #0052a3  /* Main brand color */
Dark Blue:       #003d7a  /* Hover states */
Midnight Blue:   #002855  /* Dark backgrounds */
Cyan Accent:     #64d9ff  /* Highlights */
Light Cyan:      #a5f3fc  /* Secondary accents */
```

### Status Colors
```css
Success (Green): #10b981  /* Completed, success */
Warning (Orange):#f59e0b  /* Pending, warning */
Danger (Red):    #ef4444  /* Error, rejected */
Purple:          #8b5cf6  /* Processing */
Dark Gray:       #1f2937  /* Text */
```

### Gradients
```css
/* Main Background */
background: linear-gradient(135deg, #0052a3 0%, #003d7a 50%, #002855 100%);

/* Primary Buttons */
background: linear-gradient(135deg, #0052a3, #003d7a);

/* Stat Cards - Blue */
background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%);

/* Stat Cards - Orange */
background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);

/* Stat Cards - Purple */
background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);

/* Stat Cards - Green */
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

### Shadows (rgba base: 0, 82, 163)
```css
--shadow-sm: 0 2px 8px rgba(0, 82, 163, 0.1);
--shadow-md: 0 4px 16px rgba(0, 82, 163, 0.15);
--shadow-lg: 0 10px 25px rgba(0, 82, 163, 0.2);
--shadow-xl: 0 20px 40px rgba(0, 82, 163, 0.25);
```

---

## 🎯 USAGE GUIDE

### Hero Section
```html
<!-- Background with royal blue gradient -->
<div class="hero">
  <h1>Whistle Blowing System</h1>
  <h2 class="highlight">Lapor. Lindungi. Bertanggung Jawab.</h2>
  <!-- highlight class uses #64d9ff -->
</div>
```

### Buttons
```html
<!-- Primary Button (Royal Blue) -->
<button class="btn btn-primary">Submit</button>

<!-- Success Button (Green) -->
<button class="btn btn-success">Approve</button>

<!-- Warning Button (Orange) -->
<button class="btn btn-warning">Pending</button>

<!-- Danger Button (Red) -->
<button class="btn btn-danger">Reject</button>
```

### Stat Cards
```html
<!-- Blue Card (Total Reports) -->
<div class="stat-card stat-blue">
  <i class="bi bi-file-text"></i> <!-- Icon color: #64d9ff -->
  <h3>150</h3>
  <p>Total Laporan</p>
</div>

<!-- Orange Card (Pending) -->
<div class="stat-card stat-orange">
  <h3>25</h3>
  <p>Pending</p>
</div>

<!-- Purple Card (Processing) -->
<div class="stat-card stat-purple">
  <h3>40</h3>
  <p>Diproses</p>
</div>

<!-- Green Card (Completed) -->
<div class="stat-card stat-green">
  <h3>85</h3>
  <p>Selesai</p>
</div>
```

### Status Badges
```html
<span class="badge badge-pending">Pending</span>      <!-- Orange -->
<span class="badge badge-diterima">Diterima</span>    <!-- Royal Blue -->
<span class="badge badge-diproses">Diproses</span>    <!-- Purple -->
<span class="badge badge-selesai">Selesai</span>      <!-- Green -->
<span class="badge badge-ditolak">Ditolak</span>      <!-- Red -->
```

---

## 📊 COLOR COMPARISON

| Element | Old Color | New Color | Notes |
|---------|-----------|-----------|-------|
| Primary | #0f172a (Dark) | #0052a3 (Royal Blue) | More vibrant |
| Accent | #1e40af (Blue) | #64d9ff (Cyan) | Eye-catching |
| Pending Badge | #60a5fa (Light Blue) | #f59e0b (Orange) | Better distinction |
| Success | #3b82f6 (Blue) | #10b981 (Green) | Standard success color |
| Background | Dark Blue Gradient | Royal Blue Gradient | Professional look |

---

## 🎨 DESIGN PRINCIPLES

### 1. Accessibility
- High contrast between text and backgrounds
- Colors tested for colorblind users
- WCAG 2.1 AA compliant

### 2. Hierarchy
```
Primary Action:    #0052a3 (Royal Blue)
Secondary Action:  Transparent with border
Accent/Highlight:  #64d9ff (Cyan)
```

### 3. Status Communication
```
Neutral/New:       #f59e0b (Orange)
In Progress:       #8b5cf6 (Purple)
Success:           #10b981 (Green)
Error/Rejected:    #ef4444 (Red)
Information:       #0052a3 (Royal Blue)
```

---

## 🔧 CUSTOMIZATION

### Change Primary Color
```css
:root {
  --primary-color: #0052a3;  /* Change this */
  --primary-dark: #003d7a;   /* Darker version */
}
```

### Change Accent Color
```css
:root {
  --accent-color: #64d9ff;   /* Change this */
  --light-cyan: #a5f3fc;     /* Lighter version */
}
```

### Adjust Shadow Intensity
```css
:root {
  --shadow-sm: 0 2px 8px rgba(0, 82, 163, 0.1);  /* Increase/decrease alpha */
}
```

---

## 📱 RESPONSIVE BEHAVIOR

All colors remain consistent across breakpoints:
- Mobile (< 768px): Same colors, optimized layout
- Tablet (768px - 1024px): Same colors
- Desktop (> 1024px): Same colors

---

## 🌐 BROWSER SUPPORT

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

All modern browsers support:
- CSS Variables
- Linear Gradients
- RGBA colors
- Box Shadows

---

## 💡 TIPS

1. **Use CSS Variables**: Always use `var(--primary-color)` instead of hardcoded hex
2. **Consistent Shadows**: Use predefined shadow variables
3. **Test Contrast**: Use browser DevTools to check color contrast
4. **Document Changes**: Update this file when colors change

---

**Last Updated:** February 9, 2026
**Theme Version:** 2.0 - Royal Blue
**Status:** ✅ Production Ready
