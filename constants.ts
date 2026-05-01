export interface ShopQuestion {
  sentence: string;
  translation: string;
  options: string[];
  correct: string;
  explanation: string;
  item: string;
  price: number;
}

export const COMPRAR_CONJUGATION = [
  { subject: "Yo", conjugation: "compro" },
  { subject: "Tú", conjugation: "compras" },
  { subject: "Él/Ella/Usted", conjugation: "compra" },
  { subject: "Nosotros/as", conjugation: "compramos" },
  { subject: "Vosotros/as", conjugation: "compráis" },
  { subject: "Ellos/Ellas/Ustedes", conjugation: "compran" }
];

export const PAGAR_CONJUGATION = [
  { subject: "Yo", conjugation: "pago" },
  { subject: "Tú", conjugation: "pagas" },
  { subject: "Él/Ella/Usted", conjugation: "paga" },
  { subject: "Nosotros/as", conjugation: "pagamos" },
  { subject: "Vosotros/as", conjugation: "pagáis" },
  { subject: "Ellos/Ellas/Ustedes", conjugation: "pagan" }
];

export const SHOP_DATA: ShopQuestion[] = [
  {
    sentence: "Yo siempre ____ en efectivo.",
    translation: "Ես միշտ կանխիկ եմ վճարում:",
    options: ["pago", "pagas", "paga"],
    correct: "pago",
    explanation: "Yo -> pago (I pay).",
    item: "🍕 Պիցցա",
    price: 10
  },
  {
    sentence: "¿Tú ____ la ropa hoy?",
    translation: "Դու այսօր հագո՞ւստ ես գնում:",
    options: ["compro", "compras", "compra"],
    correct: "compras",
    explanation: "Tú -> compras (You buy).",
    item: "👕 Շապիկ",
    price: 25
  },
  {
    sentence: "Marta ____ los zapatos con tarjeta.",
    translation: "Մարտան կոշիկները գնում է քարտով:",
    options: ["compra", "compras", "compro"],
    correct: "compra",
    explanation: "Ella (Marta) -> compra (She buys).",
    item: "👟 Կոշիկներ",
    price: 50
  },
  {
    sentence: "Nosotros ____ la cuenta en el restaurante.",
    translation: "Մենք վճարում ենք հաշիվը ռեստորանում:",
    options: ["pagamos", "pagáis", "pagan"],
    correct: "pagamos",
    explanation: "Nosotros -> pagamos (We pay).",
    item: "🍜 Ընթրիք",
    price: 40
  },
  {
    sentence: "¿Ustedes ____ muchos libros?",
    translation: "Դուք շատ գրքե՞ր եք գնում:",
    options: ["compran", "compramos", "compráis"],
    correct: "compran",
    explanation: "Ustedes -> compran (You all buy).",
    item: "📚 Գրքեր",
    price: 30
  },
  {
    sentence: "Él ____ mucho dinero en videojuegos.",
    translation: "Նա շատ փող է վճարում տեսախաղերի համար:",
    options: ["paga", "pago", "pagamos"],
    correct: "paga",
    explanation: "Él -> paga (He pays).",
    item: "🎮 Խաղ",
    price: 60
  },
  {
    sentence: "Vosotros ____ fruta en el mercado.",
    translation: "Դուք միրգ եք գնում շուկայից:",
    options: ["compráis", "compran", "compramos"],
    correct: "compráis",
    explanation: "Vosotros -> compráis (You all buy - Spain).",
    item: "🍎 Մրգեր",
    price: 15
  },
  {
    sentence: "Yo ____ una casa nueva.",
    translation: "Ես նոր տուն եմ գնում:",
    options: ["compro", "compras", "compra"],
    correct: "compro",
    explanation: "Yo -> compro (I buy).",
    item: "🏠 Տուն",
    price: 500
  },
  {
    sentence: "Usted ____ el café, por favor.",
    translation: "Դուք (հարգալից) վճարեք սուրճի համար, խնդրում եմ:",
    options: ["paga", "pago", "pagas"],
    correct: "paga",
    explanation: "Usted -> paga (You pay - formal).",
    item: "☕ Սուրճ",
    price: 5
  },
  {
    sentence: "Mis abuelos ____ muchos regalos.",
    translation: "Իմ տատիկ-պապիկը շատ նվերներ են գնում:",
    options: ["compran", "compramos", "compráis"],
    correct: "compran",
    explanation: "Ellos (Abuelos) -> compran (They buy).",
    item: "🎁 Նվեր",
    price: 100
  },
  {
    sentence: "¿Quién ____ la cena?",
    translation: "Ո՞վ է վճարում ընթրիքի համար:",
    options: ["paga", "pago", "pagas"],
    correct: "paga",
    explanation: "¿Quién? is third person singular -> paga.",
    item: "🍣 Սուշի",
    price: 45
  },
  {
    sentence: "Tú y yo ____ un regalo para mamá.",
    translation: "Դու և ես նվեր ենք գնում մայրիկի համար:",
    options: ["compramos", "compran", "compráis"],
    correct: "compramos",
    explanation: "Tú y yo = Nosotros -> compramos.",
    item: "💐 Ծաղիկներ",
    price: 20
  },
  {
    sentence: "Ellas ____ las entradas al cine.",
    translation: "Նրանք վճարում են կինոյի տոմսերի համար:",
    options: ["pagan", "pagamos", "pagáis"],
    correct: "pagan",
    explanation: "Ellas -> pagan (They pay).",
    item: "🎬 Տոմսեր",
    price: 12
  },
  {
    sentence: "Yo no ____ nada hoy.",
    translation: "Ես այսօր ոչինչ չեմ գնում:",
    options: ["compro", "compras", "compra"],
    correct: "compro",
    explanation: "Yo -> compro (I buy).",
    item: "🍦 Պաղպաղակ",
    price: 3
  },
  {
    sentence: "Vosotras ____ el taxi.",
    translation: "Դուք վճարում եք տաքսու համար:",
    options: ["pagáis", "pagan", "pagamos"],
    correct: "pagáis",
    explanation: "Vosotras -> pagáis (You all pay - Spain).",
    item: "🚕 Տաքսի",
    price: 8
  }
];
