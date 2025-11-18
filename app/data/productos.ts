export type Producto = {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  precio: number;
  imagen: string;
  stock: number;
  sku: string;
  categoria: string;
};

export const productos: Producto[] = [
  {
    id: "p-001",
    nombre: "Auriculares Bluetooth Pro X",
    slug: "auriculares-bluetooth-pro-x",
    descripcion:
      "Auriculares inalámbricos con buen aislamiento y diseño cómodo para uso prolongado.",
    precio: 89000,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Headphones_%28219748761%29.jpeg",
    stock: 42,
    sku: "AUR-PROX-001",
    categoria: "ELECTRONICS_TECH",
  },
  {
    id: "p-002",
    nombre: "Zapatillas Urban Street 2.0",
    slug: "zapatillas-urban-street-2",
    descripcion:
      "Zapatillas deportivas de uso diario con buena tracción y diseño casual.",
    precio: 120000,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/-01_sneakers.jpg",
    stock: 35,
    sku: "ZAP-URB-002",
    categoria: "FASHION_ACCESSORIES",
  },
  {
    id: "p-003",
    nombre: "Set de Utensilios de Cocina (varios)",
    slug: "set-utensilios-cocina-premium",
    descripcion:
      "Colección de utensilios de cocina colgados — útil para mockups de catálogo de hogar.",
    precio: 65000,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Kitchen_utensils-01.jpg",
    stock: 20,
    sku: "KIT-COC-003",
    categoria: "HOME_GARDEN",
  },
  {
    id: "p-004",
    nombre: "Proteína Whey Vainilla 1Kg (mock)",
    slug: "proteina-whey-vainilla-1kg",
    descripcion:
      "Envase de suplemento proteico (imagen para mockups de productos de salud y nutrición).",
    precio: 98000,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/2/20/Orgain_organic_protein_powder.jpg",
    stock: 50,
    sku: "PRO-WHE-004",
    categoria: "HEALTH_BEAUTY",
  },
  {
    id: "p-005",
    nombre: "Altavoz Bluetooth Portátil SoundWave",
    slug: "altavoz-bluetooth-portatil-soundwave",
    descripcion:
      "Altavoz inalámbrico compacto con buena potencia, ideal para uso interior y exterior.",
    precio: 78000,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Bluetooth_Speaker.jpg",
    stock: 25,
    sku: "ALT-BT-005",
    categoria: "ELECTRONICS_TECH",
  },
  {
    id: "p-006",
    nombre: "Taza desechable blanca 350ml",
    slug: "taza-desechable-blanca-350ml",
    descripcion:
      "Taza desechable blanca con tapa — mockup práctico para productos de food & beverage.",
    precio: 22000,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Plain_coffee_cup.jpeg",
    stock: 60,
    sku: "TAZ-DES-006",
    categoria: "HOME_GARDEN",
  },
];
