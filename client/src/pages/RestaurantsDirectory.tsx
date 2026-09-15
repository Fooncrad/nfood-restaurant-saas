import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Clock3, MapPin, Search, Store } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RestaurantsDirectory() {
  const [query, setQuery] = useState("");
  const { direction } = useLanguage();
  const restaurants = trpc.platform.publicRestaurantDirectory.useQuery();
  const rows = useMemo(
    () =>
      (restaurants.data ?? [])
        .filter((restaurant) => `${restaurant.brandName ?? restaurant.name} ${restaurant.city ?? ""} ${restaurant.address ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()))
        .sort((a, b) => String(a.brandName ?? a.name).localeCompare(String(b.brandName ?? b.name), "ar")),
    [restaurants.data, query],
  );
  const backIcon = direction === "rtl" ? <ArrowRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4 rotate-180" />;
  return (
    <main dir={direction} className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-black text-slate-700 transition hover:text-orange-600">{backIcon}العودة إلى الرئيسية</Link>
          <span className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-black text-orange-600"><Store className="h-3.5 w-3.5" />NFOOD</span>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <header className="mb-8">
          <p className="text-xs font-black text-[#e76f3c]">اكتشف شبكة NFOOD</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">دليل المطاعم</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">استعرض المطاعم النشطة على المنصة، تصفح المنيو، أضف للسلة، أرسل الطلب أو احجز من صفحة المطعم العامة.</p>
          <div className="relative mt-6 max-w-md">
            <Search className={`absolute ${direction === "rtl" ? "right-3.5" : "left-3.5"} top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400`} />
            <input value={query} onInput={(event) => setQuery(event.currentTarget.value)} placeholder="ابحث بالاسم أو المدينة..." className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100" />
          </div>
        </header>
        {
          restaurants.isLoading
            ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-64 animate-pulse rounded-3xl bg-white" />)}</div>
            : restaurants.isError
              ? <div className="rounded-3xl border border-red-100 bg-red-50 p-14 text-center text-sm font-bold text-red-700">تعذر تحميل دليل المطاعم حاليًا. حاول تحديث الصفحة لاحقًا.</div>
              : rows.length === 0
                ? <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center"><p className="text-sm font-bold text-slate-600">{query ? "لا توجد مطاعم مطابقة لبحثك." : "لا توجد مطاعم نشطة بعد."}</p><p className="mt-2 text-xs text-slate-400">{query ? "جرّب كلمة أخرى أو تصفح بدون بحث." : "عاجلاً أم آجلاً ستنضم مطاعم جديدة إلى الشبكة."}</p></div>
                : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map((restaurant) => (
                    <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="flex h-32 items-end justify-between gap-2 p-5" style={{ background: `linear-gradient(135deg, ${restaurant.brandColor ?? "#0b1d35"} 0%, ${restaurant.brandAccentColor ?? restaurant.brandColor ?? "#334155"} 100%)` }}>
                        {restaurant.brandLogoUrl
                          ? <img src={restaurant.brandLogoUrl} alt="" className="h-14 w-14 rounded-2xl bg-white/95 object-cover p-1 shadow-lg" />
                          : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-black text-white">{(restaurant.brandName ?? restaurant.name).trim().slice(0, 1)}</span>}
                        <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">مطعم نشط</span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-2"><h2 className="font-black leading-6">{restaurant.brandName ?? restaurant.name}</h2><ChevronRight className={`mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-orange-500 ${direction === "rtl" ? "rotate-180" : ""}`} /></div>
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-400"><MapPin className="h-3.5 w-3.5" />{restaurant.city ?? "بدون مدينة"}<span className="text-slate-300">·</span><Clock3 className="h-3.5 w-3.5" />جاهز للطلب</p>
                        <p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-500">{restaurant.brandDescription || "تصفح المنيو واطلب مباشرة من صفحة المطعم عبر NFOOD."}</p>
                      </div>
                    </Link>
                  ))}</div>
        }
      </div>
    </main>
  );
}