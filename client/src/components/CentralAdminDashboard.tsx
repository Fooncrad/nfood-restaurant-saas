import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, ShieldAlert, Users, Settings, Languages,
  FolderOpen, TrendingUp, ShieldCheck, HeartPulse, Search,
  Bell, Sun, Moon, Globe, ArrowUpRight, ArrowDownRight, Plus,
  UserCheck, X, FileText, Menu, CheckCircle2, Apple, ShoppingCart,
  Shirt, Car, Scissors, HardHat, Eye, ToggleLeft, ToggleRight,
  ArrowUpCircle, ExternalLink, Waves,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const translations = {
  ar: {
    dir: 'rtl', projectName: 'نفود المشتركة', panelTitle: 'الأدمن المركزي والمؤسسي', panelSubtitle: 'إدارة أفرع الخدمات، القدرات، القطاعات وتعديل حزم الاشتراكات البينية', systemReady: 'النظام حي ومستقر', searchPlaceholder: 'ابحث عن منشأة، طلب، عميل... (Ctrl + K)', adminCenter: 'مركز التحكم', adminBadge: 'بوابة التحكم العليا',
    nav_overview: 'نظرة عامة والعمليات', nav_superAdmin: 'Super Admin', nav_admin: 'الإدارة المركزية', nav_accounts: 'إدارة الحسابات والأدوار', nav_settings: 'الإعدادات العامة', settingsGroup: 'الإعدادات والتخصيص', nav_languages: 'اللغة والترجمة', nav_files: 'مكتبة الملفات المركزية', nav_trend: 'سوق نفود / Trend Kitchen', nav_security: 'أمان الحساب والجلسات', nav_health: 'صحة النظام والـ Logs',
    nav_future_modules: 'حوكمة القطاعات والوحدات الشاملة (8 وحدات)', nav_veg: 'وحدة الخضار والفواكه', nav_grocery: 'وحدة البقالات والتموينات', nav_laundry: 'وحدة مغاسل الملابس', nav_auto: 'وحدة خدمات السيارات', nav_barber: 'وحدة الصالونات ومراكز التجميل', nav_public: 'وحدة الأشغال العامة والصيانة', nav_fashion: 'وحدة الموضة والأزياء والملبوسات',
    card_restaurants: 'المنشآت النشطة', card_accounts: 'الحسابات الكلية', card_subscriptions: 'الاشتراكات الفعالة', card_notifications: 'التنبيهات العاجلة', card_transfers: 'التحويلات المعلقة', card_files: 'ملفات السيرفر',
    table_title: 'منظومة حوكمة القدرات وتغيير الباقات بضغطة زر', table_subtitle: 'تنشيط وإيقاف القطاعات، تعديل الحزم الفورية، مراجعة الحسابات، ومعاينة القوائم الإلكترونية الحية',
    th_orderNum: 'المعرف الرقمي', th_customer: 'الجهة / المنشأة', th_restaurant: 'النوع / القطاع', th_status: 'الحالة التشغيلية', th_amount: 'الحزمة الحالية', th_lastUpdate: 'آخر تحديث', th_actions: 'إجراءات الحوكمة السريعة', btn_viewDetails: 'معاينة حية',
    status_pending: 'قيد المراجعة', status_completed: 'نشط وفعال', summary_title: 'مفاتيح تنشيط القدرات والقطاعات', sum_total: 'تفعيل إضافات العملاء', sum_active: 'تفعيل تفرع المطاعم', sum_profiles: 'تفعيل قواميس الترجمة',
    btn_manageCustomers: 'تنشيط كافة الوظائف', btn_addCustomer: 'إضافة منشأة جديدة', currency: 'ريال', modal_title: 'معاينة الكتالوج الرقمي والتدقيق التشغيلي والمستندي', modal_close: 'إغلاق المعاينة', modal_tax: 'الرقم الضريبي / السجل التجاري', modal_transfer_status: 'حالة ترخيص الخدمة',
    loading: 'جارٍ تحميل البيانات الحية...', empty: 'لا توجد منشآت ضمن النطاق المحدد', plan_now: 'الأعلى', plan_upgrade: 'ترقية الحزمة الآن', toggling: 'تبديل الحالة...', upgrading: 'ترقية...', actionToggle: 'تفعيل / إيقاف', planLook: 'الحزمة الحالية',
  },
  en: {
    dir: 'ltr', projectName: 'NFOOD Ecosystem', panelTitle: 'Central & Enterprise Admin', panelSubtitle: 'Instant feature toggles, business sector activation & subscription plan upgrades', systemReady: 'System Live & Stable', searchPlaceholder: 'Search entities... (Ctrl + K)', adminCenter: 'Control Center', adminBadge: 'Master Control Gateway',
    nav_overview: 'Overview & Ops', nav_superAdmin: 'Super Admin', nav_admin: 'Central Admin', nav_accounts: 'Accounts & Roles', nav_settings: 'General Settings', settingsGroup: 'Settings & Customization', nav_languages: 'Languages & Local', nav_files: 'Central File Library', nav_trend: 'NFOOD Market / Trend Kitchen', nav_security: 'Security & Sessions', nav_health: 'System Health & Logs',
    nav_future_modules: 'Ecosystem Modules & Governance (8 Units)', nav_veg: 'Vegetables & Fruits Unit', nav_grocery: 'Grocery & Supermarkets', nav_laundry: 'Laundries Unit', nav_auto: 'Automotive Services', nav_barber: 'Beauty Salons & Barbers', nav_public: 'Public Works & Maintenance', nav_fashion: 'Fashion & Apparel Unit',
    card_restaurants: 'Active Entities', card_accounts: 'Total Accounts', card_subscriptions: 'Active Licenses', card_notifications: 'Urgent Alerts', card_transfers: 'Pending Transfers', card_files: 'Server Storage',
    table_title: 'Ecosystem Control & Plan Upgrade Panel', table_subtitle: 'Activate/deactivate business modules, switch tier plans instantly, audit billing, and preview digital menus',
    th_orderNum: 'Entity ID', th_customer: 'Entity / Client', th_restaurant: 'Type / Sector', th_status: 'Operational Status', th_amount: 'Current Plan', th_lastUpdate: 'Last Update', th_actions: 'Governance Actions', btn_viewDetails: 'Preview Live Menu',
    status_pending: 'Pending Review', status_completed: 'Active & Enabled', summary_title: 'Feature Flags & Master Toggles', sum_total: 'Enable Customer Addons', sum_active: 'Enable Multi-Branching', sum_profiles: 'Enable Transliteration',
    btn_manageCustomers: 'Activate All Capabilities', btn_addCustomer: 'Add New Entity', currency: 'SAR', modal_title: 'Menu Preview & Compliance Audit', modal_close: 'Close Preview', modal_tax: 'Tax ID / Commercial Registry', modal_transfer_status: 'Service Licensing Status',
    loading: 'Loading live data...', empty: 'No entities in the current scope', plan_now: 'Top', plan_upgrade: 'Upgrade Plan Now', toggling: 'Toggling status...', upgrading: 'Upgrading...', actionToggle: 'Toggle Status', planLook: 'Current Plan',
  },
  fr: {
    dir: 'ltr', projectName: 'Écosystème NFOOD', panelTitle: 'Admin Central & Entreprise', panelSubtitle: 'Activation instantanée des fonctionnalités, des secteurs et mise à niveau des forfaits', systemReady: 'Système En Ligne', searchPlaceholder: 'Rechercher des entités... (Ctrl + K)', adminCenter: 'Centre de Contrôle', adminBadge: 'Passerelle de Contrôle Maître',
    nav_overview: 'Vue d\'ensemble', nav_superAdmin: 'Super Admin', nav_admin: 'Admin Central', nav_accounts: 'Comptes & Rôles', nav_settings: 'Paramètres Généraux', settingsGroup: 'Paramètres & Personnalisation', nav_languages: 'Langues & Dictionnaire', nav_files: 'Bibliothèque Centrale', nav_trend: 'Marché NFOOD / Trend Kitchen', nav_security: 'Sécurité & Sessions', nav_health: 'Santé du Système & Logs',
    nav_future_modules: 'Modules Écosystème & Gouvernance (8 Unités)', nav_veg: 'Secteur Fruits & Légumes', nav_grocery: 'Épiceries & Supermarchés', nav_laundry: 'Secteur Blanchisserie', nav_auto: 'Services Automobiles', nav_barber: 'Salons de Beauté & Coiffure', nav_public: 'Travaux Publics & Maintenance', nav_fashion: 'Secteur de la Mode',
    card_restaurants: 'Entités Actives', card_accounts: 'Comptes Totaux', card_subscriptions: 'Licences Actives', card_notifications: 'Alertes Urgentes', card_transfers: 'Transferts En Attente', card_files: 'Stockage Serveur',
    tab_orders: 'Commandes & Opérations', tab_customers: 'Intégration Clients', tab_purchases: 'Restaurants & Abonnements', tab_shipping: 'Livraison & Cartes NFC', table_title: 'Gestion des Capacités & Forfaits en 1-Clic', table_subtitle: 'Activer/désactiver les modules, changer de forfait instantanément et prévisualiser les catalogues',
    th_orderNum: 'ID Entité', th_customer: 'Entité / Client', th_restaurant: 'Type / Secteur', th_status: 'Statut Opérationnel', th_amount: 'Forfait Actuel', th_lastUpdate: 'Dernière Mise à Jour', th_actions: 'Actions de Gouvernance', btn_viewDetails: 'Aperçu Menu',
    status_pending: 'En Révision', status_completed: 'Actif & Activé', summary_title: 'Flags de Fonctionnalités', sum_total: 'Activer Addons Clients', sum_active: 'Activer Multi-Branches', sum_profiles: 'Activer Traduction Automatique',
    btn_manageCustomers: 'Activer Toutes les Fonctions', btn_addCustomer: 'Ajouter une Entité', currency: 'EUR', modal_title: 'Aperçu du Menu & Audit de Conformité', modal_close: 'Fermer l\'Aperçu', modal_tax: 'ID Fiscal / Registre du Commerce', modal_transfer_status: 'Statut de Licence de Service',
    loading: 'Chargement des données en direct...', empty: 'Aucune entité dans ce périmètre', plan_now: 'Top', plan_upgrade: 'Mettre à Niveau le Forfait', toggling: 'Bascule du statut...', upgrading: 'Mise à niveau...', actionToggle: 'Basculer le Statut', planLook: 'Forfait Actuel',
  },
};

type Language = 'ar' | 'en' | 'fr';
type NavSection = 'overview' | 'admin' | 'accounts' | 'settings' | 'languages' | 'files' | 'trend' | 'security' | 'health' | 'veg' | 'grocery' | 'laundry' | 'auto' | 'barber' | 'public' | 'fashion';
type OrderType = { id: string; customer: string; email: string; restaurant: string; status: boolean; plan: 'Basic' | 'Pro' | 'Enterprise'; date: string; taxId: string; catalog?: { totalItems: number; isPublic: boolean; catalogUrl: string | null } | null };

const SECTOR_LABELS: Record<Language, Record<string, string>> = {
  ar: { restaurant: 'مطاعم', vegetables: 'خضار وفواكه', grocery: 'بقالات', laundry: 'مغاسل', automotive: 'سيارات', beauty_salon: 'صالونات', public_works: 'أشغال عامة', fashion: 'موضة' },
  en: { restaurant: 'Restaurants', vegetables: 'Vegetables & Fruits', grocery: 'Grocery', laundry: 'Laundries', automotive: 'Automotive', beauty_salon: 'Beauty Salons', public_works: 'Public Works', fashion: 'Fashion' },
  fr: { restaurant: 'Restaurants', vegetables: 'Fruits & Légumes', grocery: 'Épicerie', laundry: 'Blanchisserie', automotive: 'Automobile', beauty_salon: 'Salons de Beauté', public_works: 'Travaux Publics', fashion: 'Mode' },
};

const SECTOR_NAV: { key: NavSection; icon: typeof Apple; label: (t: typeof translations['ar']) => string }[] = [
  { key: 'veg', icon: Apple, label: (t) => t.nav_veg },
  { key: 'grocery', icon: ShoppingCart, label: (t) => t.nav_grocery },
  { key: 'laundry', icon: Waves, label: (t) => t.nav_laundry },
  { key: 'auto', icon: Car, label: (t) => t.nav_auto },
  { key: 'barber', icon: Scissors, label: (t) => t.nav_barber },
  { key: 'public', icon: HardHat, label: (t) => t.nav_public },
  { key: 'fashion', icon: Shirt, label: (t) => t.nav_fashion },
];

const ALL_SECTORS = new Set<NavSection>(['veg', 'grocery', 'laundry', 'auto', 'barber', 'public', 'fashion']);

function SidebarLink({ icon, label, active, onClick }: { icon: ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? 'bg-gradient-to-l from-orange-500/20 to-amber-500/10 text-orange-300 ring-1 ring-orange-500/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
      <span className={`${active ? 'text-orange-400' : ''} shrink-0`}>{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function SectionGroupLabel({ children }: { children: ReactNode }) {
  return <div className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{children}</div>;
}

export function CentralAdminDashboard({ onToggleTheme, currentTheme }: { onToggleTheme?: () => void, currentTheme: string }) {
  const dark = currentTheme === 'dark';
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('nfood-lang') as Language) || 'ar');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<NavSection>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [features, setFeatures] = useState({ customers: true, restaurants: true, translations: false });
  const [selectedPlan, setSelectedPlan] = useState<'Basic' | 'Pro' | 'Enterprise'>('Basic');

  const t = translations[lang];

  const { data: liveData, isLoading, refetch } = trpc.admin.getPlatformEntities.useQuery(
    { sector: currentSection, search: searchQuery }
  );

  const toggleStatusMutation = trpc.admin.toggleEntityStatus.useMutation({
    onSuccess: () => { toast.success(lang === 'ar' ? 'تم تحديث حالة تفعيل المنشأة بنجاح' : lang === 'en' ? 'Entity status updated successfully' : 'Statut de l\'entité mis à jour'); refetch(); },
    onError: () => toast.error(lang === 'ar' ? 'فشل تعديل حالة المنشأة' : lang === 'en' ? 'Failed to update entity status' : 'Échec de la mise à jour du statut'),
  });

  const upgradePlanMutation = trpc.admin.upgradeEntityPlan.useMutation({
    onSuccess: (data) => { toast.success(lang === 'ar' ? `تم تبديل الحزمة بنجاح إلى ${data.nextPlan}` : lang === 'en' ? `Plan switched to ${data.nextPlan}` : `Forfait passé à ${data.nextPlan}`); refetch(); },
    onError: () => toast.error(lang === 'ar' ? 'فشل ترقية باقة المنشأة' : lang === 'en' ? 'Failed to upgrade plan' : 'Échec de la mise à niveau du forfait'),
  });

  useEffect(() => {
    document.documentElement.dir = t.dir;
    localStorage.setItem('nfood-lang', lang);
  }, [lang, t.dir]);

  const summary = liveData?.summary;

  const orders: OrderType[] = (liveData?.entities ?? []).map((row) => ({
    id: row.id,
    customer: row.customerName,
    email: row.email,
    restaurant: SECTOR_LABELS[lang][row.sector] ?? row.sector,
    status: row.status,
    plan: row.plan,
    date: new Date(row.createdAt).toLocaleString(lang === 'ar' ? 'ar-SA' : lang === 'en' ? 'en-GB' : 'fr-FR', { dateStyle: 'medium', timeStyle: 'short' }),
    taxId: row.taxId,
    catalog: row.catalog,
  }));

  const handleOpenModal = (order: OrderType) => {
    setSelectedOrder(order);
    setSelectedPlan(order.plan);
    setIsModalOpen(true);
  };

  const cycleLanguage = () => {
    const order: Language[] = ['ar', 'en', 'fr'];
    setLang((current) => order[(order.indexOf(current) + 1) % order.length]);
  };

  const isSectorSection = ALL_SECTORS.has(currentSection);
  const showEntityTable = currentSection === 'overview' || isSectorSection;

  const kpis = [
    { label: t.card_restaurants, value: String(summary?.active ?? 0), trend: String(liveData?.entities.filter((row) => row.status).length ?? 0), up: true, icon: TrendingUp },
    { label: t.card_accounts, value: String(summary?.total ?? 0), trend: String(summary?.suspended ?? 0), up: false, icon: Users },
    { label: t.card_subscriptions, value: String(liveData?.byPlan['Enterprise'] ?? 0), trend: String(liveData?.byPlan['Pro'] ?? 0), up: true, icon: ShieldCheck },
    { label: t.card_notifications, value: String(liveData?.recentGovernance?.length ?? 0), trend: String(summary?.suspended ?? 0), up: false, icon: Bell },
    { label: t.card_transfers, value: String(summary?.catalogs ?? 0), trend: String(liveData?.byPlan['Basic'] ?? 0), up: false, icon: FileText },
    { label: t.card_files, value: String((liveData?.entities.filter((row) => row.catalog?.totalItems).length ?? 0)), trend: '∞', up: true, icon: FolderOpen },
  ];

  const planCls: Record<'Basic' | 'Pro' | 'Enterprise', string> = {
    Basic: 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
    Pro: 'bg-violet-50 text-violet-600 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/30',
    Enterprise: 'bg-orange-50 text-orange-600 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/30',
  };

  return (
    <div dir={t.dir} className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-[#f8fafc]">
      <div className="flex h-screen overflow-hidden">

        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        <aside className={`fixed inset-y-0 start-0 z-40 flex w-72 flex-col border-e bg-[#0f172a] text-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 dark:bg-[#1e293b] ${isSidebarOpen ? 'translate-x-0' : t.dir === 'rtl' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex items-center justify-between border-b border-slate-700/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 font-black text-white">NF</div>
              <div>
                <h1 className="text-lg font-black tracking-wider text-white">{t.projectName}</h1>
                <p className="text-xs text-slate-400">{t.adminBadge ?? t.adminCenter}</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 lg:hidden" aria-label="close">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            <SidebarLink icon={<LayoutDashboard size={18} />} label={t.nav_overview} active={currentSection === 'overview'} onClick={() => setCurrentSection('overview')} />
            <SidebarLink icon={<ShieldAlert size={18} />} label={t.nav_superAdmin} active={currentSection === 'admin'} onClick={() => setCurrentSection('admin')} />
            <SidebarLink icon={<Users size={18} />} label={t.nav_accounts} active={currentSection === 'accounts'} onClick={() => setCurrentSection('accounts')} />
            <SectionGroupLabel>{t.settingsGroup ?? 'الإعدادات والتخصيص'}</SectionGroupLabel>
            <SidebarLink icon={<Settings size={18} />} label={t.nav_settings} active={currentSection === 'settings'} onClick={() => setCurrentSection('settings')} />
            <SidebarLink icon={<Languages size={18} />} label={t.nav_languages} active={currentSection === 'languages'} onClick={() => setCurrentSection('languages')} />
            <SidebarLink icon={<FolderOpen size={18} />} label={t.nav_files} active={currentSection === 'files'} onClick={() => setCurrentSection('files')} />
            <SidebarLink icon={<TrendingUp size={18} />} label={t.nav_trend} active={currentSection === 'trend'} onClick={() => setCurrentSection('trend')} />
            <SidebarLink icon={<ShieldCheck size={18} />} label={t.nav_security} active={currentSection === 'security'} onClick={() => setCurrentSection('security')} />
            <SidebarLink icon={<HeartPulse size={18} />} label={t.nav_health} active={currentSection === 'health'} onClick={() => setCurrentSection('health')} />
            <SectionGroupLabel>{t.nav_future_modules}</SectionGroupLabel>
            {SECTOR_NAV.map((sector) => {
              const Icon = sector.icon;
              return <SidebarLink key={sector.key} icon={<Icon size={18} />} label={sector.label(t)} active={currentSection === sector.key} onClick={() => setCurrentSection(sector.key)} />;
            })}
          </nav>

          <div className="border-t border-slate-700/50 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-xs text-slate-300">
              <HeartPulse size={16} className="text-emerald-400" />
              <span>{t.systemReady} · {t.adminCenter}</span>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-700/60 dark:bg-[#0f172a]/90">
            <div className="flex min-w-0 items-center gap-3">
              <button onClick={() => setIsSidebarOpen(true)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" aria-label="menu">
                <Menu size={18} />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{t.panelTitle}</p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{t.panelSubtitle}</p>
              </div>
              <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600 ring-1 ring-emerald-200 md:inline-flex dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">
                <CheckCircle2 size={12} />
                {t.systemReady}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="relative hidden sm:block">
                <Search size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="h-9 w-56 rounded-xl border border-slate-200 bg-slate-50 ps-9 text-sm outline-none placeholder:text-slate-400 focus:border-orange-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <button type="button" onClick={() => onToggleTheme?.()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="theme">
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button type="button" onClick={cycleLanguage} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="language">
                <Globe size={17} />
              </button>
              <button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="notifications">
                <Bell size={17} />
                <span className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-[#0f172a]" />
              </button>
            </div>
          </header>

          <main className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
            {showEntityTable ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                  {kpis.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-start shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400">
                            <Icon size={17} />
                          </span>
                          <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-black ${kpi.up ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                            {kpi.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                            {kpi.trend}
                          </span>
                        </div>
                        <p className="mt-3 text-2xl font-black tracking-tight">{kpi.value}</p>
                        <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400">{kpi.label}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 p-5 dark:border-slate-700/50">
                    <div>
                      <h2 className="text-base font-black">{t.table_title}</h2>
                      <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{t.table_subtitle}</p>
                    </div>
                    <button type="button" onClick={() => handleOpenModal(orders[0])} disabled={!orders.length} className="flex cursor-pointer items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black text-orange-600 transition hover:bg-orange-100 disabled:cursor-default disabled:opacity-40 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20">
                      <ShieldCheck size={11} />
                      {t.btn_viewDetails}
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[780px] text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 dark:bg-slate-900/40">
                          <th className="px-5 py-3 text-start">{t.th_orderNum}</th>
                          <th className="px-5 py-3 text-start">{t.th_customer}</th>
                          <th className="px-5 py-3 text-start">{t.th_restaurant}</th>
                          <th className="px-5 py-3 text-start">{t.th_status}</th>
                          <th className="px-5 py-3 text-start">{t.th_amount}</th>
                          <th className="px-5 py-3 text-start">{t.th_lastUpdate}</th>
                          <th className="px-5 py-3 text-start">{t.th_actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan={7} className="px-5 py-10 text-center text-xs font-semibold text-slate-400">{t.loading}</td>
                          </tr>
                        ) : orders.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-5 py-10 text-center text-xs font-semibold text-slate-400">{t.empty}</td>
                          </tr>
                        ) : orders.map((order) => (
                          <tr key={order.id} className="border-t border-slate-100 transition hover:bg-slate-50/60 dark:border-slate-700/40 dark:hover:bg-slate-800/40">
                            <td className="px-5 py-4 font-mono text-xs font-bold">{order.id}</td>
                            <td className="px-5 py-4">
                              <p className="font-semibold">{order.customer}</p>
                              <p className="mt-0.5 text-[11px] text-slate-400" dir="ltr">{order.email}</p>
                            </td>
                            <td className="px-5 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">{order.restaurant}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-black ring-1 ${order.status ? 'bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30' : 'bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30'}`}>
                                {order.status ? t.status_completed : t.status_pending}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-black ring-1 ${planCls[order.plan]}`}>{order.plan}</span>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400" dir="ltr">{order.date}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleStatusMutation.mutate({ entityId: order.id })}
                                  disabled={toggleStatusMutation.isPending}
                                  title={t.actionToggle}
                                  className={`flex cursor-pointer items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-black ring-1 ring-inset transition disabled:opacity-50 ${order.status ? 'bg-rose-50 text-rose-600 ring-rose-200 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/30 dark:hover:bg-rose-500/20' : 'bg-emerald-50 text-emerald-600 ring-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30 dark:hover:bg-emerald-500/20'}`}
                                >
                                  {order.status ? <ToggleLeft size={13} /> : <ToggleRight size={13} />}
                                  {lang === 'ar' ? (order.status ? 'إيقاف' : 'تفعيل') : lang === 'en' ? (order.status ? 'Off' : 'On') : (order.status ? 'Off' : 'On')}
                                </button>
                                <button type="button" onClick={() => handleOpenModal(order)} className="flex cursor-pointer items-center gap-1 rounded-xl bg-orange-50 px-2.5 py-1.5 text-[11px] font-black text-orange-600 ring-1 ring-orange-200 transition hover:bg-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/30 dark:hover:bg-orange-500/20">
                                  <Eye size={13} />
                                  {t.btn_viewDetails}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-700/50">
                    <p className="text-[11px] text-slate-400">
                      {orders.length} {t.th_actions === 'إجراءات الحوكمة السريعة' ? 'منشأة' : 'entities'}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black">{t.summary_title}</h3>
                      <p className="mt-1 text-[11px] text-slate-400">{t.table_subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setFeatures((f) => ({ ...f, customers: !f.customers }))} className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                        {features.customers ? <ToggleRight size={14} className="text-orange-500" /> : <ToggleLeft size={14} />}
                        {t.sum_total}
                      </button>
                      <button type="button" onClick={() => setFeatures((f) => ({ ...f, restaurants: !f.restaurants }))} className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                        {features.restaurants ? <ToggleRight size={14} className="text-orange-500" /> : <ToggleLeft size={14} />}
                        {t.sum_active}
                      </button>
                      <button type="button" onClick={() => setFeatures((f) => ({ ...f, translations: !f.translations }))} className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                        {features.translations ? <ToggleRight size={14} className="text-orange-500" /> : <ToggleLeft size={14} />}
                        {t.sum_profiles}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className={`rounded-xl p-4 ${features.customers ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-50 dark:bg-slate-900/40'}`}>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t.sum_total}</p>
                      <p className={`mt-1 text-xl font-black ${features.customers ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>{features.customers ? (lang === 'ar' ? 'مفعّل' : lang === 'en' ? 'Enabled' : 'Activé') : (lang === 'ar' ? 'معطّل' : lang === 'en' ? 'Disabled' : 'Désactivé')}</p>
                    </div>
                    <div className={`rounded-xl p-4 ${features.restaurants ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-50 dark:bg-slate-900/40'}`}>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t.sum_active}</p>
                      <p className={`mt-1 text-xl font-black ${features.restaurants ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>{features.restaurants ? (lang === 'ar' ? 'مفعّل' : lang === 'en' ? 'Enabled' : 'Activé') : (lang === 'ar' ? 'معطّل' : lang === 'en' ? 'Disabled' : 'Désactivé')}</p>
                    </div>
                    <div className={`rounded-xl p-4 ${features.translations ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-50 dark:bg-slate-900/40'}`}>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t.sum_profiles}</p>
                      <p className={`mt-1 text-xl font-black ${features.translations ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>{features.translations ? (lang === 'ar' ? 'مفعّل' : lang === 'en' ? 'Enabled' : 'Activé') : (lang === 'ar' ? 'معطّل' : lang === 'en' ? 'Disabled' : 'Désactivé')}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-700/60 dark:bg-[#1e293b]">
                <ShieldAlert size={30} className="mx-auto text-slate-300" />
                <p className="mt-3 text-base font-black">{t[`nav_${currentSection}`]}</p>
                <p className="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-slate-400">{t.panelSubtitle}</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => setIsModalOpen(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#1e293b]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-black">{t.modal_title}</h3>
                <p className="mt-1 font-mono text-xs text-slate-400">{selectedOrder.id}</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="close">
                <X size={17} />
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.th_customer}</p>
                <p className="mt-1 text-sm font-bold">{selectedOrder.customer}</p>
                <p className="mt-0.5 text-[11px] text-slate-400" dir="ltr">{selectedOrder.email}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.th_restaurant}</p>
                <p className="mt-1 text-sm font-bold">{selectedOrder.restaurant}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.modal_tax}</p>
                <p className="mt-1 font-mono text-sm font-bold">{selectedOrder.taxId}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.modal_transfer_status}</p>
                <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black ring-1 ${selectedOrder.status ? 'bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30' : 'bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30'}`}>
                  {selectedOrder.status ? <CheckCircle2 size={12} /> : <X size={12} />}
                  {selectedOrder.status ? t.status_completed : t.status_pending}
                </span>
              </div>
              <div className="sm:col-span-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-400">{t.actionToggle} · {t.planLook}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <select value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value as 'Basic' | 'Pro' | 'Enterprise')} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black outline-none focus:border-orange-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => upgradePlanMutation.mutate({ entityId: selectedOrder.id, plan: selectedPlan })}
                    disabled={upgradePlanMutation.isPending || selectedPlan === selectedOrder.plan}
                    className="flex cursor-pointer items-center gap-1 rounded-xl bg-orange-500 px-3 py-2 text-[11px] font-black text-white transition hover:bg-orange-600 disabled:cursor-default disabled:opacity-50"
                  >
                    <ArrowUpCircle size={13} />
                    {upgradePlanMutation.isPending ? t.upgrading : t.plan_upgrade}
                  </button>
                  {selectedOrder.catalog && selectedOrder.catalog.catalogUrl && (
                    <a href={selectedOrder.catalog.catalogUrl.startsWith('http') ? selectedOrder.catalog.catalogUrl : `https://${selectedOrder.catalog.catalogUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                      <ExternalLink size={13} />
                      {t.btn_viewDetails}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <button type="button" onClick={() => setIsModalOpen(false)} className="mt-5 w-full rounded-xl bg-[#0f172a] py-2.5 text-sm font-black text-white transition hover:bg-slate-800 dark:bg-orange-500 dark:text-slate-900 dark:hover:bg-orange-600">
              {t.modal_close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}