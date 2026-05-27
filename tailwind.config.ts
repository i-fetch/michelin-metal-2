import type { Config } from 'tailwindcss'

const config: Config = {
  // Removed darkMode: 'class' to fully secure light-only architecture
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core background surfaces
        app: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
        },
        // Semantic typography system
        tx: {
          primary: 'var(--tx-primary)',
          secondary: 'var(--tx-secondary)',
          muted: 'var(--tx-muted)',
          faint: 'var(--tx-faint)',
        },
        // Component structural borders
        border: {
          main: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        // Tokenized brand identities
        brand: {
          green: 'var(--clr-green)',
          'green-light': 'var(--clr-green-light)',
          'green-pale': 'var(--clr-green-pale)',
          gold: 'var(--clr-gold)',
          'gold-dark': 'var(--clr-gold-dark)',
        },
        // Protected fallback scales 
        green: { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d',950:'#052e16' },
        gold:  { 300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f' },
        slate: { 50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020817' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      borderRadius: {
        'sm-custom': 'var(--radius-sm)',
        'md-custom': 'var(--radius-md)',
        'lg-custom': 'var(--radius-lg)',
        'xl-custom': 'var(--radius-xl)',
      },
      boxShadow: {
        'sm-custom': 'var(--shadow-sm)',
        'md-custom': 'var(--shadow-md)',
        'lg-custom': 'var(--shadow-lg)',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':   'fadeUp   0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':   'fadeIn   0.6s ease forwards',
        'slide-r':   'slideR   0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer':   'shimmer  2.5s linear infinite',
      },
      keyframes: {
        fadeUp:  { '0%':{ opacity:'0', transform:'translateY(24px)' }, '100%':{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:  { '0%':{ opacity:'0' }, '100%':{ opacity:'1' } },
        slideR:  { '0%':{ opacity:'0', transform:'translateX(30px)' }, '100%':{ opacity:'1', transform:'translateX(0)' } },
        shimmer: { '0%':{ backgroundPosition:'200% center' }, '100%':{ backgroundPosition:'-200% center' } },
      },
    },
  },
  plugins: [],
}

export default config