import { ArrowLeft, ArrowRight, Check, Globe2, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import Home from "@/pages/Home";
import PublicTrendMarketSection from "@/components/PublicTrendMarketSection";
import { UI_LANGUAGES, isUiLanguage, languageMeta, useLanguage, type UiLanguage } from "@/contexts/LanguageContext";

export default function PublicHome() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { direction, language, setLanguage } = useLanguage();
  const currentUiLanguage: UiLanguage = isUiLanguage(language) ? language : "ar";
  const nextLanguage = UI_LANGUAGES[(UI_LANGUAGES.indexOf(currentUiLanguage) + 1) % UI_LANGUAGES.length];
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;
  const copy = {
    ar: {
      loading: "جارٍ تحميل NFOOD...", market: "المتاجر والسوق", features: "المزايا", pricing: "الباقات", signIn: "تسجيل الدخول", menu: "فتح القائمة",
      badge: "نظام تشغيل المطاعم والمتاجر الحديث", titleTop: "كل ما يحتاجه نشاطك.", titleAccent: "في منصة واحدة.", intro: "NFOOD يوحّد الإدارة، المتاجر، الطلبات، الخدمات، الولاء والعروض في تجربة عربية أنيقة لكل قطاع.",
      start: "ابدأ الآن", explore: "استكشف السوق", quick: "إعداد سريع", arabic: "دعم كامل للعربية", devices: "يعمل على كل الأجهزة", overview: "من المطاعم إلى الخدمات الميدانية", overviewTitle: "سوق واحد لجميع الأنشطة",
      sectors: ["مطاعم ومقاهٍ", "أزياء وموضة", "تجميل وصالونات", "بقالات وتموينات", "خدمات سيارات", "صيانة ميدانية"], run: "تشغيل موحّد", featureTitle: "إدارة المتجر أو الخدمة من مكان واحد.",
      featureCards: [["إدارة مرنة", "حسابات، فروع، فريق وصلاحيات لكل نشاط."], ["تجربة عميل متصلة", "منتجات وخدمات وكوبونات وولاء في واجهة واضحة."], ["سوق قابل للتوسع", "أضف قطاعًا أو متجرًا دون تغيير حسابك الأساسي."]], pricingEyebrow: "ابدأ بخطوة واضحة", pricingTitle: "جاهز لتشغيل أفضل؟", pricingAction: "الدخول إلى NFOOD", rights: "جميع الحقوق محفوظة",
    },
    en: {
      loading: "Loading NFOOD...", market: "Stores & marketplace", features: "Features", pricing: "Plans", signIn: "Sign in", menu: "Open menu",
      badge: "Modern operating system for restaurants and stores", titleTop: "Everything your business needs.", titleAccent: "In one platform.", intro: "NFOOD brings operations, stores, orders, services, rewards, and promotions together in one clear workspace for every sector.",
      start: "Get started", explore: "Explore marketplace", quick: "Quick setup", arabic: "Arabic-ready", devices: "Works on every device", overview: "From restaurants to field services", overviewTitle: "One marketplace for every business",
      sectors: ["Restaurants & cafés", "Fashion & apparel", "Beauty & salons", "Groceries", "Automotive services", "Field services"], run: "Unified operations", featureTitle: "Manage your store or service from one place.",
      featureCards: [["Flexible management", "Accounts, branches, teams, and permissions for every business."], ["Connected customer experience", "Products, services, coupons, and rewards in one clear journey."], ["Scalable marketplace", "Add a sector or a store without changing your core account."]], pricingEyebrow: "Start with clarity", pricingTitle: "Ready to operate better?", pricingAction: "Open NFOOD", rights: "All rights reserved",
    },
    fr: {
      loading: "Chargement de NFOOD...", market: "Boutiques et marché", features: "Fonctionnalités", pricing: "Forfaits", signIn: "Se connecter", menu: "Ouvrir le menu",
      badge: "Système d’exploitation moderne pour restaurants et commerces", titleTop: "Tout ce dont votre activité a besoin.", titleAccent: "Sur une seule plateforme.", intro: "NFOOD réunit opérations, boutiques, commandes, services, fidélité et promotions dans un espace clair pour chaque secteur.",
      start: "Commencer", explore: "Explorer le marché", quick: "Configuration rapide", arabic: "Prêt pour l’arabe", devices: "Fonctionne sur tous les appareils", overview: "Des restaurants aux services sur le terrain", overviewTitle: "Un marché pour toutes les activités",
      sectors: ["Restaurants et cafés", "Mode et vêtements", "Beauté et salons", "Épiceries", "Services automobiles", "Services de terrain"], run: "Opérations unifiées", featureTitle: "Gérez votre boutique ou service depuis un seul espace.",
      featureCards: [["Gestion flexible", "Comptes, succursales, équipes et autorisations pour chaque activité."], ["Expérience client connectée", "Produits, services, coupons et fidélité dans un parcours clair."], ["Marché évolutif", "Ajoutez un secteur ou une boutique sans changer votre compte principal."]], pricingEyebrow: "Commencez clairement", pricingTitle: "Prêt à mieux gérer votre activité ?", pricingAction: "Ouvrir NFOOD", rights: "Tous droits réservés",
    },
  }[currentUiLanguage];

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#071525] text-white">{copy.loading}</div>;
  if (user) return <Home />;

  return (
    <div dir={direction} className="min-h-screen bg-[#f8fafc] text-[#0b1d35]">
      <header className="relative z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f97316] text-lg font-black text-white shadow-lg shadow-orange-200">N</span><span><strong className="block text-lg tracking-[.15em]">NFOOD</strong><small className="block text-[9px] font-bold tracking-[.2em] text-slate-400">RESTAURANT OPERATING SYSTEM</small></span></a>
          <nav className={`${menuOpen ? "absolute inset-x-4 top-20 flex" : "hidden"} flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <a href="#trend-market" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-orange-500">{copy.market}</a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-orange-500">{copy.features}</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-orange-500">{copy.pricing}</a>
            <button onClick={() => { setLanguage(nextLanguage); setMenuOpen(false); }} className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-orange-500"><Globe2 className="h-4 w-4" />{languageMeta[nextLanguage].nativeLabel}</button>
            <button onClick={() => setLocation("/login")} className="rounded-xl bg-[#0b1d35] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#15355d]">{copy.signIn}</button>
          </nav>
          <button aria-label={copy.menu} onClick={() => setMenuOpen((open) => !open)} className="rounded-xl p-2 md:hidden">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="top">
        <section className="relative isolate overflow-hidden bg-[#071525] px-5 py-16 text-white md:px-8 md:py-24">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" /><div className="absolute -bottom-40 left-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-orange-200"><Sparkles className="h-4 w-4" /> {copy.badge}</div><h1 className="max-w-3xl text-4xl font-black leading-[1.2] tracking-tight md:text-6xl">{copy.titleTop}<br /><span className="text-orange-400">{copy.titleAccent}</span></h1><p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">{copy.intro}</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setLocation("/login")} className="group flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-950/30 hover:bg-orange-400">{copy.start} <Arrow className="h-4 w-4" /></button><a href="#trend-market" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold text-slate-200 hover:bg-white/10">{copy.explore}</a></div><div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400"><span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal-400" /> {copy.quick}</span><span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal-400" /> {copy.arabic}</span><span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal-400" /> {copy.devices}</span></div></div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[.07] p-5 shadow-2xl shadow-black/30 backdrop-blur"><div className="rounded-[1.4rem] bg-white p-6 text-[#0b1d35]"><p className="text-xs font-black text-orange-500">{copy.overview}</p><h2 className="mt-3 text-2xl font-black">{copy.overviewTitle}</h2><div className="mt-6 grid grid-cols-2 gap-3 text-sm">{copy.sectors.map((item, index) => <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><span className="text-orange-500">0{index + 1}</span><p className="mt-1">{item}</p></div>)}</div></div></div>
          </div>
        </section>

        <PublicTrendMarketSection />

        <section id="features" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20"><p className="text-sm font-black text-orange-500">{copy.run}</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">{copy.featureTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{copy.featureCards.map(([title, body]) => <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{body}</p></article>)}</div></section>

        <section id="pricing" className="border-t border-slate-200 bg-white px-5 py-16 text-center md:px-8"><p className="text-sm font-black text-orange-500">{copy.pricingEyebrow}</p><h2 className="mt-3 text-3xl font-black">{copy.pricingTitle}</h2><button onClick={() => setLocation("/login")} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-200 hover:bg-orange-600">{copy.pricingAction} <Arrow className="h-4 w-4" /></button></section>
      </main>
      <footer className="bg-[#071525] px-5 py-10 text-center text-sm text-slate-400 md:px-8">© 2026 NFOOD · {copy.rights}</footer>
    </div>
  );
}
