# keziworks

Portfolio interaktif pribadi untuk **Kelvin Chen** — full-stack engineer yang membangun alat digital hyper-focused berdasarkan subkultur personal, friction sosial, dan minat mendalam pada kesehatan manusia serta sistem pelacakan perilaku.

Live: [keziworks.com](https://keziworks.com)

---

## Tentang Proyek

Situs ini bukan portfolio statis biasa. Setiap section dirancang sebagai **pengalaman scroll-driven** dengan estetika dark HUD futuristik: particle fields, wireframe glow, dan animasi GSAP yang disinkronkan dengan smooth scroll Lenis.

Alur halaman utama:

1. **Galaxy Gate Splash** — Canvas starfield radial dengan telemetry boot (`SYS_INITIALIZING`) sebelum reveal ke konten utama
2. **Hero Section** — Galaxy particles, cyber grid, cursor spotlight, dan capability badges
3. **Tech Stack Marquee** — Separator horizontal infinite scroll teknologi yang dipakai
4. **Project Showcase** — Tiga panel proyek dengan horizontal pin scroll (desktop) atau vertical stack (mobile)
5. **Footer** — Social links dan particle atmosphere

---

## Featured Projects

| Proyek | Deskripsi | Stack |
|--------|-----------|-------|
| **F1 26 Strat Analyzer** | Dashboard telemetri motorsport untuk visualisasi data lintasan dan blunder strategi | Vue, Tailwind CSS, Python (FastF1) |
| **ALOSplit** | Mobile bill-splitter multi-venue dengan optimasi utang global | React Native, Expo, Node.js, PostgreSQL |
| **Momentum** *(coming soon)* | Asisten behavioral adaptif beban kerja untuk mencegah efek snowball skip habit | Laravel, MySQL, React Native |

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Fonts | Geist Sans, Geist Mono, JetBrains Mono |

---

## Struktur Folder

```
src/
├── app/                  # Layout, globals.css, page entry
├── components/
│   ├── sections/         # Hero, ProjectShowcase, Footer
│   ├── projects/         # Panel UI per proyek (F1, ALOSplit, Momentum)
│   ├── ui/               # Particle fields, marquee, atmosphere layers
│   └── SplashScreen.tsx  # Galaxy gate loader (Canvas 2D)
├── data/
│   └── projectsData.ts   # Typed mock data & project metadata
├── hooks/
├── lib/                  # GSAP setup, panel styles, utilities
└── types/
public/
└── mockups/              # Screenshot mockups untuk panel preview
```

---

## Getting Started

### Prasyarat

- Node.js 20+
- npm

### Instalasi & menjalankan dev server

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Scripts

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

---

## Catatan Teknis

- **Smooth scroll:** `SmoothScrollProvider` menyinkronkan Lenis RAF loop dengan GSAP ticker dan ScrollTrigger
- **Splash scroll lock:** Class `splash-scroll-lock` pada `<html>` (CSS di `globals.css`) mencegah scrollbar flash sebelum hydration; dihapus otomatis setelah splash selesai (~4s)
- **Reduced motion:** Splash dan animasi berat menghormati `prefers-reduced-motion`

---

## License

Private project — keziworks.
