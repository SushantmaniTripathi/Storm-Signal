# 🌩️ Storm Signal — Customer Sentiment Alert System

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  <b>Storm Signal</b> is a production-ready, real-time customer sentiment monitoring and alerting platform.<br/>
  It continuously scans <b>reviews, social media mentions, and community forums</b>, detects early signs of negative sentiment using NLP, and delivers instant alerts with AI-powered response recommendations to your team via <b>Slack</b> or <b>Email</b> — before issues escalate.
</p>

---

## 📸 Preview

<p align="center"> 
<img width="1452" height="793" alt="image" src="https://github.com/user-attachments/assets/98a08bc3-d569-4d3b-96d2-a04429fc0130" />
</p>

<img width="1539" height="497" alt="image" src="https://github.com/user-attachments/assets/ccea7ddf-ab5d-42a8-806b-44d3a0860557" />

<img width="1427" height="752" alt="image" src="https://github.com/user-attachments/assets/75e09388-e02e-4671-ad31-2aad1c8ca3ea" />

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
| 🔍 **Multi-Platform Monitoring** | Scans reviews, Twitter/X, Reddit, and forums continuously |
| 🧠 **NLP Sentiment Detection** | Identifies negative sentiment patterns using language analysis |
| ⚡ **Instant Alerts** | Sends real-time notifications via Slack & Email with full context |
| 🤖 **AI Response Recommendations** | Suggests tailored replies to help defuse escalations quickly |
| 📊 **Analytics Dashboard** | Visualizes sentiment trends, alert history, and team performance |
| 💳 **Subscription & Billing** | Stripe-powered plans for individual and enterprise usage |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)           │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │  shadcn  │  │ Recharts  │  │ React Router v6  │  │
│  │   /ui    │  │ Dashboard │  │   Navigation     │  │
│  └──────────┘  └───────────┘  └──────────────────┘  │
└─────────────────────────┬───────────────────────────┘
                          │ Supabase JS SDK
┌─────────────────────────▼───────────────────────────┐
│                  Backend (Supabase)                  │
│  ┌──────────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  PostgreSQL  │  │  Auth    │  │  Edge Func.   │  │
│  │   Database   │  │  (JWT)   │  │  (Webhooks)   │  │
│  └──────────────┘  └──────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────┐
│               Integrations & Payments                │
│         Stripe Billing    │    Slack / Email         │
└─────────────────────────────────────────────────────┘
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
| [TanStack Query](https://tanstack.com/query) | 5.56 | Async state management & server caching |
| [React Hook Form](https://react-hook-form.com/) | 7.53 | Performant, accessible form management |
| [Zod](https://zod.dev/) | 3.23 | Schema validation & type inference |

### 🎨 UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | latest | Accessible, customizable component library |


### 🔧 Backend & Services

| Technology | Purpose |
|---|---|
| [Supabase](https://supabase.com/) | PostgreSQL database, Auth (JWT), Realtime, Storage & Edge Functions |
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

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v18+ — or use [nvm](https://github.com/nvm-sh/nvm) for version management
- [Bun](https://bun.sh/) (recommended) or npm/yarn

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

# 2. Navigate into the project directory
cd Storm-Signal

# 3. Install dependencies (using Bun — recommended)
bun install
# or with npm:
npm install

# 4. Start the development server
bun run dev
# or:
npm run dev
```

The app will be available at **http://localhost:5173** with hot module replacement enabled.

### Build for Production

```bash
# Type-check and build
bun run build

# Preview the production build locally
bun run preview
```

### Linting

```bash
bun run lint
```

---

## 📁 Project Structure

```
Storm-Signal/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components (shadcn/ui + custom)
│   │   └── ui/              # Base shadcn/ui primitives
│   ├── pages/               # Route-level page components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions & Supabase client
│   ├── types/               # TypeScript type definitions
│   └── main.tsx             # Application entry point
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

---

## 📡 Roadmap

- [x] Real-time sentiment monitoring dashboard
- [x] Supabase authentication & user management
- [x] Stripe subscription & billing integration
- [ ] Multi-language sentiment detection (i18n NLP)
- [ ] Expanded platform monitoring (TikTok, LinkedIn, App Store)
- [ ] AI-powered suggested response generation (LLM integration)
- [ ] Advanced analytics with exportable reports
- [ ] Slack & Email webhook configuration UI
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
