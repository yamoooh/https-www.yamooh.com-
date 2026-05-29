import sigYamooh from "@/assets/signature/yamooh.jpg";
import sigOceanne from "@/assets/signature/oceanne.jpg";
import sigAtlas from "@/assets/signature/atlas.jpg";
import sigTerroire from "@/assets/signature/terroire.jpg";
import sigUrbaine from "@/assets/signature/urbaine.jpg";
import sigBistrot from "@/assets/signature/bistrot.jpg";
import sigCaprece from "@/assets/signature/caprece.jpg";
import sigIceberg from "@/assets/signature/iceberg.jpg";
import sClassic from "@/assets/photos/salade-classic.jpg";
import sPoulet from "@/assets/photos/salade-poulet.jpg";
import sThon from "@/assets/photos/salade-thon.jpg";
import sAvocat from "@/assets/photos/salade-avocat.jpg";
import sCrevettes from "@/assets/photos/salade-crevettes.jpg";
import sVeggie from "@/assets/photos/salade-veggie.jpg";
import swPoulet from "@/assets/photos/sandwich-poulet.jpg";
import swThon from "@/assets/photos/sandwich-thon.jpg";
import swVeggie from "@/assets/photos/sandwich-veggie.jpg";
import wrapMex from "@/assets/photos/wrap-mexicain.jpg";
import dGingembre from "@/assets/photos/jus-gingembre.jpg";
import dBissap from "@/assets/photos/bissap.jpg";
import dCitron from "@/assets/photos/citronnade.jpg";
import dEau from "@/assets/photos/eau.jpg";
import dJus from "@/assets/photos/jus-fruit.jpg";
import saVin from "@/assets/photos/sauce-vinaigrette.jpg";
import saCesar from "@/assets/photos/sauce-cesar.jpg";
import saMiel from "@/assets/photos/sauce-miel.jpg";
import saTahini from "@/assets/photos/sauce-tahini.jpg";
import saPassion from "@/assets/photos/sauce-passion.jpg";

// Mapping des ingrédients d'une signature vers les IDs du builder
export type SignatureIngredients = {
  base: string[];
  protein: string[];
  vegetables: string[];
  toppings: string[];
  sauce: string[];
  fruits: string[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  slogan?: string;
  composition?: { label: string; items: string[] }[];
  calories?: number;
  price: number;
  category: "Signature" | "Salades" | "Sandwichs" | "Boissons" | "Sauces";
  badge?: string;
  emoji?: string;
  image: string;
  signature?: boolean;
  /** Ingrédients pré-sélectionnés dans le builder quand on part d'une signature */
  builderIngredients?: SignatureIngredients;
};

export const menu: MenuItem[] = [
  // SIGNATURE — ICEBERG
  {
    id: "sig-iceberg",
    name: "L'Ibèrique",
    slogan: "L'harmonie parfaite des saveurs.",
    description: "Mélange laitue et jeunes pousses, tranches de jambon cru ou de coppa, copeaux de fromage AOP, julienne de carottes, quartiers de pomme Golden citronnés, olives noires et cerneaux de noix.",
    composition: [
      { label: "Base", items: ["Mélange laitue et jeunes pousses pour plus de texture"] },
      { label: "Protéine", items: ["Belles tranches de Jambon cru ou de Coppa"] },
      { label: "Fromage", items: ["Copeaux de fromage AOP"] },
      { label: "Légumes & Fruits", items: ["Julienne de carottes", "Quartiers de pomme Golden citronnés", "Olives noires", "Cerneaux de noix"] },
      { label: "Composition & Qualité", items: ["Densité calorique équilibrée : un repas complet et structuré, garantissant une satiété durable grâce aux bons lipides des noix et du fromage."] },
    ],
    calories: 490,
    price: 4900,
    category: "Signature",
    badge: "Signature",
    emoji: "🧊",
    image: sigIceberg,
    signature: true,
    builderIngredients: {
      base: ["coeurs-laitue", "jeunes-pousses"],
      protein: ["jambon-cru"],
      vegetables: ["carrot"],
      toppings: ["olives-noires", "noix-grenoble", "parmesan"],
      sauce: [],
      fruits: ["pomme"],
    },
  },
  // SIGNATURE — YAMOOH
  {
    id: "sig-yamooh",
    name: "La Yamooh",
    slogan: "L'équilibre parfait dans chaque bouchée.",
    description: "Mélange Iceberg, cœurs de laitue, blanc de poulet tranché, mélange râpé & copeaux de Grana Padano, carottes en julienne, radis et croûtons aillés maison.",
    composition: [
      { label: "Base", items: ["Mélange Iceberg", "Cœurs de laitue"] },
      { label: "Protéine", items: ["Blanc de poulet tranché"] },
      { label: "Fromage", items: ["Mélange râpé", "Copeaux de Grana Padano ou Parmesan"] },
      { label: "Légumes & croquant", items: ["Carottes en julienne", "Radis", "Croûtons aillés maison"] },
    ],
    calories: 490,
    price: 4000,
    category: "Signature",
    badge: "Signature",
    emoji: "👑",
    image: sigYamooh,
    signature: true,
    builderIngredients: {
      base: ["iceberg", "coeurs-laitue"],
      protein: ["blanc-poulet"],
      vegetables: ["carrot", "radis"],
      toppings: ["cheese", "croutons"],
      sauce: [],
      fruits: [],
    },
  },
  {
    id: "sig-oceanne",
    name: "L'Océanne",
    slogan: "L'accord parfait du croquant et du fondant.",
    description: "Mélange laitue, feuilles de chou rouge, thon, œuf dur, carottes, radis et olives noires.",
    composition: [
      { label: "Base", items: ["Mélange laitue", "Feuilles de chou rouge"] },
      { label: "Protéine", items: ["Thon", "Œuf dur"] },
      { label: "Légumes", items: ["Carottes", "Radis", "Olives noires"] },
    ],
    calories: 410,
    price: 4000,
    category: "Signature",
    emoji: "🌊",
    image: sigOceanne,
    signature: true,
    builderIngredients: {
      base: ["iceberg", "redcabbage"],
      protein: ["tuna", "egg"],
      vegetables: ["carrot", "radis", "olives-noires"],
      toppings: [],
      sauce: [],
      fruits: [],
    },
  },
  {
    id: "sig-atlas",
    name: "L'Atlas",
    slogan: "Le compromis parfait entre nutrition et plaisir.",
    description: "Quinoa, jeunes pousses, jambon cru affiné, mozzarella Ciliegine, chou rouge, betterave et ciboulette.",
    composition: [
      { label: "Base", items: ["Quinoa", "Jeunes pousses"] },
      { label: "Protéine", items: ["Jambon cru affiné"] },
      { label: "Fromage", items: ["Mozzarella Ciliegine"] },
      { label: "Légumes", items: ["Chou rouge", "Betterave", "Ciboulette"] },
    ],
    calories: 490,
    price: 4500,
    category: "Signature",
    emoji: "🏔️",
    image: sigAtlas,
    signature: true,
    builderIngredients: {
      base: ["quinoa", "jeunes-pousses"],
      protein: ["jambon-cru"],
      vegetables: ["redcabbage", "beetroot", "ciboulette"],
      toppings: ["cheese"],
      sauce: [],
      fruits: [],
    },
  },
  {
    id: "sig-terroire",
    name: "La Terroire",
    slogan: "La générosité des saveurs authentiques.",
    description: "Laitue, carottes, chou rouge, jambon cuit supérieur, fromage AOP, tomates et radis.",
    composition: [
      { label: "Base", items: ["Laitue", "Carottes", "Chou rouge"] },
      { label: "Protéine", items: ["Jambon cuit supérieur"] },
      { label: "Fromage", items: ["Fromage AOP"] },
      { label: "Légumes", items: ["Tomates", "Carottes", "Radis"] },
    ],
    calories: 490,
    price: 4500,
    category: "Signature",
    emoji: "🌾",
    image: sigTerroire,
    signature: true,
    builderIngredients: {
      base: ["iceberg"],
      protein: ["jambon-cuit"],
      vegetables: ["carrot", "redcabbage", "tomato", "radis"],
      toppings: ["cheese"],
      sauce: [],
      fruits: [],
    },
  },
  {
    id: "sig-urbaine",
    name: "L'Urbaine",
    slogan: "Le juste équilibre entre tradition et vitalité.",
    description: "Iceberg, cœurs de laitue, jambon cru de pays, fromage AOP, carottes, radis, tomates cerises, noix de Grenoble et croûtons maison.",
    composition: [
      { label: "Base", items: ["Iceberg", "Cœurs de laitue"] },
      { label: "Protéine", items: ["Jambon cru de pays"] },
      { label: "Fromage", items: ["Fromage AOP"] },
      { label: "Légumes & extras", items: ["Carottes", "Radis", "Tomates cerises", "Noix de Grenoble", "Croûtons maison"] },
    ],
    calories: 490,
    price: 4800,
    category: "Signature",
    badge: "Premium",
    emoji: "🏙️",
    image: sigUrbaine,
    signature: true,
    builderIngredients: {
      base: ["iceberg", "coeurs-laitue"],
      protein: ["jambon-cru-pays"],
      vegetables: ["carrot", "radis", "tomates-cerises"],
      toppings: ["cheese", "nuts", "croutons"],
      sauce: [],
      fruits: [],
    },
  },
  {
    id: "sig-bistrot",
    name: "La Bistrot",
    slogan: "La force du terroir dans un bol urbain.",
    description: "Lentilles, salade fraîche, effiloché de bœuf, fromage AOP, carottes, tomates, radis et cornichons.",
    composition: [
      { label: "Base", items: ["Lentilles", "Salade fraîche"] },
      { label: "Protéine", items: ["Effiloché de bœuf"] },
      { label: "Fromage", items: ["Fromage AOP"] },
      { label: "Légumes", items: ["Carottes", "Tomates", "Radis", "Cornichons"] },
    ],
    calories: 450,
    price: 4500,
    category: "Signature",
    emoji: "🥩",
    image: sigBistrot,
    signature: true,
    builderIngredients: {
      base: ["lentilles", "iceberg"],
      protein: ["boeuf-effiloche"],
      vegetables: ["carrot", "tomato", "radis", "cornichons"],
      toppings: ["cheese"],
      sauce: [],
      fruits: [],
    },
  },
  {
    id: "sig-caprece",
    name: "La Caprece",
    slogan: "L'harmonie entre fraîcheur et onctuosité.",
    description: "Roquette sauvage, feuille de chêne, mozzarella Ciliegine, tomates rondes, olives Kalamata, basilic frais et huile d'olive extra vierge.",
    composition: [
      { label: "Base", items: ["Roquette sauvage", "Feuille de chêne"] },
      { label: "Fromage", items: ["Mozzarella Ciliegine"] },
      { label: "Légumes", items: ["Tomates rondes"] },
      { label: "Extras", items: ["Olives Kalamata", "Basilic frais", "Huile d'olive extra vierge"] },
    ],
    calories: 490,
    price: 4800,
    category: "Signature",
    badge: "Premium",
    emoji: "🍅",
    image: sigCaprece,
    signature: true,
    builderIngredients: {
      base: ["roquette", "feuille-chene"],
      protein: [],
      vegetables: ["tomato", "olives-kalamata", "basilic"],
      toppings: ["cheese", "huile-olive"],
      sauce: [],
      fruits: [],
    },
  },

  // SALADES
  { id: "s1", name: "Yamooh Classic", description: "Laitue, tomates, concombre, oignons rouges, vinaigrette maison.", price: 2500, category: "Salades", badge: "Populaire", emoji: "🥗", image: sClassic },
  { id: "s2", name: "Poulet Grillé Bowl", description: "Poulet grillé, avocat, mais, croûtons, sauce césar légère.", price: 3500, category: "Salades", badge: "Best-seller", emoji: "🍗", image: sPoulet },
  { id: "s3", name: "Thon Méditerranéen", description: "Thon, olives, feta, tomates cerises, huile d'olive citronnée.", price: 3800, category: "Salades", emoji: "🐟", image: sThon },
  { id: "s4", name: "Avocat Quinoa", description: "Quinoa, avocat, mangue, graines, vinaigrette agrumes.", price: 3200, category: "Salades", badge: "Vegan", emoji: "🥑", image: sAvocat },
  { id: "s5", name: "Crevettes Tropicales", description: "Crevettes, ananas, mangue, coriandre, sauce passion.", price: 4500, category: "Salades", emoji: "🍤", image: sCrevettes },
  { id: "s6", name: "Veggie Garden", description: "Mix de légumes croquants, pois chiches, vinaigrette tahini.", price: 2800, category: "Salades", badge: "Vegan", emoji: "🌱", image: sVeggie },

  // SANDWICHS
  { id: "sw1", name: "Sandwich Poulet", description: "Pain frais, poulet grillé, salade, tomate, sauce maison.", price: 2500, category: "Sandwichs", badge: "Recommandé", emoji: "🥪", image: swPoulet },
  { id: "sw2", name: "Sandwich Thon", description: "Pain frais, thon, oeuf, mayo, légumes croquants.", price: 2300, category: "Sandwichs", emoji: "🥖", image: swThon },
  { id: "sw3", name: "Sandwich Veggie", description: "Pain complet, avocat, fromage, légumes grillés.", price: 2200, category: "Sandwichs", badge: "Vegan", emoji: "🥬", image: swVeggie },
  { id: "sw4", name: "Wrap Mexicain", description: "Tortilla, poulet, mais, fromage, sauce épicée.", price: 2700, category: "Sandwichs", emoji: "🌯", image: wrapMex },

  // BOISSONS
  { id: "d1", name: "Jus de Gingembre", description: "Frais, pressé, légèrement sucré.", price: 1000, category: "Boissons", emoji: "🫚", image: dGingembre },
  { id: "d2", name: "Bissap Maison", description: "Infusion d'hibiscus glacée et menthe.", price: 1000, category: "Boissons", emoji: "🌺", image: dBissap },
  { id: "d3", name: "Citronnade Menthe", description: "Citron pressé, menthe fraîche.", price: 1000, category: "Boissons", emoji: "🍋", image: dCitron },
  { id: "d4", name: "Eau Minérale", description: "33 cl.", price: 500, category: "Boissons", emoji: "💧", image: dEau },
  { id: "d5", name: "Jus de Fruit 0.5L", description: "Mangue, ananas ou orange pressée.", price: 1500, category: "Boissons", emoji: "🥭", image: dJus },

  // SAUCES
  { id: "sa1", name: "Vinaigrette Maison", description: "Huile d'olive, citron, herbes fraîches.", price: 300, category: "Sauces", emoji: "🫒", image: saVin },
  { id: "sa2", name: "Sauce César", description: "Crémeuse, légère, parmesan.", price: 500, category: "Sauces", emoji: "🧄", image: saCesar },
  { id: "sa3", name: "Sauce Miel-Moutarde", description: "Sucrée-salée, parfaite avec poulet.", price: 500, category: "Sauces", emoji: "🍯", image: saMiel },
  { id: "sa4", name: "Sauce Tahini", description: "Crémeuse au sésame, vegan.", price: 500, category: "Sauces", badge: "Vegan", emoji: "🌰", image: saTahini },
  { id: "sa5", name: "Sauce Passion", description: "Fruitée, légèrement épicée.", price: 500, category: "Sauces", emoji: "🥭", image: saPassion },
];

export type Formula = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  features: string[];
  limits: { base: number; vegetables: number; protein: number; toppings: number; sauce: number };
  badge?: string;
};

export const formulas: Formula[] = [
  {
    id: "f1",
    name: "La Fraîche",
    emoji: "🥗",
    description: "L'essentiel pour une pause saine et savoureuse.",
    price: 4000,
    features: ["1 base au choix", "3 légumes inclus", "1 protéine incluse", "1 topping inclus", "1 sauce au choix"],
    limits: { base: 1, vegetables: 3, protein: 1, toppings: 1, sauce: 1 },
  },
  {
    id: "f2",
    name: "Gourmande",
    emoji: "🍱",
    description: "Pour les gros appétits — base, 4 légumes, 2 protéines, 2 toppings.",
    price: 6500,
    features: ["1 base au choix", "4 légumes inclus", "2 protéines incluses", "2 toppings inclus", "1 sauce au choix"],
    limits: { base: 1, vegetables: 4, protein: 2, toppings: 2, sauce: 1 },
    badge: "Best-seller",
  },
  {
    id: "f3",
    name: "Énergie",
    emoji: "🍹",
    description: "Boost vitalité — base premium, 3 légumes, 1 protéine, toppings énergisants.",
    price: 6000,
    features: ["1 base au choix", "3 légumes inclus", "1 protéine incluse", "2 toppings inclus", "1 sauce au choix"],
    limits: { base: 1, vegetables: 3, protein: 1, toppings: 2, sauce: 1 },
    badge: "Recommandé",
  },
];

export const EXTRA_INGREDIENT_PRICE = 500;

export const supplements = [
  { name: "Légumes supplémentaires", price: 500, emoji: "🥕" },
  { name: "Protéine standard (poulet, thon, oeuf)", price: 1000, emoji: "🍗" },
  { name: "Protéine premium (crevettes, saumon)", price: 1500, emoji: "🍤" },
  { name: "Base spéciale (quinoa, lentilles)", price: 1000, emoji: "🌾" },
];
