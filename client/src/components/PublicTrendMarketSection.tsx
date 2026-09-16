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

export default function PublicTrendMarketSection() {
  const { direction } = useLanguage();
  const restaurants = trpc.platform.publicMostActiveRestaurants.useQuery({ limit: 3 });
  const Arrow = direction === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section id="trend-market" className="border-y border-slate-200 bg-[#f1f6f8] px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-sm font-black text-teal-600">أكثر المطاعم نشاطًا على NFOOD</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0b1d35] md:text-4xl">مطاعم مميزة وسوق Trend Kitchen</h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">ابدأ بالمطاعم والمقاهي، ثم تنقّل بين جميع متاجر وخدمات سوق NFOOD من نفس الصفحة.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/restaurants" className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-teal-400 hover:text-teal-700">عرض جميع المطاعم</Link>
            <Link href="/marketplace" className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-orange-400 hover:text-orange-500">استكشف جميع المتاجر</Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {restaurants.isLoading ? [0, 1, 2].map((item) => <div key={item} className="h-64 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200" />) : !restaurants.data?.length ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">لا توجد مطاعم نشطة بعد.</div>
          ) : restaurants.data.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-32 items-end justify-between gap-2 p-5" style={{ background: `linear-gradient(135deg, ${restaurant.brandColor ?? "#0b1d35"}, ${restaurant.brandAccentColor ?? restaurant.brandColor ?? "#334155"})` }}>
                {restaurant.brandLogoUrl ? <img src={restaurant.brandLogoUrl} alt="" className="h-14 w-14 rounded-2xl bg-white/95 object-cover p-1 shadow-lg" /> : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-black text-white">{(restaurant.brandName ?? restaurant.name).trim().slice(0, 1)}</span>}
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{restaurant.recentOrderCount > 0 ? `${restaurant.recentOrderCount} طلب هذا الشهر` : "مطعم نشط"}</span>
              </div>
              <div className="p-5"><h3 className="font-black leading-6 text-[#0b1d35]">{restaurant.brandName ?? restaurant.name}</h3><p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-500">{restaurant.brandDescription || "تصفح المنيو واطلب مباشرة من صفحة المطعم عبر NFOOD."}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-600"><Arrow className="h-3.5 w-3.5" />تصفح المنيو</span></div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl"><p className="flex items-center gap-2 text-sm font-black text-orange-500"><Sparkles className="h-4 w-4" /> سوق Trend متعدد القطاعات</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#0b1d35] md:text-4xl">كل متاجر وخدمات NFOOD</h2><p className="mt-4 text-sm leading-7 text-slate-500">كل قطاع يستخدم نفس تجربة التصفح الواضحة: بطاقة، متجر، منتج أو خدمة، وعرض متاح.</p></div>
          <Link href="/marketplace" className="rounded-xl bg-[#0b1d35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#15355d]">الانتقال إلى سوق Trend</Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map(({ slug, title, description, icon: Icon, tone }) => (
            <Link key={slug} href={`/marketplace/sector/${slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`flex h-32 items-end justify-between bg-gradient-to-br ${tone} p-5`}><span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">قطاع NFOOD</span><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur"><Icon className="h-7 w-7" /></span></div>
              <div className="p-5"><h3 className="min-h-12 font-black leading-6 text-[#0b1d35]">{title}</h3><p className="mt-3 min-h-10 text-xs leading-5 text-slate-500">{description}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-600"><Arrow className="h-3.5 w-3.5" />استكشف المتاجر والخدمات</span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
