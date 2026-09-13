import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  FileText,
  Languages,
  LayoutDashboard,
  LockKeyhole,
  Search,
  Settings2,
  ShieldCheck,
  Store,
  Users,
  WalletCards,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export type AdminOrder = {
  id: string;
  customer: string;
  restaurant: string;
  status: "review" | "completed" | "payment";
  amount: number;
  updated: string;
};

export type CentralAdminNavKey = "overview" | "admin" | "accounts" | "settings" | "languages" | "files" | "trend" | "security" | "health";

type Props = { orders: AdminOrder[]; active?: CentralAdminNavKey; onNavigate: (key: CentralAdminNavKey) => void };

const adminNav = [
  ["overview", "نظرة عامة", LayoutDashboard], ["admin", "Super Admin", ShieldCheck], ["accounts", "إدارة الحسابات", Users],
  ["settings", "الإعدادات العامة", Settings2], ["languages", "اللغة والترجمة", Languages], ["files", "مكتبة الملفات", FileText],
  ["trend", "Trend Kitchen / سوق نفود", Store], ["security", "أمان الحساب والجلسات", LockKeyhole], ["health", "صحة النظام", Activity],
] as const;

const statusLabels = { review: "قيد المراجعة", completed: "مكتمل", payment: "بانتظار الدفع" } as const;
const statusClasses = { review: "bg-orange-500/10 text-orange-600 dark:text-orange-300", completed: "bg-teal-500/10 text-teal-700 dark:text-teal-300", payment: "bg-sky-500/10 text-sky-700 dark:text-sky-300" };
const salesData = [62, 78, 70, 96, 88, 118, 108];
const orderData = [34, 48, 42, 65, 58, 82, 76];

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${100 - value}`).join(" ");
  return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true"><polyline points={points} fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg>;
}

export function CentralAdminCommandCenter({ orders, onNavigate }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState<"orders" | "customers" | "purchases" | "nfc">("orders");
  const [query, setQuery] = useState("");
  const filteredOrders = useMemo(() => orders.filter((order) => `${order.id} ${order.customer} ${order.restaurant}`.toLowerCase().includes(query.toLowerCase())), [orders, query]);
  const metrics = [
    ["المطاعم النشطة", "186", "+9%", Store, "#0d9488", salesData], ["الحسابات", "842", "+6%", Users, "#1684d8", orderData],
    ["الاشتراكات", "1,275", "+8%", CircleDollarSign, "#f97316", salesData], ["التنبيهات غير المقروءة", "3", "+50%", Bell, "#9333ea", orderData],
    ["التحويلات المعلقة", "14", "-23%", WalletCards, "#0891b2", salesData], ["مكتبة الملفات", "2,480", "+12%", FileText, "#2563eb", orderData],
  ] as const;
  return <div className="nfood-central-command min-h-full bg-[#f6f8fb] text-slate-900 transition-colors duration-300 dark:bg-[#071525] dark:text-slate-100" dir="rtl">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/[.04]"><div><p className="text-xs font-semibold text-orange-600 dark:text-orange-300">مساحة الإدارة المركزية</p><h2 className="mt-1 text-2xl font-bold">الأدمن المركزي</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">إدارة المنصة والحسابات والمطاعم والحوكمة من مركز واحد.</p></div><div className="flex items-center gap-3"><span className="rounded-full bg-teal-500/10 px-3 py-2 text-xs font-bold text-teal-700 dark:text-teal-300"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-teal-500" /> النظام جاهز</span><button onClick={() => toggleTheme?.()} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold dark:border-white/10 dark:bg-white/5">{theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}</button><button onClick={() => onNavigate("admin")} className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600">مركز الإدارة</button></div></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{metrics.map(([label, value, change, Icon, color, chart]) => <button key={label} onClick={() => onNavigate(label.includes("حساب") ? "accounts" : label.includes("ملفات") ? "files" : "overview")} className="group rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 dark:border-white/10 dark:bg-white/[.04]"><div className="flex items-start justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18`, color }}><Icon className="h-4 w-4" /></span><span className="text-[11px] font-bold text-teal-600 dark:text-teal-300">{change}</span></div><p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p><Sparkline values={chart} color={color} /></button>)}</div>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[.04]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-white/10"><div><h2 className="text-lg font-bold">إدارة الطلبات والعملاء</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">مركز عمليات موحد لمراجعة الطلبات وحسابات العملاء.</p></div><div className="flex rounded-xl bg-slate-100 p-1 dark:bg-white/10">{([["orders", "الطلبات"], ["customers", "العملاء"], ["purchases", "المشتريات"], ["nfc", "الشحن وNFC"]] as const).map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`rounded-lg px-3 py-2 text-xs font-bold transition-all ${tab === key ? "bg-white text-orange-600 shadow-sm dark:bg-slate-800 dark:text-orange-300" : "text-slate-500"}`}>{label}</button>)}</div></div>{tab === "orders" ? <div className="grid gap-5 p-5 xl:grid-cols-[1fr_240px]"><div><div className="mb-3 flex items-center gap-2"><div className="relative flex-1"><Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث برقم الطلب أو العميل أو المطعم" className="h-9 w-full rounded-lg border border-slate-200 bg-transparent pr-9 text-xs outline-none focus:border-orange-400 dark:border-white/10" /></div><span className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500 dark:bg-white/10">كل الحالات</span></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-right text-xs"><thead className="border-b border-slate-200 text-slate-500 dark:border-white/10"><tr>{["رقم الطلب", "العميل", "المطعم", "الحالة", "المبلغ", "آخر تحديث"].map((header) => <th key={header} className="px-3 py-3 font-semibold">{header}</th>)}</tr></thead><tbody>{filteredOrders.length ? filteredOrders.map((order) => <tr key={order.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5"><td className="px-3 py-3 font-bold">{order.id}</td><td className="px-3 py-3">{order.customer}</td><td className="px-3 py-3 text-slate-500 dark:text-slate-400">{order.restaurant}</td><td className="px-3 py-3"><span className={`rounded-full px-2.5 py-1 font-bold ${statusClasses[order.status]}`}>{statusLabels[order.status]}</span></td><td className="px-3 py-3 font-bold">{order.amount.toLocaleString("ar-SA")} ر.س</td><td className="px-3 py-3 text-slate-500 dark:text-slate-400">{order.updated}</td></tr>) : <tr><td colSpan={6} className="px-3 py-10 text-center text-slate-500">لا توجد طلبات مطابقة للبحث.</td></tr>}</tbody></table></div></div><aside className="rounded-xl bg-slate-50 p-4 dark:bg-white/5"><h3 className="font-bold">ملخص العملاء</h3><div className="mt-4 space-y-4"><div><p className="text-xs text-slate-500">إجمالي العملاء</p><p className="text-2xl font-bold">1,248</p></div><div><p className="text-xs text-slate-500">العملاء النشطون</p><p className="text-2xl font-bold text-teal-600">842</p></div><div><p className="text-xs text-slate-500">ملفات العملاء</p><p className="text-2xl font-bold">128</p></div></div><button onClick={() => onNavigate("accounts")} className="mt-5 w-full rounded-xl bg-orange-500 py-2.5 text-xs font-bold text-white hover:bg-orange-600">إدارة العملاء</button></aside></div> : <div className="p-10 text-center text-sm text-slate-500">تبويب {tab === "customers" ? "العملاء" : tab === "purchases" ? "المشتريات" : "الشحن وNFC"} جاهز للتوسعة وربطه ببيانات الوحدة.</div>}</section>
    <div className="mt-6 grid gap-6 xl:grid-cols-2"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[.04]"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-bold">حركة المبيعات اليومية</h2><p className="text-xs text-slate-500 dark:text-slate-400">مؤشر تنفيذي لآخر 7 أيام</p></div><span className="text-xs font-bold text-teal-600">+12.4%</span></div><div className="flex h-32 items-end gap-2">{salesData.map((value, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-md bg-teal-500/80" style={{ height: `${value}%` }} /><span className="text-[10px] text-slate-400">{["س", "ح", "ن", "ث", "ر", "خ", "ج"][index]}</span></div>)}</div></section><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[.1] dark:bg-white/[.04]"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-bold">حركة الطلبات اليومية</h2><p className="text-xs text-slate-500 dark:text-slate-400">توزيع الطلبات حسب اليوم</p></div><span className="text-xs font-bold text-orange-600">{orders.length} طلبات حالية</span></div><div className="flex h-32 items-end gap-2">{orderData.map((value, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-md bg-orange-500/85" style={{ height: `${value}%` }} /><span className="text-[10px] text-slate-400">{["س", "ح", "ن", "ث", "ر", "خ", "ج"][index]}</span></div>)}</div></section></div>
  </div>;
}
