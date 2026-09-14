import mysql from "mysql2/promise";
import { createHash } from "node:crypto";

const demoProfiles = {
  7: {
    title: "صانع محتوى أكل ومشروبات",
    bio: "ملف عرض لبطاقة NFOOD الرقمية — يقدم صور الأطباق والوصفات والخدمات الغذائية عبر رابط ثابت.",
    city: "الرياض",
    products: [
      { name: "برجر نوفا", type: "صورة غذائية", description: "صورة عرض احترافية لبرجر مع صوص خاص.", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=82", price: "5.00", currency: "SAR" },
      { name: "وصفة صوص البيت", type: "وصفة", description: "وصفة جزئية لصوص مناسب للبرجر والبطاطس.", imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=82", price: "8.00", currency: "SAR" },
      { name: "جلسة تصوير منيو", type: "خدمة", description: "تصوير مجموعة أطباق للمطاعم والمقاهي.", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=82", price: "150.00", currency: "SAR" },
    ],
  },
};

const paymentMethods = [
  { name: "wallet", label: "محفظة NFOOD", imageUrl: "https://dummyimage.com/96x96/101d31/f97316.png&text=NFOOD", instructions: "الدفع من رصيد المحفظة داخل المنصة." },
  { name: "bank_transfer", label: "تحويل بنكي", imageUrl: "https://dummyimage.com/96x96/0f766e/ffffff.png&text=BANK", instructions: "يتم رفع الإيصال للمراجعة قبل الاعتماد." },
  { name: "stc_pay", label: "STC Pay", imageUrl: "https://dummyimage.com/96x96/5b21b6/ffffff.png&text=STC", instructions: "طريقة اختبار للعرض فقط، وليست بوابة دفع مفعلة." },
];

const services = [
  { name: "تصوير الأطباق", description: "تصوير صور غذائية مناسبة للمنيو والتسويق." },
  { name: "بيع الوصفات", description: "وصفات جزئية مع عرض آمن قبل الشراء." },
];

const cardCatalog = [
  { name: "بطاقة NFOOD NFC/V Card لدعم العملاء", description: "بطاقة رقمية للعميل تعرض ملفه العام عبر رابط ثابت — الاختيار الافتراضي.", targetRole: "customer" },
  { name: "بطاقة NFOOD NFC/V Card للمطاعم", description: "بطاقة تعريف رقمية للمطعم تعرض بياناته ومنيو التعريف.", targetRole: "restaurant" },
  { name: "بطاقة NFOOD NFC/V Card للسائقين", description: "بطاقة رقمية للسائق تعرض بيانات التواصل ووسائل الدفع الخاصة به.", targetRole: "driver" },
];

const db = await mysql.createConnection(process.env.DATABASE_URL);
try {
  for (const accountId of Object.keys(demoProfiles).map(Number)) {
    const entry = demoProfiles[accountId];
    const openId = `test_${accountId}`;
    let [[user]] = await db.query("SELECT id FROM users WHERE openId = ? LIMIT 1", [openId]);
    if (!user?.id) {
      const [[account]] = await db.query("SELECT email, displayName FROM testAccounts WHERE id = ?", [accountId]);
      if (!account) throw new Error(`لا يوجد حساب اختبار بالمعرف ${accountId}`);
      const [createdUser] = await db.execute("INSERT INTO users (openId, name, email, role) VALUES (?, ?, ?, 'user')", [openId, account.displayName, account.email]);
      [[user]] = await db.query("SELECT id FROM users WHERE id = ?", [createdUser.insertId]);
      console.log(`user created id=${user.id} openId=${openId} email=${account.email}`);
    }
    const [[account]] = await db.query("SELECT email, displayName FROM testAccounts WHERE id = ?", [accountId]);
    const slug = `nfood-customer-${accountId}`;
    await db.execute(
      "INSERT INTO customerProfiles (userId, slug, isPublic, defaultContentVisibility, displayName, title, bio, email, city, servicesJson, productsJson, paymentMethodsJson) VALUES (?, ?, 1, 'public', ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE displayName = VALUES(displayName), title = VALUES(title), bio = VALUES(bio), email = VALUES(email), city = VALUES(city), servicesJson = VALUES(servicesJson), productsJson = VALUES(productsJson), paymentMethodsJson = VALUES(paymentMethodsJson), isPublic = 1",
      [user.id, slug, account.displayName, entry.title, entry.bio, account.email, entry.city, JSON.stringify(services), JSON.stringify(entry.products), JSON.stringify(paymentMethods)],
    );
    const [[profile]] = await db.query("SELECT id, slug FROM customerProfiles WHERE userId = ? LIMIT 1", [user.id]);

    const customerCard = cardCatalog.find((c) => c.targetRole === "customer");
    let [[product]] = await db.query("SELECT id FROM vcardCardProducts WHERE name = ? AND targetRole = 'customer' LIMIT 1", [customerCard.name]);
    if (!product?.id) {
      const [created] = await db.execute("INSERT INTO vcardCardProducts (name, description, price, currency, targetRole, isActive) VALUES (?, ?, '0.00', 'SAR', 'customer', 1)", [customerCard.name, customerCard.description]);
      product = { id: created.insertId };
      console.log(`product created id=${product.id} ${customerCard.name}`);
    }

    const bindCode = async (codeValue, boundProfileId) => {
      const codeHash = createHash("sha256").update(codeValue).digest("hex");
      let [[code]] = await db.query("SELECT id, status FROM vcardCardCodes WHERE codeHash = ? LIMIT 1", [codeHash]);
      if (!code?.id) {
        const [created] = await db.execute("INSERT INTO vcardCardCodes (productId, codeHash, codeLast4, status) VALUES (?, ?, ?, 'available')", [product.id, codeHash, codeValue.slice(-4)]);
        code = { id: created.insertId };
      }
      if (boundProfileId && code.status !== "bound") {
        const [[existingBinding]] = await db.query("SELECT id FROM vcardCardBindings WHERE userId = ? LIMIT 1", [user.id]);
        if (existingBinding?.id) {
          await db.execute("UPDATE vcardCardBindings SET customerProfileId = ?, targetRole = 'customer' WHERE id = ?", [boundProfileId, existingBinding.id]);
        } else {
          await db.execute("INSERT INTO vcardCardBindings (codeId, userId, customerProfileId, targetRole) VALUES (?, ?, ?, 'customer')", [code.id, user.id, boundProfileId]);
        }
        await db.execute("UPDATE vcardCardCodes SET status = 'bound', boundAt = COALESCE(boundAt, NOW()) WHERE id = ?", [code.id]);
      }
      return code.id;
    };

    const boundCodeId = await bindCode(`NFOOD-NFC-${accountId}`, profile.id);
    for (const extra of [`NFOOD-NFC-${accountId}-X1`, `NFOOD-NFC-${accountId}-X2`]) {
      await bindCode(extra, null);
    }
    console.log(`${account.displayName} (account ${accountId}): user=${user.id}, profile=${profile.id}, slug=${profile.slug}, products=${entry.products.length}, payments=${paymentMethods.length}, boundCode=${boundCodeId}, link=/vcard/${profile.slug}`);
  }

  for (const card of cardCatalog) {
    let [[product]] = await db.query("SELECT id FROM vcardCardProducts WHERE name = ? AND targetRole = ? LIMIT 1", [card.name, card.targetRole]);
    if (!product?.id) {
      const [created] = await db.execute("INSERT INTO vcardCardProducts (name, description, price, currency, targetRole, isActive) VALUES (?, ?, '0.00', 'SAR', ?, 1)", [card.name, card.description, card.targetRole]);
      console.log(`product created id=${created.insertId} ${card.name} [${card.targetRole}]`);
    }
  }
  console.log("vcard demo seed completed.");
} finally {
  await db.end();
}