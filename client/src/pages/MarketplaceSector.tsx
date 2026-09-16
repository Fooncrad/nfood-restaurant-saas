import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, Loader2, Search, ShoppingBag, Store, Utensils, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";

const SECTOR_ICONS: Record<string, LucideIcon> = {
  store: Store,
  utensils: Utensils,
  shopping: ShoppingBag,
  shoppingBag: ShoppingBag,
};

export default function MarketplaceSector() {
  const { slug } = useParams<{ slug: string }>();
  const { direction, language } = useLanguage();
  const [search, setSearch] = useState("");
  const sectors = trpc.marketplace.publicSectors.useQuery(undefined, { retry: false });
  const sector = (sectors.data ?? []).find((item) => item.slug === slug);
  const stores = trpc.marketplace.publicStores.useQuery({ sectorSlug: slug, search: search.trim() || undefined }, { retry: false, enabled: Boolean(slug) });
  const featuredListings = trpc.marketplace.publicListings.useQuery({ sectorId: sector?.id, featuredOnly: true }, { retry: false, enabled: Boolean(sector?.id) });
  const Icon = SECTOR_ICONS[sector?.icon ?? ""] ?? Store;
  const isRtl = direction === "rtl";
  const Arrow = isRtl ? ArrowRight : ArrowLeft;
  const locale = language === "ar" ? "ar-SA" : language === "fr" ? "fr-FR" : "en-US";
  const copy = language === "ar"
    ? { back: "العودة للسوق", loading: "جارٍ تحميل القطاع…", missingTitle: "هذا القطاع غير متاح", missingBody: "قد يكون الرابط غير صحيح أو تم إيقاف القطاع مؤقتًا. يمكنك العودة إلى السوق لاستكشاف القطاعات المتاحة.", featured: "منتجات وخدمات مميزة", featuredBadge: "مميز", listings: "عنصرًا", stores: "متجرًا", search: "ابحث في المتاجر…", storesIn: "المتاجر في قطاع", empty: "لا توجد متاجر نشطة في هذا القطاع بعد.", from: "ابتداءً من", free: "مجاني", description: "تصفّح المتاجر والمنتجات والخدمات المتاحة في هذا القطاع." }
    : language === "fr"
      ? { back: "Retour au marché", loading: "Chargement du secteur…", missingTitle: "Ce secteur n’est pas disponible", missingBody: "Le lien est peut-être incorrect ou ce secteur est temporairement désactivé. Retournez au marché pour découvrir les secteurs disponibles.", featured: "Produits et services en vedette", featuredBadge: "En vedette", listings: "éléments", stores: "boutiques", search: "Rechercher dans les boutiques…", storesIn: "Boutiques dans le secteur", empty: "Aucune boutique active dans ce secteur pour le moment.", from: "À partir de", free: "Gratuit", description: "Parcourez les boutiques, produits et services disponibles dans ce secteur." }
      : { back: "Back to marketplace", loading: "Loading sector…", missingTitle: "This sector is unavailable", missingBody: "The link may be incorrect or this sector has been temporarily disabled. Return to the marketplace to browse available sectors.", featured: "Featured products and services", featuredBadge: "Featured", listings: "listings", stores: "stores", search: "Search stores…", storesIn: "Stores in", empty: "No active stores are available in this sector yet.", from: "From", free: "Free", description: "Browse the stores, products, and services available in this sector." };
  const sectorLabel = sector ? (language === "ar" ? sector.labelAr : language === "fr" ? sector.labelFr : sector.labelEn) : "";
  const sectorDescription = sector ? (language === "ar" ? sector.descriptionAr : language === "fr" ? sector.descriptionFr : sector.descriptionEn) : "";
  const formatPrice = (amount: string | number, currency: string) => new Intl.NumberFormat(locale, { style: "currency", currency: currency || "SAR", maximumFractionDigits: 2 }).format(Number(amount));
  const storeRows = stores.data ?? [];
  const listings = featuredListings.data ?? [];

  return (
    <main dir={direction} className="min-h-screen bg-[#0b0f17] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f17]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <Link href="/marketplace"><Button type="button" variant="ghost" className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"><Arrow className="me-2 h-4 w-4" />{copy.back}</Button></Link>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E76F3C] text-lg font-black text-white">N</span>
          <strong className="text-sm tracking-[.12em]">NFOOD MARKETPLACE</strong>
        </div>
      </header>

      {sectors.isLoading ? (
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 py-32"><Loader2 className="h-8 w-8 animate-spin text-orange-400" /><p className="text-sm font-bold text-slate-300">{copy.loading}</p></div>
      ) : !sector ? (
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-5 py-32 text-center"><Store className="mb-4 h-12 w-12 text-slate-500" /><h1 className="text-2xl font-black">{copy.missingTitle}</h1><p className="mt-3 text-sm leading-7 text-slate-400">{copy.missingBody}</p><Link href="/marketplace"><Button type="button" className="mt-6 rounded-xl bg-[#E76F3C]">{copy.back}</Button></Link></div>
      ) : (
        <>
          <section className="relative isolate overflow-hidden px-5 pb-10 pt-12 md:px-8 md:pt-16">
            <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="relative mx-auto max-w-7xl">
              <div className="flex items-start gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl" style={{ backgroundColor: `${sector.color}22`, color: sector.color }}><Icon className="h-8 w-8" /></div><div><h1 className="text-3xl font-black tracking-tight md:text-4xl">{sectorLabel}</h1><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">{sectorDescription || copy.description}</p></div></div>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-slate-400"><Badge className="border-white/10 bg-white/5 text-orange-200">{sector.listingCount.toLocaleString(locale)} {copy.listings}</Badge><Badge className="border-white/10 bg-white/5 text-emerald-300">{storeRows.length.toLocaleString(locale)} {copy.stores}</Badge></div>
              <div className="mt-5"><div className="relative w-full max-w-md"><Search className={`pointer-events-none absolute top-2.5 h-4 w-4 text-slate-500 ${isRtl ? "right-3" : "left-3"}`} /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.search} className={`h-9 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-500 ${isRtl ? "pr-9" : "pl-9"}`} /></div></div>
            </div>
          </section>

          {listings.length > 0 && <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8"><h2 className="mb-4 text-lg font-black">{copy.featured}</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{listings.slice(0, 8).map((listing) => <Card key={listing.id} className="overflow-hidden rounded-3xl border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-orange-400/40"><div className="relative aspect-[4/3] overflow-hidden bg-slate-900">{listing.imageUrl ? <img src={listing.imageUrl} alt={listing.title} className="h-full w-full object-cover opacity-80" /> : <div className="grid h-full place-items-center text-sm text-slate-600"><ShoppingBag className="h-8 w-8" /></div>}{listing.isFeatured ? <Badge className={`absolute top-2 border-amber-400/30 bg-amber-400/20 text-amber-200 ${isRtl ? "right-2" : "left-2"}`}>{copy.featuredBadge}</Badge> : null}</div><CardContent className="p-4"><h3 className="line-clamp-1 font-black">{language === "ar" || !listing.titleEn ? listing.title : listing.titleEn}</h3><div className="mt-2 flex items-center justify-between gap-2"><span className="font-black text-orange-300">{formatPrice(listing.price, listing.currencyCode)}</span>{listing.compareAtPrice ? <span className="text-xs text-slate-500 line-through">{formatPrice(listing.compareAtPrice, listing.currencyCode)}</span> : null}</div></CardContent></Card>)}</div></section>}

          <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8"><h2 className="mb-5 text-lg font-black">{copy.storesIn} {sectorLabel}</h2>{stores.isLoading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />)}</div> : storeRows.length === 0 ? <div className="rounded-3xl border border-dashed border-white/15 p-14 text-center text-sm text-slate-400">{copy.empty}</div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{storeRows.map((store) => <Link key={store.entityId} href={`/store/${store.entityId}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-orange-400/40"><div className="relative flex h-24 items-end justify-between gap-2 p-4" style={{ background: `linear-gradient(135deg, ${store.restaurant?.brandColor ?? "#111927"}, ${store.restaurant?.brandAccentColor ?? store.restaurant?.brandColor ?? "#0b1d35"})` }}>{store.restaurant?.brandLogoUrl ? <img src={store.restaurant.brandLogoUrl} alt="" className="h-14 w-14 rounded-2xl bg-white/95 object-cover p-1 shadow-lg" /> : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-black text-white">{store.customerName.trim().charAt(0)}</span>}<Badge className="border-white/20 bg-black/40 text-orange-200">{sectorLabel}</Badge></div><CardContent className="p-4"><h3 className="line-clamp-1 font-black">{store.customerName}</h3><p className="mt-1 line-clamp-1 text-xs text-slate-400">{store.restaurant?.city ?? store.email}</p><div className="mt-3 flex items-center justify-between gap-2 text-xs"><span className="font-bold text-emerald-300">{store.listingCount.toLocaleString(locale)} {copy.listings}</span><span className="font-black text-white">{Number(store.minPrice) > 0 ? `${copy.from} ${formatPrice(store.minPrice, "SAR")}` : copy.free}</span></div></CardContent></Link>)}</div>}</section>
        </>
      )}
    </main>
  );
}
