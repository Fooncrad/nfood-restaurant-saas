import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Coins, Gift, Heart, Megaphone, Package, Search, ShoppingBag, Sparkles, Store, Tag, Truck, Utensils, WalletCards, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const SECTOR_ICONS: Record<string, LucideIcon> = {
  store: Store,
  utensils: Utensils,
  shopping: ShoppingBag,
  shoppingBag: ShoppingBag,
  gift: Gift,
  package: Package,
  megaphone: Megaphone,
  sparkles: Sparkles,
  tag: Tag,
  tags: Tag,
  coins: Coins,
  wallet: WalletCards,
  truck: Truck,
  heart: Heart,
};

export default function MarketplaceLanding() {
  const [search, setSearch] = useState("");
  const sectors = trpc.marketplace.publicSectors.useQuery(undefined, { retry: false });
  const stores = trpc.marketplace.publicStores.useQuery({ search: search.trim() || undefined }, { retry: false });
  const sectorRows = sectors.data ?? [];
  const storeRows = stores.data ?? [];
  const trimmed = search.trim().toLowerCase();
  const visibleSectors = trimmed ? sectorRows.filter((sector) => `${sector.labelAr} ${sector.labelEn} ${sector.labelFr}`.toLowerCase().includes(trimmed)) : sectorRows;
  const totalListings = sectorRows.reduce((total, sector) => total + sector.listingCount, 0);

  return (
    <main dir="rtl" className="min-h-screen bg-[#0b0f17] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f17]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E76F3C] text-lg font-black text-white">N</span>
            <span>
              <strong className="block tracking-[.15em]">NFOOD MARKETPLACE</strong>
              <small className="block text-[10px] font-bold tracking-[.2em] text-orange-300/80">سوق متعدد القطاعات</small>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            <Link href="/affiliate"><Button type="button" variant="ghost" className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"><WalletCards className="ml-2 h-4 w-4" />التسويق بالعمولة</Button></Link>
            <Link href="/store-marketing"><Button type="button" variant="ghost" className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"><Store className="ml-2 h-4 w-4" />لوحة التاجر</Button></Link>
            <Link href="/"><Button type="button" variant="outline" className="rounded-xl border-white/15 text-white hover:bg-white/10">الرئيسية</Button></Link>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden px-5 pb-14 pt-16 md:px-8 md:pt-20">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/10 px-3 py-2 text-xs font-bold text-orange-200"><Sparkles className="h-4 w-4" /> منصة NFOOD · أسواق المتاجر والخدمات</div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.15] tracking-tight md:text-6xl">سوق NFOOD للمتاجر<br /><span className="text-orange-400">من كل القطاعات.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">تصفح المتاجر والمنتجات والخدمات من قطاعات متعددة عبر سوق موحّد. أدخلت المنشأة برنامج مكافآت لكل متجر، وكوبونات خصم، وحملات تسويقية، وروابط إحالة، مع برنامج عمولة للمسوّقين.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-500" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن متجر أو منتج أو قطاع..." className="h-11 rounded-2xl border-white/10 bg-white/5 pr-10 text-white placeholder:text-slate-500" />
            </div>
            <Link href="/store-marketing"><Button type="button" className="rounded-2xl bg-[#E76F3C] px-6 py-3 font-black text-white shadow-xl shadow-orange-950/30 transition hover:bg-orange-400">افتح متجرك الآن</Button></Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-400"><Badge className="border-white/10 bg-white/5 text-orange-200">{sectorRows.length} قطاعًا</Badge><Badge className="border-white/10 bg-white/5 text-emerald-300">{storeRows.length} متجرًا نشطًا</Badge><Badge className="border-white/10 bg-white/5 text-sky-300">{totalListings} منتجًا معروضًا</Badge></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div><h2 className="text-xl font-black">القطاعات</h2><p className="mt-1 text-xs text-slate-400">اختر قطاعًا لتصفح متاجره ومنتجاته.</p></div>
        </div>
        {sectors.isLoading ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-28 animate-pulse rounded-3xl border border-white/10 bg-white/5" />)}</div> : visibleSectors.length === 0 ? <div className="rounded-3xl border border-dashed border-white/15 p-14 text-center text-sm text-slate-400">لا توجد قطاعات مطابقة لبحثك.</div> : <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{visibleSectors.map((sector) => { const Icon = SECTOR_ICONS[sector.icon] ?? Store; return <Link key={sector.id} href={`/marketplace/sector/${sector.slug}`} className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/10"><div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${sector.color}22`, color: sector.color }}><Icon className="h-6 w-6" /></div><h3 className="mt-4 font-black">{sector.labelAr}</h3><p className="mt-1 text-[11px] font-bold text-orange-200/80">{sector.listingCount} منتجًا · {sector.labelEn}</p></Link>; })}</div>}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div><h2 className="text-xl font-black">متاجر نشطة</h2><p className="mt-1 text-xs text-slate-400">متاجر حقيقية من المنصات العاملة على NFOOD.</p></div>
        </div>
        {stores.isLoading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-72 animate-pulse rounded-3xl border border-white/10 bg-white/5" />)}</div> : storeRows.length === 0 ? <div className="rounded-3xl border border-dashed border-white/15 p-14 text-center text-sm text-slate-400">لا توجد متاجر نشطة بمحتوى بعد — كن أول من يفتح متجرًا.</div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{storeRows.map((store) => <Link key={store.entityId} href={`/store/${store.entityId}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-orange-400/40"><div className="relative flex h-24 items-end justify-between gap-2 p-4" style={{ background: `linear-gradient(135deg, ${store.restaurant?.brandColor ?? "#111927"}, ${store.restaurant?.brandAccentColor ?? store.restaurant?.brandColor ?? "#0b1d35"})` }}>{store.restaurant?.brandLogoUrl ? <img src={store.restaurant.brandLogoUrl} alt="" className="h-14 w-14 rounded-2xl bg-white/95 object-cover p-1 shadow-lg" /> : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-black text-white">{store.customerName.trim().charAt(0)}</span>}<Badge className="border-white/20 bg-black/40 text-orange-200">{store.sector}</Badge></div><CardContent className="p-4"><div className="flex items-center justify-between gap-2"><h3 className="line-clamp-1 font-black">{store.customerName}</h3></div><p className="mt-1 line-clamp-1 text-xs text-slate-400">{store.restaurant?.city ?? store.email}</p><div className="mt-3 flex items-center justify-between text-xs"><span className="font-bold text-emerald-300">{store.listingCount} منتجًا</span><span className="font-black text-white">{Number(store.minPrice) > 0 ? `من ${store.minPrice.toLocaleString("en-US")} ${store.plan === "Basic" ? "ر.س" : "ر.س"}` : "مجانًا"}</span></div></CardContent></Link>)}</div>}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="grid gap-3 sm:grid-cols-3">{[[WalletCards, "عمولة للمسوّقين", "سجّل في برنامج العمولة واستلم نسبة من كل طلب مدفوع يصل عبر رابطك."], [Gift, "مكافآت الولاء", "كل متجر يحدد نقاط الولاء الخاصة به ويستبدلها العميل كقسائم."], [Megaphone, "كوبونات وحملات", "أنشئ كوبونات الخصم والحملات الموسمية من لوحة التاجر مباشرة."]].map(([Icon, title, body]) => { const IconEl = Icon as LucideIcon; return <Card key={title as string} className="rounded-3xl border-white/10 bg-white/5"><CardContent className="p-6"><IconEl className="h-6 w-6 text-orange-300" /><h3 className="mt-4 font-black">{title as string}</h3><p className="mt-2 text-sm leading-7 text-slate-400">{body as string}</p></CardContent></Card>; })}</div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
        <div className="rounded-3xl border border-orange-400/20 bg-orange-400/5 p-8 text-center">
          <h2 className="text-2xl font-black">هل أنت منشأة مسجلة؟</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">لوحة التاجر تفتح لك إدارة المنتجات، الكوبونات، الحملات، مكافآت الولاء، وروابط الإحالة في مكان واحد.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/store-marketing"><Button type="button" className="rounded-xl bg-[#E76F3C] px-6 font-black hover:bg-orange-400">لوحة التاجر</Button></Link><Link href="/"><Button type="button" variant="outline" className="rounded-xl border-white/15 text-white hover:bg-white/10">العودة لموقع NFOOD</Button></Link></div>
        </div>
      </footer>
    </main>
  );
}