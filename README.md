<div align="center">

# ⚡ CompIntel
### Compensation Intelligence System

**The fundamental truth of tech compensation: Titles mean nothing. Levels mean everything.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-comp--intel--coral.vercel.app-00f3ff?style=for-the-badge&logoColor=white)](https://comp-intel-coral.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 🌐 Live Demo

> **Try it now →** [https://comp-intel-coral.vercel.app/](https://comp-intel-coral.vercel.app/)

CompIntel is a premium, high-fidelity platform for exploring, comparing, and submitting real compensation data across the tech industry — built with a distinctive **cyber-dark aesthetic**, glassmorphism panels, and fluid micro-animations.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Advanced Salary Explorer** | Filter real compensation records by Company, Role, Level, and Location |
| ⚖️ **1-to-1 Compensation Compare** | Side-by-side breakdown of base salary, bonuses, and equity for any two roles |
| 🏢 **Company Insights** | Deep-dive analytics with median total comp and level distributions |
| 🔒 **Anonymous Ingestion** | Secure, privacy-first submission flow to contribute new salary data |
| 🎨 **Premium UI/UX** | Neon-gradient theme, frosted glass panels, and Framer Motion animations |

---

## 🛠️ Tech Stack

```
Frontend    →  Next.js 16 (App Router) · React 19 · TypeScript
Styling     →  Tailwind CSS 4.2+ · Framer Motion · Lucide React
Database    →  Prisma ORM · SQLite (dev) · PostgreSQL (production)
API         →  Next.js Serverless Route Handlers
Deployment  →  Vercel
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/compintel.git
cd compintel
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up the database**

CompIntel uses SQLite locally via Prisma. Push the schema:
```bash
npx prisma db push
```

**4. (Optional) Seed with sample data**
```bash
npx prisma db seed
```

**5. Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Production Deployment

CompIntel is optimized for **[Vercel](https://vercel.com/)** — deploy in minutes:

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Set the `DATABASE_URL` environment variable to a PostgreSQL instance (e.g., [Supabase](https://supabase.com/) or [Neon](https://neon.tech/))
4. Vercel automatically builds with Next.js Turbopack and deploys

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string (production) | `postgresql://user:pass@host/db` |

---

## 🎨 Design System

CompIntel uses a custom **cyber-dark** design language built for technical audiences:

| Token | Value | Usage |
|---|---|---|
| **Font** | `Space Grotesk` | All typography — commanding, tech-forward |
| **Background** | `zinc-950` — Deep Space Black | Base layer |
| **Primary** | `#00f3ff` — Neon Cyan | CTAs, highlights, borders |
| **Secondary** | `#34d399` — Emerald Green | Positive metrics, success states |
| **Accent** | `#bc13fe` — Neon Purple | Special callouts, gradients |

**Interaction patterns:**
- Staggered list entrance animations via Framer Motion
- Glowing hover borders with `backdrop-blur` glassmorphism panels
- Layout springs on component mount/unmount

---

## 📁 Project Structure

```
compintel/
├── app/                    # Next.js App Router pages & layouts
│   ├── api/                # Serverless route handlers
│   ├── compare/            # 1-to-1 comparison page
│   ├── company/            # Company insights page
│   ├── explore/            # Salary explorer page
│   └── submit/             # Anonymous data submission
├── components/             # Reusable UI components
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Sample data seeder
└── lib/                    # Utilities and shared logic
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! The anonymous ingestion flow ensures all salary data is community-sourced and privacy-preserving.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ⚡ by the community, for the community.

**[🚀 View Live →](https://comp-intel-coral.vercel.app/)**

</div>
