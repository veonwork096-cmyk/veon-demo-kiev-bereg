// Client facts for the homepage — only from veon/client.json (company.*, C-003…C-011) and content/photos-sources.txt.
export const FUTURE_NOTE = "Розділ у розробці";

export const company = {
  name: "Будівельна компанія «Берег»",
  short: "Берег",
  legal: "ТОВ «Будівельна компанія «Берег»»",
  edrpou: "06711096",
  since: 2004,
  phoneDisplay: "+38 097 804-86-33",
  phoneShort: "097 804-86-33",
  tel: "tel:+380978048633",
  viber: "viber://chat?number=380978048633",
  telegram: "https://t.me/KievBereg",
  email: "kievbereg@ukr.net",
  mailto: "mailto:kievbereg@ukr.net",
  facebook: "https://www.facebook.com/KievBereg",
  address: "04086, м. Київ, вул. Петропавлівська, 34А",
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("04086, Київ, вул. Петропавлівська, 34А"),
  hours: [
    { days: "Пн–Пт", time: "9.00–19.00" },
    { days: "Сб", time: "9.00–16.00" },
    { days: "Нд", time: "вихідний" },
  ],
} as const;

export const nav = [
  { href: "#directions", label: "Послуги" },
  { href: "#approach", label: "Як працюємо" },
  { href: "#materials", label: "Матеріали" },
  { href: "#about", label: "Про компанію" },
  { href: "#contacts", label: "Контакти" },
] as const;

export type DiagramKind = "gabion" | "pier" | "pond" | "lagoon" | "profile";
export type PhotoKey = "vidradnyi" | "terrace" | "pond" | "lagoons" | "kozyn";

export interface Direction {
  id: string;
  title: string;
  solves: string;
  services: string[];
  diagram: DiagramKind;
  diagramLabel: string;
  photo: PhotoKey;
  caption: string;
  layout: "lg" | "md" | "strip" | "tall" | "md-rev";
}

// 21 services (C-005) in 5 groups — ux/demo-home.md §4.
export const directions: Direction[] = [
  {
    id: "dir-banks",
    title: "Береги і схили",
    solves: "Зупиняємо розмив берега і сповзання схилу — на приватній ділянці й на міському озері.",
    services: ["Укріплення берега", "Укріплення схилів", "Будівництво підпірних стін", "Занурення шпунта Ларсена"],
    diagram: "gabion",
    diagramLabel: "габіонне укріплення схилу",
    photo: "vidradnyi",
    caption: "Благоустрій озера в парку «Відрадний», Київ",
    layout: "lg",
  },
  {
    id: "dir-piers",
    title: "Причали, набережні, тераси",
    solves: "Робимо вихід до води: настил, пірс або набережну на надійній основі.",
    services: ["Будівництво набережних", "Будівництво причалів і пірсів", "Будівництво терас"],
    diagram: "pier",
    diagramLabel: "пірс на палях",
    photo: "terrace",
    caption: "Набережна тераса, база відпочинку, Київська область",
    layout: "tall",
  },
  {
    id: "dir-ponds",
    title: "Водойми",
    solves: "Копаємо нові водойми, чистимо й поглиблюємо старі, намиваємо пісок.",
    services: ["Будівництво водойм", "Копка водойм", "Очищення водойм", "Поглиблення дна", "Намив піску"],
    diagram: "pond",
    diagramLabel: "чаша водойми з геомембраною",
    photo: "pond",
    caption: "Благоустрій ділянки зі штучною водоймою",
    layout: "strip",
  },
  {
    id: "dir-industrial",
    title: "Промислові та агрооб'єкти",
    solves: "Будуємо ємності й майданчики для агро, комунальних і промислових замовників.",
    services: ["Будівництво полігонів ТПВ", "Будівництво резервуарів", "Будівництво лагун для гною", "Будівництво шламосховищ"],
    diagram: "lagoon",
    diagramLabel: "лагуна з геомембраною і обвалуванням",
    photo: "lagoons",
    caption: "Будівництво лагун для гною",
    layout: "md",
  },
  {
    id: "dir-design",
    title: "Проєктування, техніка і супутні роботи",
    solves: "Готуємо проєкт до початку робіт, даємо техніку на воді і закриваємо супутні задачі на ділянці.",
    services: ["Проєктування", "Оренда міні-земснаряда", "Оренда плаваючого екскаватора", "Паркани з габіонів", "Спилювання та обрізка дерев"],
    diagram: "profile",
    diagramLabel: "існуючий і проєктний рельєф ділянки",
    photo: "kozyn",
    caption: "Огородження котловану під басейн, Козин",
    layout: "md-rev",
  },
];

// C-004 — the client's own words.
export const approach = [
  { title: "Строки за договором", text: "Погоджуємо етапи і строки до початку робіт." },
  { title: "Контроль робіт", text: "Підбираємо матеріали і технологію під об'єкт." },
  { title: "Ціна до старту", text: "Розрахунок і умови фіксуються перед початком робіт." },
  { title: "Договір", text: "Умови, обсяг робіт і гарантійні зобов'язання." },
] as const;

// C-006 — 13 categories, grouped by purpose (R-110). Bank group ordered from surface to depth.
export const materialsBank = ["Геомати", "Георешітка", "Геотекстиль", "Габіони", "Сітка для габіонів", "ПВХ шпунт", "Ґрунтові анкери"] as const;
export const materialsSite = ["Терасна дошка", "Лакофарбові матеріали", "3D паркани", "Бордюрна стрічка садова", "Пиломатеріали", "Накінцівники для гвинтових паль"] as const;

// Real object pages from «Наші роботи» (content/photos-sources.txt).
export const objects = [
  "Берегоукріплення габіонами, село Козин",
  "Берегоукріплення ПВХ шпунтом на Осокорках у Києві",
  "Благоустрій берега, Блакитне озеро",
  "Благоустрій берега, будівництво пірсу",
  "Благоустрій озера в парку «Відрадний», м. Київ",
  "Будівництво набережної тераси, база відпочинку, Київська область",
  "Будівництво огородження для котловану під басейн, селище Козин",
  "Будівництво паркану з габіонів на заміській ділянці",
] as const;

export const footerService = ["Доставка та оплата", "Умови повернення товару", "Договір публічної оферти", "Політика конфіденційності"] as const;
