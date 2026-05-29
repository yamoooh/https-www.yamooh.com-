export type Option = { id: string; name: string; price: number; emoji: string; image?: string; alt?: string };

// New menu images (WebP, 600x600)
import imgChene from "@/assets/menu-new/chene.webp";
import imgTortilla from "@/assets/menu-new/tortilla.webp";
import imgLentilles from "@/assets/menu-new/lentilles.webp";
import imgPoulet from "@/assets/menu-new/poulet.webp";
import imgBlancPoulet from "@/assets/menu-new/blanc-poulet.webp";
import imgCrevette from "@/assets/menu-new/crevette.webp";
import imgThon from "@/assets/menu-new/thon.webp";
import imgChorizo from "@/assets/menu-new/chorizo.webp";
import imgJambonCru from "@/assets/menu-new/jambon-cru.webp";
import imgJambonCuit from "@/assets/menu-new/jambon-cuit.webp";
import imgBoeuf from "@/assets/menu-new/boeuf-effiloche.webp";
import imgPoivron from "@/assets/menu-new/poivron.webp";
import imgCourgette from "@/assets/menu-new/courgette.webp";
import imgRadis from "@/assets/menu-new/radis.webp";
import imgOlivesNoires from "@/assets/menu-new/olives-noires.webp";
import imgCornichons from "@/assets/menu-new/cornichons.webp";
import imgCiboulette from "@/assets/menu-new/ciboulette.webp";
import imgFromageRape from "@/assets/menu-new/fromage-rape.webp";
import imgCroutons from "@/assets/menu-new/croutons.webp";
import imgVinaigrette from "@/assets/menu-new/sauce-vinaigrette.webp";
import imgPomme from "@/assets/menu-new/pomme.webp";
import imgBanane from "@/assets/menu-new/banane.webp";
import imgMangue from "@/assets/menu-new/mangue.webp";
import imgPapaye from "@/assets/menu-new/papaye.webp";
import imgParmesan from "@/assets/menu-new/parmesan.webp";
import imgTomateCerise from "@/assets/menu-new/tomate-cerise.webp";
import imgOlivesKalamata from "@/assets/menu-new/olives-kalamata.webp";
import imgNoixGrenoble from "@/assets/menu-new/noix-grenoble.webp";
import imgHuileOlive from "@/assets/menu-new/huile-olive.webp";
import imgCoeursLaitue from "@/assets/menu-new/coeurs-laitue.webp";
import imgMozzarella from "@/assets/menu-new/mozzarella.webp";
import imgIceberg from "@/assets/menu-new/iceberg.webp";
import imgPousse from "@/assets/menu-new/pousse.jpeg";

// Legacy fallback images for items without dedicated new photos
import imgRiz from "@/assets/menu/riz.jpg";
import imgPate from "@/assets/menu/pate.jpg";
import imgRizMix from "@/assets/menu/IMG-20260510-WA0007.jpg";
import imgRoquette from "@/assets/menu/laitue.jpg";
import imgConcombre from "@/assets/menu/IMG-20260510-WA0016.jpg";
import imgCarotte from "@/assets/menu/IMG-20260510-WA0019.jpg";
import imgAvocat from "@/assets/menu/IMG-20260510-WA0025.jpg";
import imgChampignon from "@/assets/menu/IMG-20260510-WA0018.jpg";
import imgAubergine from "@/assets/menu/IMG-20260510-WA0020.jpg";
import imgEpinards from "@/assets/menu/IMG-20260510-WA0011.jpg";
import imgMache from "@/assets/menu/epinards.jpg";
import imgCheddar from "@/assets/menu/IMG-20260510-WA0024.jpg";
import imgAnanas from "@/assets/menu/IMG-20260510-WA0022.jpg";
import quinoa from "@/assets/ingredients/quinoa.webp";
import mix from "@/assets/ingredients/mix.webp";
import tomato from "@/assets/ingredients/tomato.webp";
import beetroot from "@/assets/ingredients/beetroot.webp";
import corn from "@/assets/ingredients/corn.webp";
import onion from "@/assets/ingredients/onion.webp";
import redcabbage from "@/assets/ingredients/redcabbage.webp";
import whitecabbage from "@/assets/ingredients/whitecabbage.webp";
import broccoli from "@/assets/ingredients/broccoli.webp";
import watermelon from "@/assets/ingredients/watermelon.webp";
import egg from "@/assets/ingredients/egg.webp";
import none from "@/assets/ingredients/none.webp";
import cheese from "@/assets/ingredients/cheese.webp";
import white from "@/assets/ingredients/white.webp";
import mustard from "@/assets/ingredients/mustard.webp";
import honeymustard from "@/assets/ingredients/honeymustard.webp";
import garlic from "@/assets/ingredients/garlic.webp";

export const BASE_PRICE = 0;

const A = (n: string) => `${n} - Salade Yamooh Douala`;

// Bases — removed: Laitue, Pâtes complètes, Iceberg (Iceberg est une salade signature, pas un ingrédient)
export const bases: Option[] = [
  { id: "coeurs-laitue", name: "Cœurs de laitue", price: 500, emoji: "🥬", image: imgCoeursLaitue, alt: A("Cœurs de laitue") },
  { id: "roquette", name: "Roquette sauvage", price: 500, emoji: "🌱", image: imgRoquette, alt: A("Roquette sauvage") },
  { id: "feuille-chene", name: "Feuille de chêne", price: 1000, emoji: "🍃", image: imgChene, alt: A("Feuille de chêne") },
  { id: "jeunes-pousses", name: "Jeunes pousses", price: 500, emoji: "🌿", image: imgPousse, alt: A("Jeunes pousses") },
  { id: "rice", name: "Riz", price: 500, emoji: "🍚", image: imgRiz, alt: A("Riz") },
  { id: "pasta", name: "Pâtes", price: 500, emoji: "🍝", image: imgPate, alt: A("Pâtes") },
  { id: "quinoa", name: "Quinoa", price: 1000, emoji: "🌱", image: quinoa, alt: A("Quinoa") },
  { id: "mix", name: "Mix base (riz & roquette)", price: 500, emoji: "🥗", image: imgRizMix, alt: A("Mix base") },
  { id: "wrap", name: "Tortilla / Wrap", price: 500, emoji: "🌯", image: imgTortilla, alt: A("Tortilla") },
  { id: "lentilles", name: "Lentilles", price: 500, emoji: "🌰", image: imgLentilles, alt: A("Lentilles") },
];

// Vegetables — added: Parmesan (+500), keep tomate cerise
export const vegetables: Option[] = [
  { id: "carrot", name: "Carotte râpée", price: 500, emoji: "🥕", image: imgCarotte, alt: A("Carotte râpée") },
  { id: "cucumber", name: "Concombre", price: 500, emoji: "🥒", image: imgConcombre, alt: A("Concombre") },
  { id: "tomato", name: "Tomate", price: 500, emoji: "🍅", image: tomato, alt: A("Tomate") },
  { id: "tomates-cerises", name: "Tomate cerise", price: 500, emoji: "🍅", image: imgTomateCerise, alt: A("Tomate cerise") },
  { id: "beetroot", name: "Betterave", price: 500, emoji: "🥗", image: beetroot, alt: A("Betterave") },
  { id: "corn", name: "Maïs", price: 500, emoji: "🌽", image: corn, alt: A("Maïs") },
  { id: "onion", name: "Oignon", price: 500, emoji: "🧅", image: onion, alt: A("Oignon") },
  { id: "pepper", name: "Poivron", price: 500, emoji: "🫑", image: imgPoivron, alt: A("Poivron") },
  { id: "redcabbage", name: "Chou rouge", price: 500, emoji: "🥬", image: redcabbage, alt: A("Chou rouge") },
  { id: "whitecabbage", name: "Chou blanc", price: 500, emoji: "🥬", image: whitecabbage, alt: A("Chou blanc") },
  { id: "avocado", name: "Avocat", price: 500, emoji: "🥑", image: imgAvocat, alt: A("Avocat") },
  { id: "broccoli", name: "Brocoli", price: 500, emoji: "🥦", image: broccoli, alt: A("Brocoli") },
  { id: "epinards", name: "Épinards", price: 500, emoji: "🌿", image: imgEpinards, alt: A("Épinards") },
  { id: "mache", name: "Mâche", price: 500, emoji: "🌿", image: imgMache, alt: A("Mâche") },
  { id: "champignons", name: "Champignons", price: 500, emoji: "🍄", image: imgChampignon, alt: A("Champignons") },
  { id: "aubergine", name: "Aubergine grillée", price: 500, emoji: "🍆", image: imgAubergine, alt: A("Aubergine grillée") },
  { id: "courgette", name: "Courgette grillée", price: 500, emoji: "🥒", image: imgCourgette, alt: A("Courgette grillée") },
  { id: "radis", name: "Radis", price: 500, emoji: "🌶️", image: imgRadis, alt: A("Radis") },
  { id: "parmesan-veg", name: "Parmesan", price: 500, emoji: "🧀", image: imgParmesan, alt: A("Parmesan") },
  { id: "olives-noires", name: "Olives noires", price: 500, emoji: "🫒", image: imgOlivesNoires, alt: A("Olives noires") },
  { id: "olives-kalamata", name: "Olives Kalamata", price: 500, emoji: "🫒", image: imgOlivesKalamata, alt: A("Olives Kalamata") },
  { id: "cornichons", name: "Cornichons", price: 500, emoji: "🥒", image: imgCornichons, alt: A("Cornichons") },
  { id: "ciboulette", name: "Ciboulette", price: 500, emoji: "🌿", image: imgCiboulette, alt: A("Ciboulette") },
  { id: "basilic", name: "Basilic frais", price: 500, emoji: "🌿", image: imgEpinards, alt: A("Basilic frais") },
];

// Fruits — removed: Ananas (bol)
export const fruits: Option[] = [
  { id: "apple", name: "Pomme", price: 500, emoji: "🍎", image: imgPomme, alt: A("Pomme") },
  { id: "pineapple", name: "Ananas", price: 500, emoji: "🍍", image: imgAnanas, alt: A("Ananas") },
  { id: "mango", name: "Mangue", price: 500, emoji: "🥭", image: imgMangue, alt: A("Mangue") },
  { id: "banana", name: "Banane", price: 500, emoji: "🍌", image: imgBanane, alt: A("Banane") },
  { id: "papaya", name: "Papaye", price: 500, emoji: "🍈", image: imgPapaye, alt: A("Papaye") },
  { id: "watermelon", name: "Pastèque", price: 500, emoji: "🍉", image: watermelon, alt: A("Pastèque") },
];

// Proteins — added: Mozzarella (+1000)
export const proteins: Option[] = [
  { id: "chicken", name: "Poulet grillé", price: 1000, emoji: "🍗", image: imgPoulet, alt: A("Poulet grillé") },
  { id: "blanc-poulet", name: "Blanc de poulet tranché", price: 1000, emoji: "🍗", image: imgBlancPoulet, alt: A("Blanc de poulet") },
  { id: "crevette", name: "Crevettes", price: 1000, emoji: "🍤", image: imgCrevette, alt: A("Crevette") },
  { id: "tuna", name: "Thon", price: 1000, emoji: "🐟", image: imgThon, alt: A("Thon") },
  { id: "egg", name: "Œuf", price: 500, emoji: "🥚", image: egg, alt: A("Œuf") },
  { id: "mozzarella", name: "Mozzarella", price: 1000, emoji: "🧀", image: imgMozzarella, alt: A("Mozzarella") },
  { id: "chorizo", name: "Chorizo", price: 1000, emoji: "🌶️", image: imgChorizo, alt: A("Chorizo") },
  { id: "jambon-cru", name: "Jambon cru affiné", price: 1500, emoji: "🥓", image: imgJambonCru, alt: A("Jambon cru affiné") },
  { id: "jambon-cuit", name: "Jambon cuit supérieur", price: 1000, emoji: "🍖", image: imgJambonCuit, alt: A("Jambon cuit supérieur") },
  { id: "boeuf-effiloche", name: "Effiloché de bœuf", price: 1500, emoji: "🥩", image: imgBoeuf, alt: A("Effiloché de bœuf") },
  { id: "none", name: "Aucune", price: 0, emoji: "🚫", image: none, alt: "Aucune protéine" },
];

export const cheeses: Option[] = [
  { id: "rape", name: "Mélange râpé", price: 500, emoji: "🧀", image: imgFromageRape, alt: A("Mélange râpé") },
  { id: "cheddar", name: "Cheddar en cubes", price: 500, emoji: "🧀", image: imgCheddar, alt: A("Cheddar en cubes") },
  { id: "grana", name: "Copeaux de Grana Padano", price: 500, emoji: "🧀", image: cheese, alt: A("Grana Padano") },
  { id: "parmesan", name: "Parmesan", price: 500, emoji: "🧀", image: imgParmesan, alt: A("Parmesan") },
  { id: "mozza", name: "Mozzarella Ciliegine", price: 500, emoji: "🧀", image: imgMozzarella, alt: A("Mozzarella Ciliegine") },
  { id: "aop", name: "Fromage AOP", price: 500, emoji: "🧀", image: cheese, alt: A("Fromage AOP") },
];

// Toppings — removed: Graines, Croûtons aillés maison
export const toppings: Option[] = [
  { id: "cheese", name: "Fromage râpé", price: 500, emoji: "🧀", image: imgFromageRape, alt: A("Fromage râpé") },
  { id: "cheddar", name: "Cheddar cubes", price: 500, emoji: "🧀", image: imgCheddar, alt: A("Cheddar cubes") },
  { id: "croutons", name: "Croûtons", price: 500, emoji: "🥖", image: imgCroutons, alt: A("Croûtons") },
  { id: "noix-grenoble", name: "Noix de Grenoble", price: 500, emoji: "🥜", image: imgNoixGrenoble, alt: A("Noix de Grenoble") },
  { id: "huile-olive", name: "Huile d'olive extra vierge", price: 500, emoji: "🫒", image: imgHuileOlive, alt: A("Huile d'olive extra vierge") },
];

// Sauces — renamed Vinaigrette → Sauce Vinaigrette
export const sauces: Option[] = [
  { id: "white", name: "Sauce blanche", price: 0, emoji: "🥛", image: white, alt: A("Sauce blanche") },
  { id: "mustard", name: "Moutarde", price: 0, emoji: "🟡", image: mustard, alt: A("Moutarde") },
  { id: "honeymustard", name: "Miel-moutarde", price: 0, emoji: "🍯", image: honeymustard, alt: A("Miel-moutarde") },
  { id: "garlic", name: "Sauce ail", price: 0, emoji: "🧄", image: garlic, alt: A("Sauce ail") },
  { id: "vinaigrette", name: "Sauce Vinaigrette", price: 0, emoji: "🫒", image: imgVinaigrette, alt: A("Sauce Vinaigrette") },
];
