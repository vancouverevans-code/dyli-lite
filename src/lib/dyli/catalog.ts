export const CAP = 8;

export type Item = {
  id: number;
  name: string;
  kind: string;
  line: string;
  image: string;
};

export const ITEMS: Item[] = [
  {
    id: 1,
    name: "Night Market Rookie",
    kind: "Card",
    line: "Foil sleeve. A rook and a lantern.",
    image: "/collectibles/01.jpg",
  },
  {
    id: 2,
    name: "Brass Guardian",
    kind: "Figure",
    line: "Small brass. Stays on the desk until you ship it.",
    image: "/collectibles/02.jpg",
  },
  {
    id: 3,
    name: "Clay Stamp",
    kind: "Stamp",
    line: "Terracotta seal with a blank face.",
    image: "/collectibles/03.jpg",
  },
  {
    id: 4,
    name: "Paper Plane Patch",
    kind: "Patch",
    line: "Linen ground, ink thread.",
    image: "/collectibles/04.jpg",
  },
  {
    id: 5,
    name: "Ink Wyrm",
    kind: "Pin",
    line: "Black enamel, gold rim.",
    image: "/collectibles/05.jpg",
  },
  {
    id: 6,
    name: "Vault Key",
    kind: "Charm",
    line: "Brass key on a short chain.",
    image: "/collectibles/06.jpg",
  },
  {
    id: 7,
    name: "Signal Collar",
    kind: "Textile",
    line: "Black fold, gold along the collar.",
    image: "/collectibles/07.jpg",
  },
  {
    id: 8,
    name: "Orbit Marble",
    kind: "Glass",
    line: "Amber swirl sitting in a tin.",
    image: "/collectibles/08.jpg",
  },
];
