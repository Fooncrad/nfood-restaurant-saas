import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowRight, ArrowLeft, Award, CheckCircle2, Copy, Gift, Loader2, LockKeyhole, Sparkles, Store, Tag, WalletCards } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useParams } from "wouter";

const typeLabels: Record<string, { label: string; className: string }> = {
  earn: { label: "اكتساب", className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" },
  redeem: { label: "استبدال", className: "border-orange-400/20 bg-orange-400/10 text-orange-300" },
  adjust: { label: "تعديل", className: "border-sky-400/20 bg-sky-400/10 text-sky-300" },
  expire: { label: "انتهاء", className: "border-rose-400/20 bg-rose-400/10 text-rose-300" },
  welcome: { label: "ترحيب", className: "border-violet-400/20 bg-violet-400/10 text-violet-300" },
};

export default function StoreRewards() {
  const { entityId } = useParams<{ entityId: string }>();
  const { user, loading } = useAuth();
  const [code, setCode] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [result, setResult] = useState<{ code: string; discountAmount: string; discountType: string } | null>(null);
  const store = trpc.marketplace.publicStore.useQuery({ entityId: entityId! }, { retry: false, enabled: Boolean(entityId) });
  const myRewards = trpc.marketplace.myRewards.useQuery(undefined, { retry: false, enabled: Boolean(user) });
  const history = trpc.marketplace.rewardHistory.useQuery({ entityId }, { retry: false, enabled: Boolean(user && entityId) });
  const redeemCoupon = trpc.marketplace.redeemCoupon.useMutation({
    onSuccess: (data) => { setResult({ code: data.code, discountAmount: data.discountAmount, discountType: data.discountType }); void myRewards.refetch(); void history.refetch(); toast.success("تم تفعيل الكوبون بنجاح"); },
    onError: (error) => toast.error(error.message || "تعذر تفعيل الكوبون"),
  });

  if (loading) return <main dir="rtl" className="min-h-screen bg-[#0b0f17] text-white" />;
  if (!user) {
    return <main dir="rtl" className="grid min-h-screen place-items-center bg-[#0b0f17] p-5 text-white"><Card className="w-full max-w-md rounded-3xl border-white/10 bg-white/5"><CardContent className="p-8 text-center"><LockKeyhole className="mx-auto h-10 w-10 text-[#E76F3C]" /><h1 className="mt-4 text-2xl font-black">مكافآت المتجر</h1><p className="mt-2 text-sm leading-7 text-slate-400">سجّل الدخول لرؤية نقاط الولاء واستبدال الكوبونات في متاجر السوق.</p><Button type="button" onClick={() => startLogin()} className="mt-5 rounded-xl bg-[#E76F3C]">تسجيل الدخول</Button></CardContent></Card></main>;
  }

  const loyaltyAccount = (myRewards.data?.loyalty ?? []).find((row) => row.entityId === entityId);
  const wallet = myRewards.data?.wallet;
  const entity = store.data?.entity;
  const loyaltySettings = store.data?.loyaltySettings;
  const rows = history.data ?? [];

  const submitRedeem = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return toast.error("أدخل كود الكوبون");
    if (!orderAmount.trim() || Number.isNaN(Number(orderAmount)) || Number(orderAmount) < 0) return toast.error("أدخل مبلغ الطلب بالأرقام");
    redeemCoupon.mutate({ code: trimmed, entityId, orderAmount: Number(orderAmount).toFixed(2) });
  };

  const handleCopyCode = async (text: string) => { try { await navigator.clipboard.writeText(text); toast.success("تم النسخ"); } catch { toast.error("تعذر النسخ"); } };

  return (
    <main dir="rtl" className="min-h-screen bg-[#0b0f17] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f17]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <Link href="/marketplace"><Button type="button" variant="ghost" className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"><ArrowRight className="ml-2 h-4 w-4" />السوق</Button></Link>
          {entity && <Link href={`/store/${entityId}`}><Button type="button" variant="ghost" className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"><Store className="ml-2 h-4 w-4" />{entity.customerName}</Button></Link>}
          <Link href="/customer-portal"><Button type="button" variant="outline" className="mr-auto rounded-xl border-white/15 text-white hover:bg-white/10">بوابة العميل</Button></Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-8 px-5 py-8 md:px-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black tracking-[.16em] text-orange-400">NFOOD · مكافآت المتاجر</p><h1 className="mt-2 text-3xl font-black">مكافآتك في {entity?.customerName ?? "المتجر"}</h1><p className="mt-2 text-sm text-slate-400">اجمع النقاط، استبدل الكوبونات، وتابع سجل مكافآتك من كل متجر.</p></div>
          <Link href={`/store/${entityId}`}><Button type="button" variant="outline" className="rounded-xl border-white/15 text-white hover:bg-white/10"><ArrowLeft className="ml-2 h-4 w-4" />عرض المتجر</Button></Link>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-xs text-slate-400">نقاط الولاء</p><div className="mt-1 flex items-center gap-2 text-2xl font-black"><Award className="h-5 w-5 text-orange-300" />{loyaltyAccount?.pointsBalance.toLocaleString("en-US") ?? 0}{loyaltyAccount ? <Badge className="border-white/10 bg-white/5 text-xs">{loyaltyAccount.tier}</Badge> : null}</div></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-xs text-slate-400">إجمالي المكتسب</p><p className="mt-1 text-2xl font-black">{loyaltyAccount?.totalEarned.toLocaleString("en-US") ?? 0}</p></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-xs text-slate-400">المحفظة الرقمية</p><p className="mt-1 flex items-center gap-2 text-2xl font-black"><WalletCards className="h-5 w-5 text-emerald-300" />{wallet ? Number(wallet.balance).toLocaleString("en-US") : "—"}</p></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <section className="space-y-6">
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Tag className="h-5 w-5 text-[#E76F3C]" />استبدال كوبون خصم</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {loyaltySettings && loyaltySettings.isActive ? <p className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs leading-6 text-emerald-200">نقطة لكل {loyaltySettings.pointsPerCurrency} ر.س، وكل {loyaltySettings.redeemRate} ر.س تقابل نقطة عند الاستبدال. الحد الأدنى للاستبدال {loyaltySettings.minPointsToRedeem} نقطة.</p> : null}
                <Input className="h-11 rounded-xl border-white/10 bg-white/5 font-mono uppercase text-white placeholder:text-slate-500" placeholder="مثال: SAVE10" value={code} onChange={(event) => setCode(event.target.value)} />
                <Input className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-500" type="number" min="0" step="0.01" placeholder="مبلغ الطلب (ر.س) — مطلوب للكوبونات النسبية" value={orderAmount} onChange={(event) => setOrderAmount(event.target.value)} />
                <Button type="button" onClick={submitRedeem} disabled={redeemCoupon.isPending} className="w-full rounded-xl bg-[#E76F3C] font-black hover:bg-orange-400">{redeemCoupon.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "تفعيل الكوبون"}</Button>
                {result && <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3"><p className="flex items-center gap-2 text-sm font-black text-emerald-200"><CheckCircle2 className="h-4 w-4" />الخصم المتاح {result.discountAmount} ر.س ({result.discountType === "percent" ? "نسبي" : "ثابت"})</p><Button type="button" variant="outline" className="h-8 rounded-lg border-emerald-400/30 text-xs" onClick={() => handleCopyCode(result.code)}><Copy className="ml-1 h-3.5 w-3.5" />{result.code}</Button></div>}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Gift className="h-5 w-5 text-[#E76F3C]" />الكوبونات المتاحة في المتجر</CardTitle></CardHeader>
              <CardContent>
                {(store.data?.coupons ?? []).length === 0 ? <p className="py-6 text-center text-sm text-slate-500">لا توجد كوبونات نشطة حاليًا.</p> : <div className="flex flex-wrap gap-2">{(store.data?.coupons ?? []).map((coupon) => <div key={coupon.id} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"><Tag className="h-4 w-4 text-orange-300" /><span className="font-mono text-xs font-black tracking-widest">{coupon.code}</span><span className="text-[11px] text-emerald-300">{coupon.discountType === "percent" ? `${coupon.discountValue}%` : `${coupon.discountValue} ر.س`}</span><button type="button" className="rounded-full p-1 text-slate-400 hover:text-white" onClick={() => handleCopyCode(coupon.code)}><Copy className="h-3.5 w-3.5" /></button></div>)}</div>}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Sparkles className="h-5 w-5 text-[#E76F3C]" />سجل النقاط</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {rows.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">لا توجد معاملات بعد.</p> : rows.map((row) => { const meta = typeLabels[row.type] ?? typeLabels.adjust; return <div key={row.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><div><Badge className={meta.className}>{meta.label}</Badge><p className="mt-1 text-xs text-slate-400">{row.note ?? row.referenceType ?? "معاملة ولاء"}</p></div><div className="text-left"><p className={`font-black ${Number(row.points) >= 0 ? "text-emerald-300" : "text-rose-300"}`}>{Number(row.points) > 0 ? "+" : ""}{row.points}</p><p className="text-[10px] text-slate-500">{new Date(row.createdAt).toLocaleDateString("ar-SA-u-ca-gregory-nu-latn")}</p></div></div>; })}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}