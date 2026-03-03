# 🌩️ Storm Signal — Real-Time Customer Sentiment Alert System

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/Recharts-2.12-FF6384?style=for-the-badge" alt="Recharts">
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  <b>Storm Signal</b> is a production-ready, real-time customer sentiment monitoring and alerting platform.<br/>
  It continuously ingests <b>reviews, social media mentions, and community forum posts</b>, classifies sentiment in real time, and surfaces instant alerts with AI-powered response recommendations — before issues escalate.
</p>

---

## 📸 Preview

<p align="center">
  <img width="700" alt="Storm Signal Dashboard Preview" src="https://github.com/user-attachments/assets/8a882b9c-80eb-4b44-8e58-080bec1dac0b" />
</p>

<img width="1539" height="497" alt="image" src="https://github.com/user-attachments/assets/ccea7ddf-ab5d-42a8-806b-44d3a0860557" />

---

## 🚨 The Problem

Support and CX teams are reactive. By the time a surge of negative sentiment is discovered, it has already:

- Spread across review sites, forums, and social platforms
- Damaged brand reputation and eroded customer trust
- Overwhelmed support queues without context or prioritization

---

## 💡 The Solution

**Storm Signal** acts as a real-time sentiment watchdog that empowers your team to stay proactive:

| Capability | Description |
|---|---|
| 🔍 **Multi-Platform Monitoring** | Ingests data from Twitter/X, Facebook, Instagram, Google Reviews, App Store, Reddit, and YouTube |
| 🧠 **Sentiment Classification** | Classifies every mention as Positive, Negative, or Neutral with a confidence score |
| ⚡ **Live Alert Feed** | Surfaces real-time alerts (info / warning / error / critical) as new negative signals arrive |
| 🤖 **AI Response Suggestions** | Generates empathetic, on-brand reply templates for negative alerts |
| 📊 **Analytics Dashboard** | Bar, Line, and Pie charts powered by Recharts — daily trends, platform breakdown, hourly activity |
| 🔔 **Notification Panel** | In-app slide-over notification panel with unread badge |
| ⚙️ **Settings & Configuration** | Toggle platforms, manage keywords, configure Slack & Email webhooks |
| 💳 **Subscription & Billing** | Stripe-powered plans for individual and enterprise usage |

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (React 18 + Vite 5)              │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  shadcn/ui  │  │   Recharts   │  │  React Router v6   │  │
│  │  + Radix UI │  │  Dashboard   │  │    Navigation      │  │
│  └─────────────┘  └──────────────┘  └────────────────────┘  │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  TanStack   │  │  Lucide React│  │  Tailwind CSS 3.4  │  │
│  │    Query    │  │    Icons     │  │  + Animations      │  │
│  └─────────────┘  └──────────────┘  └────────────────────┘  │
└──────────────────────────────┬───────────────────────────────┘
                               │ Supabase JS SDK
┌──────────────────────────────▼───────────────────────────────┐
│                     Backend (Supabase)                        │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  PostgreSQL   │  │  Auth (JWT)  │  │   Edge Functions  │  │
│  │   Database    │  │   + RLS      │  │   (Webhooks)      │  │
│  └───────────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                  Integrations & Payments                      │
│          Stripe Billing        │      Slack / Email           │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

### 🖥️ Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.3 | Component-based UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.5 | Static type safety & developer experience |
| [Vite](https://vitejs.dev/) | 5.4 | Lightning-fast build tool & HMR dev server |
| [React Router DOM](https://reactrouter.com/) | 6.26 | Client-side routing & navigation |
| [TanStack Query](https://tanstack.com/query) | 5.56 | Async state management & server-side caching |
| [React Hook Form](https://react-hook-form.com/) | 7.53 | Performant, accessible form management |
| [Zod](https://zod.dev/) | 3.23 | Schema validation & type inference |
| [Recharts](https://recharts.org/) | 2.12 | Composable charting — Line, Bar, Pie, Area |
| [Lucide React](https://lucide.dev/) | 0.462 | Pixel-perfect icon library |
| [Sonner](https://sonner.emilkowal.ski/) | 1.5 | Opinionated toast notifications |
| [date-fns](https://date-fns.org/) | 3.6 | Lightweight date utility library |

### 🎨 UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | latest | Accessible, copy-paste component library built on Radix UI |
| [Radix UI](https://www.radix-ui.com/) | various | Unstyled, accessible UI primitives |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | 1.0 | Tailwind animation utilities |
| [class-variance-authority](https://cva.style/) | 0.7 | Type-safe variant component styling |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 2.5 | Conflict-free Tailwind class merging |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.3 | Dark/light theme management |

### 🔧 Backend & Services

| Technology | Purpose |
|---|---|
| [Supabase](https://supabase.com/) | PostgreSQL database, JWT Auth, Realtime subscriptions & Edge Functions |
| [Stripe](https://stripe.com/) | Subscription billing, payment intents & webhook handling |

### 🛠️ Dev Tooling

| Technology | Version | Purpose |
|---|---|---|
| [Bun](https://bun.sh/) | latest | Fast JavaScript runtime & package manager |
| [ESLint](https://eslint.org/) | 9.9 | Code linting & quality enforcement |
| [PostCSS](https://postcss.org/) | 8.4 | CSS transformation pipeline |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | 10.4 | Vendor-prefix automation |
| [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) | 3.5 | SWC-powered React fast refresh |

---

## 🗂️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Dashboard** (Storm Radar) | Live metric cards, alert feed, sentiment chart, recent mentions, trending topics, AI response suggestions |
| `/analytics` | **Analytics** | Deep-dive charts: daily trends (Line), sentiment distribution (Pie), platform breakdown (Bar), hourly activity (Bar) |
| `/settings` | **Settings** | Platform toggles, keyword management, Slack/Email webhook config, alert thresholds |

---

## 📁 Project Structure

```
Storm-Signal/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── features/            # Domain-specific feature components
│   │   │   ├── AlertFeed.tsx          # Real-time alert list with severity badges
│   │   │   ├── MetricCards.tsx        # KPI summary cards (mentions, sentiment %)
│   │   │   ├── NotificationPanel.tsx  # Slide-over notification drawer
│   │   │   ├── RecentMentions.tsx     # Latest platform mentions feed
│   │   │   ├── ResponseSuggestions.tsx # AI-generated reply templates
│   │   │   ├── SearchBar.tsx          # Filtered search with platform/sentiment filters
│   │   │   ├── SentimentChart.tsx     # Area chart of sentiment over time
│   │   │   └── TrendingTopics.tsx     # Hot keyword badges
│   │   ├── layout/
│   │   │   └── Layout.tsx             # App shell: sidebar nav + top bar
│   │   └── ui/                  # shadcn/ui primitives (accordion, badge, button, card, …)
│   ├── hooks/
│   │   ├── use-mobile.tsx             # Responsive breakpoint hook
│   │   ├── use-toast.ts               # Toast hook
│   │   └── useSentimentData.ts        # Core hook — mock data generation + real-time simulation
│   ├── lib/
│   │   └── utils.ts                   # clsx + tailwind-merge helper
│   ├── pages/
│   │   ├── Analytics.tsx              # /analytics route
│   │   ├── Dashboard.tsx              # / route (default)
│   │   ├── Index.tsx                  # Root redirect
│   │   ├── NotFound.tsx               # 404 page
│   │   └── Settings.tsx               # /settings route
│   ├── types/
│   │   └── sentiment.ts               # SentimentData, Alert, SentimentMetrics, ResponseSuggestion interfaces
│   ├── App.tsx                        # Router layout wrapper
│   ├── App.css                        # Global animation styles
│   ├── index.css                      # Tailwind base + CSS variables
│   ├── main.tsx                       # React root — QueryClient, BrowserRouter, Toaster
│   └── vite-env.d.ts                  # Vite environment type declarations
├── components.json              # shadcn/ui CLI configuration
├── eslint.config.js             # ESLint flat config (React + TypeScript rules)
├── index.html                   # HTML entry point with SEO meta tags
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS + Autoprefixer
├── tailwind.config.ts           # Tailwind theme + shadcn/ui color tokens
├── tsconfig.json                # TypeScript project references
├── tsconfig.app.json            # App TypeScript config (path aliases)
├── tsconfig.node.json           # Vite config TypeScript config
└── vite.config.ts               # Vite build config (port 8080, @/ alias, SWC)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ — or use [nvm](https://github.com/nvm-sh/nvm) for version management
- [Bun](https://bun.sh/) (recommended) or npm

### Environment Setup

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> ⚠️ Never commit your `.env.local` file. It is already listed in `.gitignore`.

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/SushantmaniTripathi/Storm-Signal.git
cd Storm-Signal

# 2. Install dependencies
bun install       # recommended
# or:
npm install

# 3. Start the development server
bun run dev
# or:
npm run dev
```

The app will be available at **http://localhost:8080** with hot module replacement enabled.

### Build for Production

```bash
# Production build (outputs to dist/)
bun run build

# Preview the production build locally
bun run preview
```

### Linting

```bash
bun run lint
```

---

## 🔑 Key TypeScript Interfaces

```ts
// src/types/sentiment.ts

interface SentimentData {
  id: string
  source: 'twitter' | 'facebook' | 'instagram' | 'google-reviews' | 'app-store' | 'reddit' | 'youtube'
  content: string
  author: string
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number          // 0.0 – 1.0
  urgency: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  followers?: number
  engagement?: number
}

interface Alert {
  id: string
  type: 'sentiment' | 'volume' | 'trending' | 'keyword'
  severity: 'info' | 'warning' | 'error' | 'critical'
  title: string
  message: string
  data: SentimentData
  isRead: boolean
  suggestedResponse?: string
}
```

---

## 📡 Roadmap

- [x] Real-time sentiment monitoring dashboard
- [x] Multi-platform data ingestion (7 sources)
- [x] Alert feed with severity classification
- [x] AI-powered response suggestion templates
- [x] Analytics dashboard with Recharts visualizations
- [x] In-app notification panel
- [x] Settings UI — platform toggles, keywords, webhook config
- [x] Supabase authentication & user management
- [x] Stripe subscription & billing integration
- [ ] Live Supabase Realtime data pipeline (replace mock data)
- [ ] Multi-language sentiment detection (i18n NLP)
- [ ] Expanded platform monitoring (TikTok, LinkedIn)
- [ ] LLM-powered response generation (OpenAI / Anthropic)
- [ ] Advanced analytics with CSV/PDF export
- [ ] Role-based access control (RBAC) for teams
- [ ] Mobile-responsive PWA support

---

## 🛠️ Development Options

### Edit on GitHub

Open any file → click the **✏️ pencil icon** → commit your changes directly.

### GitHub Codespaces

Click **Code** → **Codespaces** → **New Codespace** to get a fully configured cloud development environment instantly.

### Local Development

Follow the [Getting Started](#-getting-started) section above for local setup.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m 'feat: add my new feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Open a Pull Request

Please ensure your code passes linting (`bun run lint`) before submitting a PR.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Sushantmani Tripathi**  
📧 [sushantmanitripathiji@gmail.com](mailto:sushantmanitripathiji@gmail.com)  
🐙 [@SushantmaniTripathi](https://github.com/SushantmaniTripathi)

---

<p align="center">
  Made with ❤️ and ⚡ by <a href="https://github.com/SushantmaniTripathi">Sushantmani Tripathi</a>
</p>
