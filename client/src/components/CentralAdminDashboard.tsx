import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderOpen,
  Globe,
  HeartPulse,
  Languages,
  LayoutDashboard,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sun,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// ========================================================
// 1. نظام القواميس الموحد (دعم كامل ومستقبلي للغات الثلاث)
// ========================================================
const translations = {
  ar: {
    dir: "rtl",
    projectName: "نفود",
    panelTitle: "الأدمن المركزي",
    panelSubtitle: "إدارة المنصة والحسابات والحوكمة",
    systemReady: "النظام جاهز",
    searchPlaceholder: "ابحث... (Ctrl + K)",
    adminCenter: "مركز الإدارة",
    nav_overview: "نظرة عامة", nav_superAdmin: "المشرفون العامون", nav_accounts: "إدارة الحسابات",
    nav_settings: "الإعدادات العامة", nav_languages: "اللغة والترجمة", nav_files: "مكتبة الملفات",
    nav_trend: "سوق نفود / مطبخ الترند", nav_security: "أمان الحساب والجلسات", nav_health: "صحة النظام",
    settingsGroup: "الإعدادات والتخصيص",
    card_restaurants: "المطاعم النشطة", card_accounts: "الحسابات", card_subscriptions: "الاشتراكات",
    card_notifications: "التنبيهات", card_transfers: "التحويلات المعلقة", card_files: "مكتبة الملفات",
    tab_orders: "الطلبات", tab_customers: "العملاء", tab_purchases: "المشتريات", tab_shipping: "الشحن و NFC",
    table_title: "إدارة الطلبات والعملاء", table_subtitle: "متابعة الطلبات، العملاء، المشتريات، والشحن في منصة NFOOD",
    th_orderNum: "رقم الطلب", th_customer: "العميل", th_restaurant: "المطعم", th_status: "الحالة",
    th_amount: "المبلغ", th_lastUpdate: "آخر تحديث", th_actions: "الإجراءات", btn_viewDetails: "عرض التفاصيل",
    status_pending: "قيد المراجعة", status_completed: "مكتمل", status_awaiting: "بانتظار الدفع",
    pagination: "من",
    summary_title: "ملخص العملاء", sum_total: "إجمالي العملاء", sum_active: "العملاء النشطون", sum_profiles: "ملفات العملاء",
    btn_manageCustomers: "إدارة العملاء", btn_addCustomer: "إضافة عميل", currency: "ريال",
    modal_title: "تفاصيل الطلب والتدقيق المالي", modal_close: "إغلاق", modal_tax: "الرقم الضريبي للمطعم", modal_transfer_status: "أثر التحويل المالي",
    langLabel: "العربية",
    osLabel: "نظام نفود",
    adminBadge: "مركز الأدمن المركزي",
    toast_mock: "بيانات تجريبية — التفاصيل الكاملة قريبًا",
    toast_added: "تمت الإضافة بنجاح (تجريبي)",
  },
  en: {
    dir: "ltr",
    projectName: "NFOOD",
    panelTitle: "Central Admin",
    panelSubtitle: "Platform Management, Accounts & Governance",
    systemReady: "System Ready",
    searchPlaceholder: "Search... (Ctrl + K)",
    adminCenter: "Admin Center",
    nav_overview: "Overview", nav_superAdmin: "Super Admin", nav_accounts: "Accounts Management",
    nav_settings: "General Settings", nav_languages: "Languages & Translation", nav_files: "File Library",
    nav_trend: "NFOOD Market / Trend Kitchen", nav_security: "Security & Sessions", nav_health: "System Health",
    settingsGroup: "Settings",
    card_restaurants: "Active Restaurants", card_accounts: "Accounts", card_subscriptions: "Subscriptions",
    card_notifications: "Alerts", card_transfers: "Pending Transfers", card_files: "File Library",
    tab_orders: "Orders", tab_customers: "Customers", tab_purchases: "Purchases", tab_shipping: "Shipping & NFC",
    table_title: "Orders & Customers Management", table_subtitle: "Monitor orders, customers, purchases, and shipping on NFOOD platform",
    th_orderNum: "Order ID", th_customer: "Customer", th_restaurant: "Restaurant", th_status: "Status",
    th_amount: "Amount", th_lastUpdate: "Last Update", th_actions: "Actions", btn_viewDetails: "View Details",
    status_pending: "Pending Review", status_completed: "Completed", status_awaiting: "Awaiting Payment",
    pagination: "of",
    summary_title: "Customers Summary", sum_total: "Total Customers", sum_active: "Active Customers", sum_profiles: "Customer Profiles",
    btn_manageCustomers: "Manage Customers", btn_addCustomer: "Add Customer", currency: "SAR",
    modal_title: "Order Details & Financial Audit", modal_close: "Close", modal_tax: "Restaurant Tax Number", modal_transfer_status: "Transfer Impact Status",
    langLabel: "English",
    osLabel: "NFOOD OS",
    adminBadge: "CENTRAL ADMIN",
    toast_mock: "Demo data — full details coming soon",
    toast_added: "Added successfully (demo)",
  },
  fr: {
    dir: "ltr",
    projectName: "NFOOD",
    panelTitle: "Admin Central",
    panelSubtitle: "Gestion de la plateforme, Comptes et Gouvernance",
    systemReady: "Système Prêt",
    searchPlaceholder: "Rechercher... (Ctrl + K)",
    adminCenter: "Centre Admin",
    nav_overview: "Vue d'ensemble", nav_superAdmin: "Super Admin", nav_accounts: "Gestion des Comptes",
    nav_settings: "Paramètres Généraux", nav_languages: "Langues & Traduction", nav_files: "Bibliothèque de Fichiers",
    nav_trend: "Marché NFOOD / Trend Kitchen", nav_security: "Sécurité & Sessions", nav_health: "Santé du Système",
    settingsGroup: "Paramètres",
    card_restaurants: "Restaurants Actifs", card_accounts: "Comptes", card_subscriptions: "Abonnements",
    card_notifications: "Alertes", card_transfers: "Transferts en attente", card_files: "Fichiers Archivés",
    tab_orders: "Commandes", tab_customers: "Clients", tab_purchases: "Achats", tab_shipping: "Livraison & NFC",
    table_title: "Gestion des Commandes et Clients", table_subtitle: "Suivi des commandes, des clients, des achats et des expéditions",
    th_orderNum: "ID Commande", th_customer: "Client", th_restaurant: "Restaurant", th_status: "Statut",
    th_amount: "Montant", th_lastUpdate: "Dernière mise à jour", th_actions: "Actions", btn_viewDetails: "Voir les détails",
    status_pending: "En révision", status_completed: "Terminé", status_awaiting: "En attente de paiement",
    pagination: "sur",
    summary_title: "Résumé des Clients", sum_total: "Total des Clients", sum_active: "Clients Actifs", sum_profiles: "Profils Clients",
    btn_manageCustomers: "Gérer les Clients", btn_addCustomer: "Ajouter un Client", currency: "EUR",
    modal_title: "Détails de la Commande & Audit Financier", modal_close: "Fermer", modal_tax: "Numéro d'identification fiscale", modal_transfer_status: "Statut de l'impact du transfert",
    langLabel: "Français",
    osLabel: "Système NFOOD",
    adminBadge: "ADMIN CENTRAL",
    toast_mock: "Données de démonstration — détails à venir",
    toast_added: "Ajouté avec succès (démo)",
  },
};

const sectionPanels: Record<Language, Partial<Record<NavKey, SectionPanelConfig>>> = {
  ar: {
    superAdmin: { title: "المشرفون العامون", subtitle: "إدارة مشرفي المنصة وصلاحياتهم وسجل العمليات.", stats: [
      { label: "المشرفون الحاليون", value: "4", tone: "sky" },
      { label: "طلبات الترقية المعلقة", value: "2", tone: "orange" },
      { label: "سجل العمليات اليوم", value: "1,204", tone: "emerald" },
    ] },
    accounts: { title: "إدارة الحسابات", subtitle: "حسابات المطاعم والفرق والصلاحيات.", stats: [
      { label: "إجمالي الحسابات", value: "1,760", tone: "sky" },
      { label: "حسابات جديدة هذا الشهر", value: "86", tone: "emerald" },
      { label: "حسابات موقوفة", value: "12", tone: "rose" },
    ] },
    settings: { title: "الإعدادات العامة", subtitle: "إعدادات المنصة الأساسية والموقع والمظهر العام.", stats: [
      { label: "لغة الموقع", value: "العربية", tone: "orange" },
      { label: "العملة الافتراضية", value: "ريال (SAR)", tone: "emerald" },
      { label: "وضع الصيانة", value: "معطّل", tone: "sky" },
    ] },
    languages: { title: "اللغة والترجمة", subtitle: "لغة المنصة الافتراضية وخيارات الترجمة التلقائية.", stats: [
      { label: "اللغة الافتراضية", value: "العربية", tone: "orange" },
      { label: "اللغات المتاحة", value: "العربية · الإنجليزية · الفرنسية", tone: "emerald" },
      { label: "الترجمة التلقائية", value: "مفعّلة", tone: "sky" },
    ] },
    files: { title: "مكتبة الملفات", subtitle: "ملفات المنصة والوسائط والقوالب.", stats: [
      { label: "الملفات المخزنة", value: "860", tone: "sky" },
      { label: "مساحة مستخدمة", value: "2.4 GB", tone: "orange" },
      { label: "قوالب الوسائط", value: "45", tone: "emerald" },
    ] },
    trend: { title: "سوق نفود / مطبخ الترند", subtitle: "قوائم السوق، وتدفقات مطبخ الترند، والأصناف قيد المراجعة.", stats: [
      { label: "قوائم السوق النشطة", value: "28", tone: "emerald" },
      { label: "تدفقات مطبخ الترند", value: "9", tone: "orange" },
      { label: "أصناف بانتظار المراجعة", value: "6", tone: "sky" },
    ] },
    security: { title: "أمان الحساب والجلسات", subtitle: "الجلسات النشطة، والتحقق بخطوتين، وسجل تسجيل الدخول.", stats: [
      { label: "الجلسات النشطة", value: "142", tone: "sky" },
      { label: "التحقق بخطوتين (MFA)", value: "مفعّل", tone: "emerald" },
      { label: "محاولات دخول مشبوهة", value: "0", tone: "rose" },
    ] },
    health: { title: "صحة النظام", subtitle: "حالة الخادم وقاعدة البيانات وزمن الاستجابة.", stats: [
      { label: "قاعدة البيانات", value: "متصلة", tone: "emerald" },
      { label: "زمن الاستجابة", value: "48ms", tone: "orange" },
      { label: "وقت التشغيل", value: "99.98%", tone: "sky" },
    ] },
  },
  en: {
    superAdmin: { title: "Super Admin", subtitle: "Platform super admins, roles, and operation logs.", stats: [
      { label: "Current Admins", value: "4", tone: "sky" },
      { label: "Pending Upgrade Requests", value: "2", tone: "orange" },
      { label: "Today's Operation Log", value: "1,204", tone: "emerald" },
    ] },
    accounts: { title: "Accounts Management", subtitle: "Restaurant, team, and permission accounts.", stats: [
      { label: "Total Accounts", value: "1,760", tone: "sky" },
      { label: "New This Month", value: "86", tone: "emerald" },
      { label: "Suspended Accounts", value: "12", tone: "rose" },
    ] },
    settings: { title: "General Settings", subtitle: "Core platform, site, and appearance settings.", stats: [
      { label: "Site Language", value: "Arabic", tone: "orange" },
      { label: "Default Currency", value: "SAR", tone: "emerald" },
      { label: "Maintenance Mode", value: "Off", tone: "sky" },
    ] },
    languages: { title: "Languages & Translation", subtitle: "Default site language and auto-translation options.", stats: [
      { label: "Default Language", value: "Arabic", tone: "orange" },
      { label: "Available Languages", value: "Arabic · English · French", tone: "emerald" },
      { label: "Auto Translation", value: "Enabled", tone: "sky" },
    ] },
    files: { title: "File Library", subtitle: "Platform files, media, and templates.", stats: [
      { label: "Stored Files", value: "860", tone: "sky" },
      { label: "Storage Used", value: "2.4 GB", tone: "orange" },
      { label: "Media Templates", value: "45", tone: "emerald" },
    ] },
    trend: { title: "NFOOD Market / Trend Kitchen", subtitle: "Market listings, Trend Kitchen streams, and dishes in review.", stats: [
      { label: "Active Market Listings", value: "28", tone: "emerald" },
      { label: "Trend Kitchen Streams", value: "9", tone: "orange" },
      { label: "Dishes Awaiting Review", value: "6", tone: "sky" },
    ] },
    security: { title: "Security & Sessions", subtitle: "Active sessions, two-factor authentication, and sign-in history.", stats: [
      { label: "Active Sessions", value: "142", tone: "sky" },
      { label: "Two-Factor (MFA)", value: "Enabled", tone: "emerald" },
      { label: "Suspicious Sign-in Attempts", value: "0", tone: "rose" },
    ] },
    health: { title: "System Health", subtitle: "Server, database, and latency status.", stats: [
      { label: "Database", value: "Connected", tone: "emerald" },
      { label: "Latency", value: "48ms", tone: "orange" },
      { label: "Uptime", value: "99.98%", tone: "sky" },
    ] },
  },
  fr: {
    superAdmin: { title: "Super Admin", subtitle: "Super administrateurs de la plateforme, rôles et journaux.", stats: [
      { label: "Administrateurs actuels", value: "4", tone: "sky" },
      { label: "Demandes de mise à niveau", value: "2", tone: "orange" },
      { label: "Journal du jour", value: "1 204", tone: "emerald" },
    ] },
    accounts: { title: "Gestion des Comptes", subtitle: "Comptes restaurants, équipes et permissions.", stats: [
      { label: "Total des comptes", value: "1 760", tone: "sky" },
      { label: "Nouveaux ce mois-ci", value: "86", tone: "emerald" },
      { label: "Comptes suspendus", value: "12", tone: "rose" },
    ] },
    settings: { title: "Paramètres Généraux", subtitle: "Paramètres de base de la plateforme et du site.", stats: [
      { label: "Langue du site", value: "Arabe", tone: "orange" },
      { label: "Devise par défaut", value: "SAR", tone: "emerald" },
      { label: "Mode maintenance", value: "Désactivé", tone: "sky" },
    ] },
    languages: { title: "Langues & Traduction", subtitle: "Langue par défaut et traduction automatique.", stats: [
      { label: "Langue par défaut", value: "Arabe", tone: "orange" },
      { label: "Langues disponibles", value: "Arabe · Anglais · Français", tone: "emerald" },
      { label: "Traduction automatique", value: "Activée", tone: "sky" },
    ] },
    files: { title: "Bibliothèque de Fichiers", subtitle: "Fichiers, médias et modèles de la plateforme.", stats: [
      { label: "Fichiers stockés", value: "860", tone: "sky" },
      { label: "Stockage utilisé", value: "2,4 GB", tone: "orange" },
      { label: "Modèles médias", value: "45", tone: "emerald" },
    ] },
    trend: { title: "Marché NFOOD / Trend Kitchen", subtitle: "Annonces du marché, flux Trend Kitchen et plats en révision.", stats: [
      { label: "Annonces actives", value: "28", tone: "emerald" },
      { label: "Flux Trend Kitchen", value: "9", tone: "orange" },
      { label: "Plats en attente", value: "6", tone: "sky" },
    ] },
    security: { title: "Sécurité & Sessions", subtitle: "Sessions actives, authentification à deux facteurs et historique.", stats: [
      { label: "Sessions actives", value: "142", tone: "sky" },
      { label: "Double authentification", value: "Activée", tone: "emerald" },
      { label: "Tentatives suspectes", value: "0", tone: "rose" },
    ] },
    health: { title: "Santé du Système", subtitle: "État du serveur, de la base de données et de la latence.", stats: [
      { label: "Base de données", value: "Connectée", tone: "emerald" },
      { label: "Latence", value: "48ms", tone: "orange" },
      { label: "Disponibilité", value: "99,98 %", tone: "sky" },
    ] },
  },
};

type Language = "ar" | "en" | "fr";
type NavKey = "overview" | "superAdmin" | "accounts" | "settings" | "languages" | "files" | "trend" | "security" | "health";
type OrderType = { id: string; customer: string; email: string; restaurant: string; status: string; amount: number; date: string; taxId: string };

interface DashboardProps {
  onToggleTheme?: () => void;
  currentTheme?: string;
}

type SectionPanelConfig = {
  title: string;
  subtitle: string;
  stats: { label: string; value: string; tone: "orange" | "emerald" | "violet" | "rose" | "sky" }[];
};

const toneCls: Record<SectionPanelConfig["stats"][number]["tone"], string> = {
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
};

function SidebarLink({ icon, label, active, onClick }: { icon: ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-gradient-to-l from-orange-500/20 to-amber-500/10 text-orange-300 ring-1 ring-orange-500/40"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className={active ? "text-orange-400" : ""}>{icon}</span>
      {label}
    </button>
  );
}

function SectionPanel({ config, actionLabel, onAction }: { config?: SectionPanelConfig; actionLabel?: string; onAction?: (title: string) => void }) {
  if (!config) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
      <div className="border-b border-slate-100 p-5 dark:border-slate-700/50">
        <h2 className="text-base font-black">{config.title}</h2>
        <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{config.subtitle}</p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-3">
        {config.stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => onAction?.(config.title)}
            className="cursor-pointer rounded-xl bg-slate-50 p-4 text-start transition hover:bg-slate-100 hover:shadow-sm dark:bg-slate-900/40 dark:hover:bg-slate-800/60"
          >
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className={`mt-1.5 inline-flex rounded-full px-2.5 py-1 text-xs font-black ring-1 ring-inset ${toneCls[stat.tone]}`}>{stat.value}</p>
          </button>
        ))}
      </div>
      {actionLabel && (
        <div className="border-t border-slate-100 p-4 dark:border-slate-700/50">
          <button type="button" onClick={() => onAction?.(config.title)} className="w-full cursor-pointer rounded-xl bg-orange-500 py-2.5 text-xs font-black text-white transition hover:bg-orange-600">
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export function CentralAdminDashboard({ onToggleTheme, currentTheme }: DashboardProps) {
  const themeContext = useTheme();
  const dark = (currentTheme ?? themeContext.theme) === "dark";
  const toggleTheme = onToggleTheme ?? themeContext.toggleTheme;

  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem("nfood-lang");
    return stored === "ar" || stored === "en" || stored === "fr" ? stored : "ar";
  });
  const [activeTab, setActiveTab] = useState<string>("orders");
  const [activeNav, setActiveNav] = useState<NavKey>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = translations[lang];

  // مزامنة اتجاه وحفظ خيار اللغة في المتصفح تلقائياً
  useEffect(() => {
    document.documentElement.dir = t.dir;
    localStorage.setItem("nfood-lang", lang);
  }, [lang, t.dir]);

  useEffect(() => {
    if (!toastMsg) return;
    const id = window.setTimeout(() => setToastMsg(null), 2400);
    return () => window.clearTimeout(id);
  }, [toastMsg]);

  const notify = (message: string) => setToastMsg(message);

  const cycleLanguage = () => {
    const order: Language[] = ["ar", "en", "fr"];
    setLang((current) => order[(order.indexOf(current) + 1) % order.length]);
  };

  const mockOrders: OrderType[] = [
    { id: "#ORD-78432", customer: "شركة النخبة للتجارة", email: "elite@example.com", restaurant: "مطعم البيتزا الإيطالي", status: "pending", amount: 248.0, date: "2026/04/28 14:32", taxId: "TX-998877665" },
    { id: "#ORD-78431", customer: "مطبخ المذاق الفاخر", email: "taste@example.com", restaurant: "مطعم البرجر الذهبي", status: "completed", amount: 356.5, date: "2026/04/28 12:17", taxId: "TX-443322110" },
    { id: "#ORD-78430", customer: "مقهى اللؤلؤة", email: "pearl@example.com", restaurant: "مطعم المأكولات البحرية", status: "awaiting", amount: 172.75, date: "2026/04/27 19:48", taxId: "TX-556677889" },
  ];

  const statusMeta: Record<string, { label: string; cls: string }> = {
    pending: { label: t.status_pending, cls: "bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30" },
    completed: { label: t.status_completed, cls: "bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30" },
    awaiting: { label: t.status_awaiting, cls: "bg-violet-50 text-violet-600 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/30" },
  };

  const kpis = [
    { label: t.card_restaurants, value: "24", trend: "+3", up: true, icon: TrendingUp, nav: "accounts" as NavKey },
    { label: t.card_accounts, value: "3,412", trend: "+128", up: true, icon: Users, nav: "accounts" as NavKey },
    { label: t.card_subscriptions, value: "187", trend: "+9", up: true, icon: ShieldCheck, nav: "settings" as NavKey },
    { label: t.card_notifications, value: "12", trend: "-4", up: false, icon: Bell, nav: "overview" as NavKey },
    { label: t.card_transfers, value: "5", trend: "+2", up: true, icon: FileText, nav: "accounts" as NavKey },
    { label: t.card_files, value: "860", trend: "+45", up: true, icon: FolderOpen, nav: "files" as NavKey },
  ];

  const tabs = [
    { id: "orders", label: t.tab_orders, count: mockOrders.length },
    { id: "customers", label: t.tab_customers, count: 128 },
    { id: "purchases", label: t.tab_purchases, count: 9 },
    { id: "shipping", label: t.tab_shipping, count: 3 },
  ];

  const handleOpenModal = (order: OrderType) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div dir={t.dir} className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-[#f8fafc]">
      <div className="flex h-screen overflow-hidden">

        {/* شاشة التغطية الشفافة للجوال */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* القائمة الجانبية المرنة المتجاوبة مع اتجاه النص */}
        <aside className={`fixed inset-y-0 start-0 z-40 flex w-72 flex-shrink-0 flex-col border-e bg-[#0f172a] text-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 dark:bg-[#1e293b] border-slate-700 ${isSidebarOpen ? "translate-x-0" : t.dir === "rtl" ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex items-center justify-between border-b border-slate-700/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 font-bold text-white">NF</div>
              <div>
                <h1 className="text-lg font-bold tracking-wider text-white">{t.projectName}</h1>
                <p className="text-xs text-slate-400">{t.adminBadge}</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 lg:hidden">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            <SidebarLink icon={<LayoutDashboard size={18} />} label={t.nav_overview} active={activeNav === "overview"} onClick={() => setActiveNav("overview")} />
            <SidebarLink icon={<ShieldAlert size={18} />} label={t.nav_superAdmin} active={activeNav === "superAdmin"} onClick={() => setActiveNav("superAdmin")} />
            <SidebarLink icon={<Users size={18} />} label={t.nav_accounts} active={activeNav === "accounts"} onClick={() => setActiveNav("accounts")} />
            <div className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{t.settingsGroup}</div>
            <SidebarLink icon={<Settings size={18} />} label={t.nav_settings} active={activeNav === "settings"} onClick={() => setActiveNav("settings")} />
            <SidebarLink icon={<Languages size={18} />} label={t.nav_languages} active={activeNav === "languages"} onClick={() => setActiveNav("languages")} />
            <SidebarLink icon={<FolderOpen size={18} />} label={t.nav_files} active={activeNav === "files"} onClick={() => setActiveNav("files")} />
            <SidebarLink icon={<TrendingUp size={18} />} label={t.nav_trend} active={activeNav === "trend"} onClick={() => setActiveNav("trend")} />
            <SidebarLink icon={<ShieldCheck size={18} />} label={t.nav_security} active={activeNav === "security"} onClick={() => setActiveNav("security")} />
            <SidebarLink icon={<HeartPulse size={18} />} label={t.nav_health} active={activeNav === "health"} onClick={() => setActiveNav("health")} />
          </nav>

          <div className="border-t border-slate-700/50 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-xs text-slate-300">
              <HeartPulse size={16} className="text-emerald-400" />
              <span>{t.systemReady} · {t.osLabel}</span>
            </div>
          </div>
        </aside>

        {/* منطقة المحتوى الرئيسية */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* الشريط العلوي */}
          <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-700/60 dark:bg-[#0f172a]/90">
            <div className="flex min-w-0 items-center gap-3">
              <button onClick={() => setIsSidebarOpen(true)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
                <Menu size={18} />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{t.panelTitle}</p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{t.panelSubtitle}</p>
              </div>
              <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600 ring-1 ring-emerald-200 md:inline-flex dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">
                <ShieldCheck size={12} />
                {t.systemReady}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="relative hidden sm:block">
                <Search size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input placeholder={t.searchPlaceholder} className="h-9 w-56 rounded-xl border border-slate-200 bg-slate-50 ps-9 text-sm outline-none placeholder:text-slate-400 focus:border-orange-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
              </div>
              <button type="button" onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button type="button" onClick={cycleLanguage} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" title={t.langLabel}>
                <Globe size={17} />
              </button>
              <button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                <Bell size={17} />
                <span className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-[#0f172a]" />
              </button>
            </div>
          </header>

          <main className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
            {activeNav === "overview" ? (
              <>
            {/* بطاقات الأداء */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {kpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <button type="button" key={kpi.label} onClick={() => setActiveNav(kpi.nav)} className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-start shadow-sm transition hover:border-orange-200 hover:shadow-md dark:border-slate-700/60 dark:bg-[#1e293b] dark:hover:border-orange-500/40">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400">
                        <Icon size={17} />
                      </span>
                      <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-black ${kpi.up ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"}`}>
                        {kpi.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                        {kpi.trend}
                      </span>
                    </div>
                    <p className="mt-3 text-2xl font-black tracking-tight">{kpi.value}</p>
                    <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400">{kpi.label}</p>
                  </button>
                );
              })}
            </div>

            {/* التبويبات */}
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition ${activeTab === tab.id ? "bg-[#0f172a] text-white shadow-sm dark:bg-orange-500 dark:text-slate-900" : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:bg-slate-800"}`}
                >
                  {tab.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeTab === tab.id ? "bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{tab.count}</span>
                </button>
              ))}
            </div>

            {activeTab === "orders" && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 p-5 dark:border-slate-700/50">
                  <div>
                    <h2 className="text-base font-black">{t.table_title}</h2>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{t.table_subtitle}</p>
                  </div>
                  <button type="button" onClick={() => handleOpenModal(mockOrders[0])} className="flex cursor-pointer items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black text-orange-600 transition hover:bg-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20">
                    <ShieldCheck size={11} />
                    {t.btn_viewDetails}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-right text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 dark:bg-slate-900/40">
                        <th className="px-5 py-3">{t.th_orderNum}</th>
                        <th className="px-5 py-3">{t.th_customer}</th>
                        <th className="px-5 py-3">{t.th_restaurant}</th>
                        <th className="px-5 py-3">{t.th_status}</th>
                        <th className="px-5 py-3">{t.th_amount}</th>
                        <th className="px-5 py-3">{t.th_lastUpdate}</th>
                        <th className="px-5 py-3">{t.th_actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => {
                        const status = statusMeta[order.status] ?? statusMeta.pending;
                        return (
                          <tr key={order.id} className="border-t border-slate-100 transition hover:bg-slate-50/60 dark:border-slate-700/40 dark:hover:bg-slate-800/40">
                            <td className="px-5 py-4 font-mono text-xs font-bold">{order.id}</td>
                            <td className="px-5 py-4">
                              <p className="font-semibold">{order.customer}</p>
                              <p className="mt-0.5 text-[11px] text-slate-400">{order.email}</p>
                            </td>
                            <td className="px-5 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">{order.restaurant}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-black ring-1 ${status.cls}`}>{status.label}</span>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 font-bold">
                              {order.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                              <span className="text-[10px] font-semibold text-slate-400"> {t.currency}</span>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400" dir="ltr">{order.date}</td>
                            <td className="px-5 py-4">
                              <button type="button" onClick={() => handleOpenModal(order)} className="rounded-xl bg-orange-50 px-3 py-1.5 text-[11px] font-black text-orange-600 ring-1 ring-orange-200 transition hover:bg-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/30 dark:hover:bg-orange-500/20">
                                {t.btn_viewDetails}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-700/50">
                  <p className="text-[11px] text-slate-400">
                    1–{mockOrders.length} {t.pagination} {mockOrders.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <button type="button" disabled className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-300 disabled:opacity-50 dark:border-slate-700">
                      <ChevronLeft size={15} />
                    </button>
                    <button type="button" disabled className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-300 disabled:opacity-50 dark:border-slate-700">
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "customers" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                <UserCheck size={28} className="mx-auto text-slate-300" />
                <p className="mt-3 text-sm font-black">{t.summary_title}</p>
                <p className="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-slate-400">{t.table_subtitle}</p>
              </div>
            )}

            {activeTab === "purchases" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                <FileText size={28} className="mx-auto text-slate-300" />
                <p className="mt-3 text-sm font-black">{t.tab_purchases}</p>
                <p className="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-slate-400">{t.table_subtitle}</p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                <TrendingUp size={28} className="mx-auto text-slate-300" />
                <p className="mt-3 text-sm font-black">{t.tab_shipping}</p>
                <p className="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-slate-400">{t.table_subtitle}</p>
              </div>
            )}

            {/* ملخص العملاء */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black">{t.summary_title}</h3>
                  <p className="mt-1 text-[11px] text-slate-400">{t.table_subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => notify(t.toast_mock)} className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                    <UserCheck size={14} />
                    {t.btn_manageCustomers}
                  </button>
                  <button type="button" onClick={() => notify(t.toast_added)} className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2 text-[11px] font-black text-white transition hover:bg-orange-600">
                    <Plus size={14} />
                    {t.btn_addCustomer}
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t.sum_total}</p>
                  <p className="mt-1 text-2xl font-black">2,450</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{t.sum_active}</p>
                  <p className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-400">1,842</p>
                </div>
                <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                  <p className="text-[11px] font-semibold text-violet-600 dark:text-violet-400">{t.sum_profiles}</p>
                  <p className="mt-1 text-2xl font-black text-violet-700 dark:text-violet-400">608</p>
                </div>
              </div>
            </div>
              </>
            ) : (
              <SectionPanel config={sectionPanels[lang]?.[activeNav]} actionLabel={t.btn_viewDetails} onAction={() => notify(t.toast_mock)} />
            )}
          </main>
        </div>
      </div>

      {/* نافذة تفاصيل الطلب */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => setIsModalOpen(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#1e293b]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-black">{t.modal_title}</h3>
                <p className="mt-1 font-mono text-xs text-slate-400">{selectedOrder.id}</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={17} />
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.th_customer}</p>
                <p className="mt-1 text-sm font-bold">{selectedOrder.customer}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{selectedOrder.email}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.th_restaurant}</p>
                <p className="mt-1 text-sm font-bold">{selectedOrder.restaurant}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.th_amount}</p>
                <p className="mt-1 text-sm font-black text-orange-600 dark:text-orange-400">
                  {selectedOrder.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} {t.currency}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.th_status}</p>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ring-1 ${(statusMeta[selectedOrder.status] ?? statusMeta.pending).cls}`}>
                  {(statusMeta[selectedOrder.status] ?? statusMeta.pending).label}
                </span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.modal_tax}</p>
                <p className="mt-1 font-mono text-sm font-bold">{selectedOrder.taxId}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.modal_transfer_status}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight size={13} />
                  {t.status_completed}
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setIsModalOpen(false)} className="mt-5 w-full rounded-xl bg-[#0f172a] py-2.5 text-sm font-black text-white transition hover:bg-slate-800 dark:bg-orange-500 dark:text-slate-900 dark:hover:bg-orange-600">
              {t.modal_close}
            </button>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="pointer-events-none fixed inset-x-0 top-5 z-[60] flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black shadow-xl dark:border-slate-700 dark:bg-[#1e293b] dark:text-slate-100">
            <CheckCircle2 size={15} className="text-emerald-500" />
            {toastMsg}
          </div>
        </div>
      )}
    </div>
  );
}