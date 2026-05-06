# CompIntel (Compensation Intelligence System)

CompIntel is a premium, high-fidelity platform for exploring, comparing, and submitting real compensation data across the tech industry. It focuses on the fundamental truth of tech compensation: **Titles mean nothing, Levels mean everything.**

Built as a production-grade, end-to-end web application, CompIntel features a highly distinct "cyber-dark" aesthetic with glassmorphism, fluid micro-animations, and a robust database architecture to normalize and query salary data efficiently.

## 🌟 Key Features

* **Advanced Salary Explorer:** Filter and search real compensation records by Company, Role, Level, and Location.
* **1-to-1 Compensation Compare:** Select any two roles to instantly see a granular breakdown of the base salary, bonuses, and equity differences.
* **Company Insights:** View deep-dive analytics on specific companies, including median total compensation and level distributions based on verified records.
* **Anonymous Ingestion:** Secure, anonymous submission flow for users to contribute new salary data to the community.
* **Premium UI/UX:** Built with a custom neon-gradient theme, frosted glass panels (`backdrop-blur`), and state-of-the-art layout animations using Framer Motion.

## 🛠️ Tech Stack

* **Frontend:** Next.js 16 (App Router), React 19, TypeScript
* **Styling:** Tailwind CSS 4.2+, Framer Motion, Lucide React
* **Database:** Prisma ORM, SQLite (Development) / PostgreSQL (Production ready)
* **API:** Next.js Serverless Route Handlers

## 🚀 Getting Started

First, make sure to install all the dependencies:

```bash
npm install
```

Ensure your database is synchronized. By default, this uses a local SQLite database (`prisma/dev.db`):

```bash
npx prisma db push
```

If you want to seed the database with initial test data:

```bash
npx prisma db seed
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Production Deployment

This application is fully optimized for deployment on **Vercel**.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Set your `DATABASE_URL` environment variable to a production PostgreSQL instance (e.g., Supabase or Neon).
4. Vercel will automatically run `npm run build` using Next.js Turbopack and deploy your serverless application.

## 🎨 Design System

CompIntel utilizes a highly customized design language:
* **Typography:** `Space Grotesk` for a commanding, tech-forward feel.
* **Colors:** Deep Space Black (`zinc-950`) accented by Neon Cyan (`#00f3ff`), Emerald Green (`#34d399`), and Neon Purple (`#bc13fe`).
* **Interactions:** Staggered list entrances, glowing hover borders, and layout springs driven entirely by `framer-motion`.

## 📜 License

This project is licensed under the MIT License.
