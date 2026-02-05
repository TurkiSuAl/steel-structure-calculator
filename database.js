// ═══════════════════════════════════════════════════════════════
// 📦 قاعدة البيانات — حاسبة تكلفة الهياكل المعدنية
// يمكنك تعديل الأسعار والبيانات هنا بسهولة
// ═══════════════════════════════════════════════════════════════

// ─── قاعدة المواد (صفحة مستقلة + مصدر الأسعار) ──────────────
const DATABASE_MDB = [
  // ── ألواح أسمنتية (Cement Board) ──
  {cat:'Cement Board', type:'Standard',       thick:'6mm',  unit:'لوح', price:41,  note:'سعر اللوح'},
  {cat:'Cement Board', type:'Standard',       thick:'9mm',  unit:'لوح', price:45,  note:''},
  {cat:'Cement Board', type:'Standard',       thick:'10mm', unit:'لوح', price:85,  note:''},
  {cat:'Cement Board', type:'Exterior',       thick:'12mm', unit:'لوح', price:70,  note:''},
  {cat:'Cement Board', type:'Exterior',       thick:'9mm',  unit:'لوح', price:45,  note:''},
  {cat:'Cement Board', type:'Exterior',       thick:'15mm', unit:'لوح', price:110, note:''},
  {cat:'Cement Board', type:'Fire-Resistant', thick:'10mm', unit:'لوح', price:105, note:''},
  {cat:'Cement Board', type:'Fire-Resistant', thick:'12mm', unit:'لوح', price:120, note:''},
  {cat:'Cement Board', type:'Waterproof',     thick:'12mm', unit:'لوح', price:115, note:''},

  // ── ألواح جبسية (Gypsum Board) ──
  {cat:'Gypsum Board', type:'Regular',            thick:'12.5mm', unit:'لوح', price:30,  note:'سعر اللوح'},
  {cat:'Gypsum Board', type:'Moisture Resistant',  thick:'12.5mm', unit:'لوح', price:45,  note:''},
  {cat:'Gypsum Board', type:'Fire Rated',          thick:'12.5mm', unit:'لوح', price:55,  note:''},

  // ── عزل (Insulation) ──
  {cat:'Insulation', type:'Rockwool',  thick:'50mm',  unit:'م²', price:55,  note:'للمتر المربع'},
  {cat:'Insulation', type:'Rockwool',  thick:'75mm',  unit:'م²', price:70,  note:''},
  {cat:'Insulation', type:'Rockwool',  thick:'100mm', unit:'م²', price:90,  note:''},
  {cat:'Insulation', type:'Glasswool', thick:'50mm',  unit:'م²', price:45,  note:''},
  {cat:'Insulation', type:'Glasswool', thick:'75mm',  unit:'م²', price:60,  note:''},
  {cat:'Insulation', type:'XPS Foam',  thick:'50mm',  unit:'م²', price:65,  note:''},
  {cat:'Insulation', type:'XPS Foam',  thick:'75mm',  unit:'م²', price:85,  note:''},

  // ── زجاج (Glass) ──
  {cat:'Glass', type:'Clear',        thick:'6mm',  unit:'م²', price:90,  note:'للمتر المربع'},
  {cat:'Glass', type:'Clear',        thick:'8mm',  unit:'م²', price:110, note:''},
  {cat:'Glass', type:'Tinted',       thick:'6mm',  unit:'م²', price:110, note:''},
  {cat:'Glass', type:'Tinted',       thick:'8mm',  unit:'م²', price:130, note:''},
  {cat:'Glass', type:'Tempered',     thick:'8mm',  unit:'م²', price:140, note:''},
  {cat:'Glass', type:'Tempered',     thick:'12mm', unit:'م²', price:170, note:''},
  {cat:'Glass', type:'Double-Glazed',thick:'12mm', unit:'م²', price:200, note:''},

  // ── ألواح السقف (Roof Panel) ──
  {cat:'Roof Panel', type:'Sandwich Panel', thick:'50mm',     unit:'م²', price:100, note:'للمتر المربع'},
  {cat:'Roof Panel', type:'Sandwich Panel', thick:'75mm',     unit:'م²', price:130, note:''},
  {cat:'Roof Panel', type:'Sandwich Panel', thick:'100mm',    unit:'م²', price:112, note:''},
  {cat:'Roof Panel', type:'Shinko',         thick:'Standard', unit:'م²', price:80,  note:''},
  {cat:'Roof Panel', type:'Metal Sheet',    thick:'0.5mm',    unit:'م²', price:70,  note:''},
  {cat:'Roof Panel', type:'Metal Sheet',    thick:'0.7mm',    unit:'م²', price:85,  note:''},
];

// ─── قاعدة الحديد المرجعية ───────────────────────────────────
const DATABASE_IDB = [
  // ── تيوب ──
  {type:'تيوب',    size:'10*10',  thick:'1.25', len:6, price:84},
  {type:'تيوب',    size:'20*20',  thick:'1.25', len:6, price:120},
  {type:'تيوب',    size:'30*60',  thick:'1.25', len:6, price:30},
  {type:'تيوب',    size:'40*80',  thick:'1.5',  len:6, price:40},

  // ── جسر H ──
  {type:'جسر H',   size:'10*16',  thick:'10',   len:6, price:230},
  {type:'جسر H',   size:'15*20',  thick:'12',   len:6, price:320},

  // ── زاوية ──
  {type:'زاوية',   size:'40*40',  thick:'4',    len:6, price:45},
  {type:'زاوية',   size:'50*50',  thick:'5',    len:6, price:65},

  // ── مجرى C ──
  {type:'مجرى C',  size:'10*5',   thick:'2',    len:6, price:55},
  {type:'مجرى C',  size:'15*7',   thick:'2.5',  len:6, price:75},
];

// ─── البيانات الافتراضية للحاسبة ─────────────────────────────
const DATABASE_MATS = [
  {name:'ألواح أسمنتية خارجية', type:'Exterior',        thick:'12mm', price:65, unit:'لوح', qty:35, note:'الطبقة الخارجية', autoQty:false},
  {name:'ألواح أسمنتية داخلية', type:'Standard',        thick:'9mm',  price:45, unit:'لوح', qty:35, note:'الطبقة الداخلية', autoQty:false},
  {name:'عزل حراري (جدران)',    type:'Rockwool',         thick:'50mm', price:55, unit:'م²',  qty:0,  note:'تلقائي',         autoQty:'wallsNet'},
  {name:'زجاج (نوافذ/أبواب)',   type:'Tempered',         thick:'12mm', price:170,unit:'م²',  qty:0,  note:'تلقائي',         autoQty:'glassArea'},
  {name:'سقف (ساندوتش بانل)',   type:'Sandwich Panel',   thick:'100mm',price:112,unit:'م²',  qty:0,  note:'تلقائي',         autoQty:'roof'},
  {name:'مسامير وإكسسوارات',    type:'—',                thick:'—',    price:15, unit:'م²',  qty:0,  note:'تقدير 15 ر.س/م²',autoQty:'totalSurface'},
  {name:'أعمال الدهان',         type:'—',                thick:'—',    price:25, unit:'م²',  qty:0,  note:'تقدير 25 ر.س/م²',autoQty:'wallsNet'},
];

const DATABASE_IRONS = [
  {type:'تيوب',  size:'10*10',  thick:'1.25', len:6, price:84,  qty:4},
  {type:'تيوب',  size:'30*60',  thick:'1.25', len:6, price:30,  qty:6},
  {type:'جسر H', size:'10*16',  thick:'10',   len:6, price:230, qty:1},
];

const DATABASE_LABS = [
  {name:'تركيب الهيكل الحديدي', desc:'لحام + تركيب',      price:50, unit:'م²', note:'تقدير 50 ر.س/م²', autoQty:'floor'},
  {name:'تركيب الألواح والعزل', desc:'ألواح + عزل',        price:35, unit:'م²', note:'تقدير 35 ر.س/م²', autoQty:'totalSurface'},
  {name:'تركيب السقف',          desc:'ساندوتش / شينكو',    price:40, unit:'م²', note:'تقدير 40 ر.س/م²', autoQty:'roof'},
];

// ─── تحميل البيانات ──────────────────────────────────────────
// دالة لإنشاء نسخة عميقة من المصفوفة (عشان التعديل ما يأثر على الأصل)
function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

// ─── دوال حفظ واسترجاع من LocalStorage ──────────────────────
function saveDatabase() {
  try {
    localStorage.setItem('ssc_mdb',   JSON.stringify(mdb));
    localStorage.setItem('ssc_idb',   JSON.stringify(idb));
    localStorage.setItem('ssc_mats',  JSON.stringify(mats));
    localStorage.setItem('ssc_irons', JSON.stringify(irons));
    localStorage.setItem('ssc_labs',  JSON.stringify(labs));
  } catch(e) {
    console.warn('فشل حفظ البيانات:', e);
  }
}

function loadDatabase() {
  try {
    const savedMdb   = localStorage.getItem('ssc_mdb');
    const savedIdb   = localStorage.getItem('ssc_idb');
    const savedMats  = localStorage.getItem('ssc_mats');
    const savedIrons = localStorage.getItem('ssc_irons');
    const savedLabs  = localStorage.getItem('ssc_labs');

    mdb   = savedMdb   ? JSON.parse(savedMdb)   : deepCopy(DATABASE_MDB);
    idb   = savedIdb   ? JSON.parse(savedIdb)   : deepCopy(DATABASE_IDB);
    mats  = savedMats  ? JSON.parse(savedMats)  : deepCopy(DATABASE_MATS);
    irons = savedIrons ? JSON.parse(savedIrons) : deepCopy(DATABASE_IRONS);
    labs  = savedLabs  ? JSON.parse(savedLabs)  : deepCopy(DATABASE_LABS);
  } catch(e) {
    console.warn('فشل تحميل البيانات، استخدام القيم الافتراضية:', e);
    resetDatabase();
  }
}

function resetDatabase() {
  mdb   = deepCopy(DATABASE_MDB);
  idb   = deepCopy(DATABASE_IDB);
  mats  = deepCopy(DATABASE_MATS);
  irons = deepCopy(DATABASE_IRONS);
  labs  = deepCopy(DATABASE_LABS);
  localStorage.removeItem('ssc_mdb');
  localStorage.removeItem('ssc_idb');
  localStorage.removeItem('ssc_mats');
  localStorage.removeItem('ssc_irons');
  localStorage.removeItem('ssc_labs');
}
