import { Car, ChevronLeft, ChevronRight, CookingPot, Flower2, WashingMachine, Wrench, ShoppingBasket, ShoppingBag, Sparkles, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

type SectorCard = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};

const sectors: SectorCard[] = [
  { slug: "restaurant", title: "المطاعم والمأكولات والمقاهي", description: "منيو رقمي وطلبات وتجارب ضيافة متصلة.", icon: UtensilsCrossed, tone: "from-orange-500 to-amber-400" },
  { slug: "fashion", title: "الموضة والأزياء والملبوسات", description: "منتجات، مقاسات، ألوان وعروض موسمية.", icon: ShoppingBag, tone: "from-fuchsia-500 to-rose-400" },
  { slug: "beauty_salon", title: "الصالونات والتجميل والحلاقة", description: "خدمات، حجوزات ومواعيد واشتراكات.", icon: Flower2, tone: "from-violet-500 to-purple-400" },
  { slug: "grocery", title: "البقالات والتموينات والهايبرماركت", description: "تسوق يومي ومخزون وعروض جاهزة.", icon: ShoppingBasket, tone: "from-sky-500 to-cyan-400" },
  { slug: "vegetables", title: "الخضار والفواكه والتمور والمنتجات الطازجة", description: "منتجات طازجة ووحدات بيع مرنة.", icon: CookingPot, tone: "from-emerald-500 to-lime-400" },
  { slug: "laundry", title: "مغاسل الملابس والسجاد والعناية", description: "استلام وتسليم وتتبع حالة الخدمة.", icon: WashingMachine, tone: "from-indigo-500 to-blue-400" },
  { slug: "automotive", title: "خدمات السيارات والصيانة ومغاسل السيارات", description: "خدمات مركبات ومواعيد ومتابعة التنفيذ.", icon: Car, tone: "from-red-500 to-orange-400" },
  { slug: "public_works", title: "الأشغال العامة والصيانة المنزلية والخدمات الميدانية", description: "طلبات ميدانية، فرق عمل وجدولة الخدمة.", icon: Wrench, tone: "from-yellow-500 to-orange-400" },
];

const localizedSectorCopy = {
  ar: {
    restaurant: ["المطاعم والمأكولات والمقاهي", "منيو رقمي وطلبات وتجارب ضيافة متصلة."], fashion: ["الموضة والأزياء والملبوسات", "منتجات، مقاسات، ألوان وعروض موسمية."], beauty_salon: ["الصالونات والتجميل والحلاقة", "خدمات، حجوزات ومواعيد واشتراكات."], grocery: ["البقالات والتموينات والهايبرماركت", "تسوق يومي ومخزون وعروض جاهزة."], vegetables: ["الخضار والفواكه والتمور والمنتجات الطازجة", "منتجات طازجة ووحدات بيع مرنة."], laundry: ["مغاسل الملابس والسجاد والعناية", "استلام وتسليم وتتبع حالة الخدمة."], automotive: ["خدمات السيارات والصيانة ومغاسل السيارات", "خدمات مركبات ومواعيد ومتابعة التنفيذ."], public_works: ["الأشغال العامة والصيانة المنزلية والخدمات الميدانية", "طلبات ميدانية، فرق عمل وجدولة الخدمة."],
  },
  en: {
    restaurant: ["Restaurants, Food & Cafés", "Digital menus, orders, and connected hospitality."], fashion: ["Fashion, Clothing & Apparel", "Products, sizes, colours, and seasonal offers."], beauty_salon: ["Beauty, Salons & Barbers", "Services, bookings, appointments, and memberships."], grocery: ["Groceries & Hypermarkets", "Daily shopping, stock, and ready-made promotions."], vegetables: ["Fresh Produce, Fruits & Dates", "Fresh products and flexible selling units."], laundry: ["Laundry, Rug & Care", "Collection, delivery, and service-status tracking."], automotive: ["Automotive, Repair & Car Wash", "Vehicle services, appointments, and job follow-up."], public_works: ["Field Services & Home Maintenance", "Field requests, teams, and service scheduling."],
  },
  fr: {
    restaurant: ["Restaurants, cuisine et cafés", "Menus numériques, commandes et hospitalité connectée."], fashion: ["Mode, vêtements et accessoires", "Produits, tailles, couleurs et offres saisonnières."], beauty_salon: ["Beauté, salons et coiffure", "Services, réservations, rendez-vous et abonnements."], grocery: ["Épiceries et hypermarchés", "Courses quotidiennes, stock et promotions prêtes."], vegetables: ["Produits frais, fruits et dattes", "Produits frais et unités de vente flexibles."], laundry: ["Blanchisserie, tapis et entretien", "Collecte, livraison et suivi du service."], automotive: ["Auto, réparation et lavage", "Services véhicules, rendez-vous et suivi d’intervention."], public_works: ["Services terrain et entretien domicile", "Demandes terrain, équipes et planification."],
  },
} as const;

export default function PublicTrendMarketSection() {
  const { direction, language } = useLanguage();
  const locale = language === "en" || language === "fr" ? language : "ar";
  const copy = {
    ar: { eyebrow: "أكثر المطاعم نشاطًا على NFOOD", title: "مطاعم مميزة وسوق Trend Kitchen", intro: "ابدأ بالمطاعم والمقاهي، ثم تنقّل بين جميع متاجر وخدمات سوق NFOOD من نفس الصفحة.", allRestaurants: "عرض جميع المطاعم", allStores: "استكشف جميع المتاجر", noRestaurants: "لا توجد مطاعم نشطة بعد.", activeRestaurant: "مطعم نشط", monthOrders: "طلب هذا الشهر", fallbackDescription: "تصفح المنيو واطلب مباشرة من صفحة المطعم عبر NFOOD.", browseMenu: "تصفح المنيو", marketEyebrow: "سوق Trend متعدد القطاعات", marketTitle: "كل متاجر وخدمات NFOOD", marketIntro: "كل قطاع يستخدم تجربة تصفح موحدة: متجر، منتج أو خدمة، وعرض متاح.", marketAction: "الانتقال إلى سوق Trend", sector: "قطاع NFOOD", explore: "استكشف المتاجر والخدمات" },
    en: { eyebrow: "Most active restaurants on NFOOD", title: "Featured restaurants and Trend Kitchen", intro: "Start with restaurants and cafés, then explore every NFOOD store and service from the same page.", allRestaurants: "View all restaurants", allStores: "Explore all stores", noRestaurants: "No active restaurants yet.", activeRestaurant: "Active restaurant", monthOrders: "orders this month", fallbackDescription: "Browse the menu and order directly from this restaurant on NFOOD.", browseMenu: "Browse menu", marketEyebrow: "Multi-sector Trend marketplace", marketTitle: "All NFOOD stores and services", marketIntro: "Every sector uses one clear browsing experience: store, product or service, and availability.", marketAction: "Go to Trend marketplace", sector: "NFOOD sector", explore: "Explore stores and services" },
    fr: { eyebrow: "Restaurants les plus actifs sur NFOOD", title: "Restaurants sélectionnés et Trend Kitchen", intro: "Commencez par les restaurants et cafés, puis explorez chaque boutique et service NFOOD depuis la même page.", allRestaurants: "Voir tous les restaurants", allStores: "Explorer toutes les boutiques", noRestaurants: "Aucun restaurant actif pour le moment.", activeRestaurant: "Restaurant actif", monthOrders: "commandes ce mois", fallbackDescription: "Parcourez le menu et commandez directement auprès de ce restaurant sur NFOOD.", browseMenu: "Voir le menu", marketEyebrow: "Marché Trend multi-secteurs", marketTitle: "Toutes les boutiques et services NFOOD", marketIntro: "Chaque secteur utilise une expérience claire : boutique, produit ou service et disponibilité.", marketAction: "Accéder au marché Trend", sector: "Secteur NFOOD", explore: "Explorer les boutiques et services" },
  }[locale];
  const restaurants = trpc.platform.publicMostActiveRestaurants.useQuery({ limit: 3 });
  const Arrow = direction === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section id="trend-market" className="border-y border-slate-200 bg-[#f1f6f8] px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-sm font-black text-teal-600">{copy.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0b1d35] md:text-4xl">{copy.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">{copy.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/restaurants" className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-teal-400 hover:text-teal-700">{copy.allRestaurants}</Link>
            <Link href="/marketplace" className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-orange-400 hover:text-orange-500">{copy.allStores}</Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {restaurants.isLoading ? [0, 1, 2].map((item) => <div key={item} className="h-64 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200" />) : !restaurants.data?.length ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">{copy.noRestaurants}</div>
          ) : restaurants.data.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-32 items-end justify-between gap-2 p-5" style={{ background: `linear-gradient(135deg, ${restaurant.brandColor ?? "#0b1d35"}, ${restaurant.brandAccentColor ?? restaurant.brandColor ?? "#334155"})` }}>
                {restaurant.brandLogoUrl ? <img src={restaurant.brandLogoUrl} alt="" className="h-14 w-14 rounded-2xl bg-white/95 object-cover p-1 shadow-lg" /> : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-black text-white">{(restaurant.brandName ?? restaurant.name).trim().slice(0, 1)}</span>}
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{restaurant.recentOrderCount > 0 ? `${restaurant.recentOrderCount} ${copy.monthOrders}` : copy.activeRestaurant}</span>
              </div>
              <div className="p-5"><h3 className="font-black leading-6 text-[#0b1d35]">{restaurant.brandName ?? restaurant.name}</h3><p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-500">{locale === "ar" ? (restaurant.brandDescription || copy.fallbackDescription) : copy.fallbackDescription}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-600"><Arrow className="h-3.5 w-3.5" />{copy.browseMenu}</span></div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl"><p className="flex items-center gap-2 text-sm font-black text-orange-500"><Sparkles className="h-4 w-4" /> {copy.marketEyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#0b1d35] md:text-4xl">{copy.marketTitle}</h2><p className="mt-4 text-sm leading-7 text-slate-500">{copy.marketIntro}</p></div>
          <Link href="/marketplace" className="rounded-xl bg-[#0b1d35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#15355d]">{copy.marketAction}</Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map(({ slug, icon: Icon, tone }) => {
            const [title, description] = localizedSectorCopy[locale][slug as keyof typeof localizedSectorCopy[typeof locale]];
            return (
            <Link key={slug} href={`/marketplace/sector/${slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`flex h-32 items-end justify-between bg-gradient-to-br ${tone} p-5`}><span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{copy.sector}</span><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur"><Icon className="h-7 w-7" /></span></div>
              <div className="p-5"><h3 className="min-h-12 font-black leading-6 text-[#0b1d35]">{title}</h3><p className="mt-3 min-h-10 text-xs leading-5 text-slate-500">{description}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-600"><Arrow className="h-3.5 w-3.5" />{copy.explore}</span></div>
            </Link>
          );
          })}
        </div>
      </div>
    </section>
  );
}
