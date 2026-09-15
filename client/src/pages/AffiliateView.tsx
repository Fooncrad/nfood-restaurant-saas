import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Banknote, Copy, Gift, Link2, Loader2, LockKeyhole, Megaphone, MousePointerClick, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

const COMMISSION_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: "قيد الانتظار", className: "border-amber-400/20 bg-amber-400/10 text-amber-300" },
  approved: { label: "معتمد", className: "border-sky-400/20 bg-sky-400/10 text-sky-300" },
  paid: { label: "مدفوع", className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" },
  rejected: { label: "مرفوض", className: "border-rose-400/20 bg-rose-400/10 text-rose-300" },
};

export default function AffiliateView() {
  const { user, loading } = useAuth();
  const myAffiliate = trpc.marketplace.myAffiliate.useQuery(undefined, { retry: false, enabled: Boolean(user) });
  const stores = trpc.marketplace.publicStores.useQuery({}, { retry: false });
  const applyAffiliate = trpc.marketplace.applyAffiliate.useMutation({ onSuccess: () => { toast.success("تم تقديم طلب الانتساب — بانتظار الموافقة"); void myAffiliate.refetch(); }, onError: (e) => toast.error(e.message) });
  const createAffiliateLink = trpc.marketplace.createAffiliateLink.useMutation({ onSuccess: (data) => { toast.success("تم إنشاء الرابط"); void myAffiliate.refetch(); setNewLink({ entityId: "", targetPath: "/" }); setCreatedCode(data.code); }, onError: (e) => toast.error(e.message) });
  const requestPayout = trpc.marketplace.requestPayout.useMutation({ onSuccess: () => { toast.success("تم تقديم طلب السحب"); void myAffiliate.refetch(); setPayoutAmount(""); }, onError: (e) => toast.error(e.message) });

  const [newLink, setNewLink] = useState({ entityId: "", targetPath: "/" });
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [payoutAmount, setPayoutAmount] = useState("");

  const account = myAffiliate.data?.account ?? null;
  const links = myAffiliate.data?.links ?? [];
  const commissions = myAffiliate.data?.commissions ?? [];
  const payouts = myAffiliate.data?.payouts ?? [];
  const pendingCommissions = useMemo(() => commissions.filter((c) => c.status === "pending").reduce((total, c) => total + Number(c.commissionAmount), 0), [commissions]);
  const earned = account ? Number(account.totalEarnings) : 0;
  const paid = account ? Number(account.paidEarnings) : 0;
  const available = Math.max(0, earned - paid);
  const totalClicks = links.reduce((total, link) => total + Number(link.clickCount), 0);
  const totalConversions = links.reduce((total, link) => total + Number(link.conversionCount), 0);

  if (loading) return <main dir="rtl" className="min-h-screen bg-[#0b0f17] text-white" />;
  if (!user) return <main dir="rtl" className="grid min-h-screen place-items-center bg-[#0b0f17] p-5 text-white"><Card className="w-full max-w-md rounded-3xl border-white/10 bg-white/5"><CardContent className="p-8 text-center"><LockKeyhole className="mx-auto h-10 w-10 text-[#E76F3C]" /><h1 className="mt-4 text-2xl font-black">برنامج التسويق بالعمولة</h1><p className="mt-2 text-sm leading-7 text-slate-400">سجّل الدخول لتقديم طلب انتساب وابدأ بكسب العمولة عبر روابطك الخاصة.</p><Button type="button" onClick={() => startLogin()} className="mt-5 rounded-xl bg-[#E76F3C]">تسجيل الدخول</Button></CardContent></Card></main>;

  return (
    <main dir="rtl" className="min-h-screen bg-[#0b0f17] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f17]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <Link href="/marketplace"><Button type="button" variant="ghost" className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"><ArrowRight className="ml-2 h-4 w-4" />العودة للسوق</Button></Link>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E76F3C] text-lg font-black text-white">N</span>
          <div className="flex items-center gap-2"><strong className="text-sm tracking-[.12em]">NFOOD · التسويق بالعمولة</strong>{account ? <Badge className={account.status === "active" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-amber-400/20 bg-amber-400/10 text-amber-300"}>{account.status === "active" ? "مفعّل" : account.status === "pending" ? "قيد المراجعة" : account.status === "rejected" ? "مرفوض" : "موقوف"}</Badge> : null}</div>
          <Link href="/" className="mr-auto"><Button type="button" variant="outline" className="rounded-xl border-white/15 text-white hover:bg-white/10">الرئيسية</Button></Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 md:px-8">
        {!account ? (
          <section className="rounded-3xl border border-orange-400/20 bg-orange-400/5 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E76F3C]/20"><WalletCards className="h-8 w-8 text-[#E76F3C]" /></div>
            <h1 className="mt-5 text-3xl font-black">انضم لبرنامج التسويق بالعمولة</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-300">شارك روابطك الخاصة لمتاجر NFOOD واحصل على عمولة من كل طلب مدفوع يصل عبر رابطك. الإعداد الافتراضي للعمولة 5%، وتُراجع طلبات الانتساب من إدارة المنصة.</p>
            <Button type="button" onClick={() => applyAffiliate.mutate({})} disabled={applyAffiliate.isPending} className="mt-6 rounded-xl bg-[#E76F3C] px-8 font-black hover:bg-orange-400">{applyAffiliate.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "قدّم طلب الانتساب"}</Button>
          </section>
        ) : (
          <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-xs text-slate-400">إجمالي الأرباح</p><p className="mt-1 flex items-center gap-2 text-2xl font-black"><WalletCards className="h-5 w-5 text-orange-300" />{earned.toLocaleString("en-US")} <span className="text-xs font-bold text-slate-400">ر.س</span></p></div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-xs text-slate-400">المتاح للسحب</p><p className="mt-1 flex items-center gap-2 text-2xl font-black"><Banknote className="h-5 w-5 text-emerald-300" />{available.toLocaleString("en-US")} <span className="text-xs font-bold text-slate-400">ر.س</span></p></div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-xs text-slate-400">العمولات قيد الانتظار</p><p className="mt-1 text-2xl font-black">{pendingCommissions.toLocaleString("en-US")} <span className="text-xs font-bold text-slate-400">ر.س</span></p></div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-xs text-slate-400">النقرات / التحويلات</p><p className="mt-1 flex items-center gap-2 text-2xl font-black"><MousePointerClick className="h-5 w-5 text-sky-300" />{totalClicks.toLocaleString("en-US")} <span className="text-sm font-bold text-slate-500">/ {totalConversions}</span></p></div>
            </section>

            <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
              <section className="space-y-6">
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Link2 className="h-5 w-5 text-[#E76F3C]" />إنشاء رابط تابع جديد</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div><label className="mb-1 block text-xs text-slate-400">ربط بمتجر (اختياري)</label><select value={newLink.entityId} onChange={(e) => setNewLink({ ...newLink, entityId: e.target.value })} className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white"><option value="">كل المتاجر (عام)</option>{(stores.data ?? []).map((store) => <option key={store.entityId} value={store.entityId}>{store.customerName}</option>)}</select></div>
                      <div><label className="mb-1 block text-xs text-slate-400">مسار الهدف</label><Input value={newLink.targetPath} onChange={(e) => setNewLink({ ...newLink, targetPath: e.target.value })} className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-500" placeholder="/" /></div>
                    </div>
                    <Button type="button" onClick={() => createAffiliateLink.mutate({ entityId: newLink.entityId || undefined, targetPath: newLink.targetPath.trim() || "/" })} disabled={createAffiliateLink.isPending} className="rounded-xl bg-[#E76F3C] px-6 font-black hover:bg-orange-400">{createAffiliateLink.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Link2 className="ml-1 h-4 w-4" />إنشاء الرابط</>}</Button>
                    {createdCode && <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3"><span className="font-mono text-sm font-black tracking-wider text-emerald-200">{createdCode}</span><Button type="button" size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(`${window.location.origin}${createdCode ? `/store?ref=${createdCode}` : "/"}`).then(() => toast.success("تم النسخ")).catch(() => toast.error("تعذر النسخ")); }} className="rounded-lg border-emerald-400/30 text-xs"><Copy className="ml-1 h-3.5 w-3.5" />نسخ</Button></div>}
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Gift className="h-5 w-5 text-[#E76F3C]" />روابطك التابعة ({links.length})</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {links.length === 0 ? <p className="py-6 text-center text-sm text-slate-500">لا توجد روابط بعد — أنشئ أول رابط أعلاه.</p> : links.map((link) => (
                      <div key={link.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center gap-2"><Link2 className="h-4 w-4 text-orange-300" /><span className="font-mono text-xs font-black tracking-wider">{link.code}</span></div>
                        <Badge className={link.isActive ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-slate-400/20 bg-slate-400/10 text-slate-400"}>{link.isActive ? "نشط" : "معطّل"}</Badge>
                        <span className="text-xs text-slate-500">نقرات: {link.clickCount} · تحويلات: {link.conversionCount}</span>
                        <Button type="button" size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/store?ref=${link.code}`).then(() => toast.success("تم النسخ")).catch(() => toast.error("تعذر النسخ")); }} className="mr-auto rounded-lg border-white/15 text-xs"><Copy className="ml-1 h-3 w-3" />نسخ</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Banknote className="h-5 w-5 text-[#E76F3C]" />طلب سحب أرباح</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs leading-6 text-emerald-200">الرصيد المتاح للسحب {available.toLocaleString("en-US")} ر.س. تُراجع طلبات السحب من إدارة المنصة، ويُحوَّل عبر تحويل بنكي.</div>
                    <div className="flex flex-wrap items-end gap-3">
                      <div className="w-full max-w-xs"><label className="mb-1 block text-xs text-slate-400">المبلغ (ر.س)</label><Input value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)} type="number" min="0" step="0.01" className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-500" placeholder="0.00" /></div>
                      <Button type="button" onClick={() => { if (!payoutAmount || Number(payoutAmount) <= 0) return toast.error("أدخل مبلغاً صحيحاً"); if (Number(payoutAmount) > available) return toast.error("المبلغ يتجاوز الرصيد المتاح"); requestPayout.mutate({ amount: Number(payoutAmount).toFixed(2), paymentMethod: "bank_transfer" }); }} disabled={requestPayout.isPending || available <= 0} className="rounded-xl bg-[#E76F3C] px-6 font-black hover:bg-orange-400">{requestPayout.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "تقديم الطلب"}</Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Megaphone className="h-5 w-5 text-[#E76F3C]" />سجل العمولات</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {commissions.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">لا توجد عمولات بعد.</p> : commissions.slice(0, 10).map((commission) => { const meta = COMMISSION_LABELS[commission.status] ?? COMMISSION_LABELS.pending; return <div key={commission.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><div><Badge className={meta.className}>{meta.label}</Badge><p className="mt-1 text-xs text-slate-400">عمولة {commission.commissionRate}% · طلب #{commission.orderId ?? "—"}</p></div><div className="text-left"><p className="font-black text-emerald-300">{Number(commission.commissionAmount).toLocaleString("en-US")} ر.س</p><p className="text-[10px] text-slate-500">{new Date(commission.createdAt).toLocaleDateString("ar-SA-u-ca-gregory-nu-latn")}</p></div></div>; })}
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Banknote className="h-5 w-5 text-[#E76F3C]" />طلبات السحب</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {payouts.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">لا توجد طلبات سحب بعد.</p> : payouts.slice(0, 10).map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div><Badge className={payout.status === "completed" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : payout.status === "rejected" ? "border-rose-400/20 bg-rose-400/10 text-rose-300" : payout.status === "processing" ? "border-sky-400/20 bg-sky-400/10 text-sky-300" : "border-amber-400/20 bg-amber-400/10 text-amber-300"}>{payout.status === "completed" ? "مكتمل" : payout.status === "rejected" ? "مرفوض" : payout.status === "processing" ? "قيد الصرف" : "قيد المراجعة"}</Badge>{payout.reviewNote ? <p className="mt-1 text-[11px] text-slate-400">{payout.reviewNote}</p> : null}</div>
                        <div className="text-left"><p className="font-black">{Number(payout.amount).toLocaleString("en-US")} ر.س</p><p className="text-[10px] text-slate-500">{new Date(payout.createdAt).toLocaleDateString("ar-SA-u-ca-gregory-nu-latn")}</p></div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}