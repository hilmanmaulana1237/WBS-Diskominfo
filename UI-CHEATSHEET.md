# 🎨 UI Enhancement Cheatsheet

## Quick Copy-Paste Class Combinations

### Hero Section
```html
<section class="hero animated-gradient">
    <h1 class="fade-in-up">Title</h1>
    <p class="fade-in-up stagger-2">Subtitle</p>
    <button class="btn btn-primary btn-glow fade-in-up stagger-3">CTA</button>
</section>
```

### Stat Cards (4 kolom)
```html
<div class="row g-4">
    <div class="col-md-3">
        <div class="stat-card stat-card-enhanced fade-in-up stagger-1">
            <h3 class="counter" data-target="42">42</h3>
            <p>Label</p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="stat-card stat-card-enhanced fade-in-up stagger-2">
            <h3 class="counter" data-target="150">150</h3>
            <p>Label</p>
        </div>
    </div>
    <!-- repeat for col 3 & 4 with stagger-3, stagger-4 -->
</div>
```

### Feature Cards (3 kolom)
```html
<div class="row g-4">
    <div class="col-md-4">
        <div class="card glass-card fade-in-up stagger-1 text-center">
            <div class="card-body">
                <i class="bi bi-shield-lock floating" style="font-size: 3rem; color: var(--primary-color);"></i>
                <h4 class="mt-3">Title</h4>
                <p>Description</p>
            </div>
        </div>
    </div>
    <!-- repeat for col 2 & 3 with stagger-2, stagger-3 -->
</div>
```

### Data Card
```html
<div class="card glass-card fade-in-up">
    <div class="card-header">
        <h5><i class="bi bi-icon"></i> Title</h5>
    </div>
    <div class="card-body">
        Content
    </div>
</div>
```

### Buttons
```html
<!-- Primary with glow -->
<button class="btn btn-primary btn-glow">
    <i class="bi bi-icon"></i> Text
</button>

<!-- Success/Danger with 3D -->
<button class="btn btn-success btn-3d">
    <i class="bi bi-icon"></i> Text
</button>

<!-- Large CTA -->
<button class="btn btn-primary btn-lg btn-glow">
    <i class="bi bi-icon"></i> Call to Action
</button>
```

### Table
```html
<table class="table table-striped table-hover table-animated">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data</td>
            <td>Data</td>
        </tr>
    </tbody>
</table>
```

### Status Badges
```html
<span class="badge badge-pending badge-pulse">Menunggu</span>
<span class="badge badge-diterima">Diterima</span>
<span class="badge badge-diproses">Diproses</span>
<span class="badge badge-selesai">Selesai</span>
<span class="badge badge-ditolak">Ditolak</span>
```

### Form
```html
<form class="fade-in-up">
    <div class="mb-3">
        <label class="form-label">Label</label>
        <input type="text" class="form-control" placeholder="Placeholder">
    </div>
    <button type="submit" class="btn btn-primary btn-glow">
        <i class="bi bi-send"></i> Submit
    </button>
</form>
```

### Auth Card (Login/Register)
```html
<div class="card glass-card scale-in" style="max-width: 450px; margin: 0 auto;">
    <div class="card-body">
        <h3 class="text-center mb-4">Login</h3>
        <form>
            <!-- form fields -->
            <button type="submit" class="btn btn-primary w-100 btn-glow">
                <i class="bi bi-box-arrow-in-right"></i> Login
            </button>
        </form>
    </div>
</div>
```

## Class Reference

### Animations (Scroll-triggered)
| Class | Effect |
|-------|--------|
| `.fade-in-up` | Fade dari bawah |
| `.fade-in-left` | Fade dari kiri |
| `.fade-in-right` | Fade dari kanan |
| `.scale-in` | Zoom in |

### Stagger Delays
| Class | Delay |
|-------|-------|
| `.stagger-1` | 0.1s |
| `.stagger-2` | 0.2s |
| `.stagger-3` | 0.3s |
| `.stagger-4` | 0.4s |
| `.stagger-5` | 0.5s |
| `.stagger-6` | 0.6s |

### Cards
| Class | Effect |
|-------|--------|
| `.glass-card` | Glassmorphism |
| `.card-hover-lift` | Lift on hover (auto) |
| `.card-hover-glow` | Glow on hover |
| `.card-hover-border` | Border on hover |
| `.stat-card-enhanced` | Enhanced stat card |

### Buttons
| Class | Effect |
|-------|--------|
| `.btn-ripple` | Ripple (auto) |
| `.btn-glow` | Glow effect |
| `.btn-3d` | 3D shadow |

### Special Effects
| Class | Effect |
|-------|--------|
| `.floating` | Animasi melayang |
| `.shimmer` | Efek kilau |
| `.neon-glow` | Neon text |
| `.animated-gradient` | Gradient bergerak |
| `.badge-pulse` | Badge pulse |
| `.counter` | Counter naik |

### Disable
| Class | Effect |
|-------|--------|
| `.no-ripple` | Tanpa ripple |
| `.no-hover` | Tanpa hover |
| `.no-animation` | Tanpa animasi |
| `.no-glow` | Tanpa glow |
| `.no-3d` | Tanpa 3D |

## Auto-Enhanced Elements

Tidak perlu tambah class, otomatis enhanced:
- ✅ `.btn` → ripple effect
- ✅ `.btn-primary` → glow effect
- ✅ `.btn-success`, `.btn-danger` → 3D effect
- ✅ `.card` → hover lift + fade-in-up
- ✅ `.stat-card` → enhanced
- ✅ `.table` → hover effect
- ✅ `.badge-pending` → pulse
- ✅ `.navbar` → scroll effect
- ✅ All forms → focus enhancement

## JavaScript Functions

```javascript
// Counter animation
UIEnhancements.animateCounter(element, 150);

// Success animation
UIEnhancements.showSuccess(element);

// Error animation
UIEnhancements.showError(element);

// Loading
UIEnhancements.showLoadingEnhanced(container);

// Enhance badges
UIEnhancements.enhanceBadges();
```

## Quick Tips

1. **Kombinasi maksimal 2-3 class**
   ```html
   ✅ class="card glass-card fade-in-up"
   ❌ class="card glass-card fade-in-up shimmer floating neon-glow"
   ```

2. **Gunakan stagger untuk list**
   ```html
   <div class="card fade-in-up stagger-1">Card 1</div>
   <div class="card fade-in-up stagger-2">Card 2</div>
   <div class="card fade-in-up stagger-3">Card 3</div>
   ```

3. **Icon floating untuk feature cards**
   ```html
   <i class="bi bi-icon floating" style="font-size: 3rem;"></i>
   ```

4. **Counter untuk stat cards**
   ```html
   <h3 class="counter" data-target="150">150</h3>
   ```

5. **Glass effect untuk modern look**
   ```html
   <div class="card glass-card">...</div>
   ```

## File Locations

- CSS: `public/css/style.css` (line 1000+)
- JS: `public/js/app.js` (line 190+)
- Demo: `public/ui-demo.html`
- Docs: `UI-ENHANCEMENT-GUIDE.md`
- Examples: `ENHANCEMENT-EXAMPLES.md`

## Test
```
npm start
# Open: http://localhost:3000/ui-demo.html
```

---
Copy-paste combinations di atas langsung ke HTML Anda! 🚀
