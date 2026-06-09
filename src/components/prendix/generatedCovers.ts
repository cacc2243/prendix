type GeneratedCoverInput = {
  id: string;
  title: string;
  category: string;
};

// Eagerly load every real, themed poster as a URL string.
const POSTER_MODULES = import.meta.glob(
  "../../assets/series/optimized-posters/*.webp",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const POSTERS: Record<string, string> = Object.fromEntries(
  Object.entries(POSTER_MODULES).map(([path, url]) => {
    const name = path.split("/").pop()!.replace(/\.webp$/, "");
    return [name, url];
  }),
);

const ALL_POSTER_NAMES = Object.keys(POSTERS).filter((n) => n !== "hero-feature");

const CATEGORY_POOLS: Record<string, string[]> = {
  "+18": [
    "quente-beijo-neon", "quente-ceo-biblioteca", "quente-cetim-verde",
    "quente-cobertura", "quente-hotel-vermelho", "quente-renda-preta",
    "noite-proibida", "amante-do-chefe", "robe-vermelho-chuva",
    "casal-neon", "escritorio-noite", "encontro-secreto",
  ],
  Desejo: [
    "amante-do-chefe", "encontro-secreto", "casal-neon", "noite-proibida",
    "robe-vermelho-chuva", "quente-cetim-verde", "minha-secretaria",
    "escritorio-noite", "chuva-de-verao", "paris-trench",
  ],
  Proibido: [
    "amor-proibido", "doutoras-proibido", "noite-proibida", "amante-do-chefe",
    "segredos-da-mansao", "encontro-secreto", "jantar-traicao",
    "casamento-tensao", "filha-do-mafioso",
  ],
  Romance: [
    "noiva-de-aluguel", "o-falso-noivo", "paixao-no-altar", "casamento-arranjado",
    "reencontro-rodoviaria", "chuva-de-verao", "pai-filho-praia",
    "padaria-mae-filha", "salva-vidas", "amigas-rooftop", "paris-trench",
  ],
  Drama: [
    "boxeadora-mae", "imperio-quebrado", "diario-da-vitima", "ultima-mentira",
    "trocadas-no-berco", "padaria-mae-filha", "cantora-arara", "noiva-janela",
    "mulher-misteriosa-neblina",
  ],
  "Vingança": [
    "vinganca-perfeita", "vinganca-de-noiva", "olho-por-olho",
    "cumplices-do-crime", "ultima-mentira", "jantar-traicao", "imperio-quebrado",
  ],
  Reviravolta: [
    "gemeas", "trocadas-no-berco", "o-falso-noivo", "codigo-do-desejo",
    "ultima-mentira", "noiva-de-aluguel", "filha-do-mafioso",
  ],
  Suspense: [
    "alguem-na-janela", "ligacao-anonima", "vizinho-perigoso", "garota-presa",
    "detetive-chuva", "mulher-misteriosa-neblina", "noiva-janela", "enfermeira-panico",
  ],
  "Mistério": [
    "mulher-misteriosa-neblina", "alguem-na-janela", "ligacao-anonima",
    "segredos-da-mansao", "detetive-chuva", "diario-da-vitima", "noiva-janela",
  ],
  Crime: [
    "detetive-chuva", "cumplices-do-crime", "olho-por-olho", "filha-do-mafioso",
    "diario-da-vitima", "ligacao-anonima", "garota-presa", "vizinho-perigoso",
  ],
  Hospital: [
    "medicos-corredor", "doutoras-proibido", "enfermeira-panico", "salva-vidas",
  ],
  "Comédia": [
    "padaria-mae-filha", "senhora-gatos", "resgate-pet", "amigas-rooftop",
    "cantora-arara", "pai-filho-praia",
  ],
};

const KEYWORD_RULES: Array<{ match: RegExp; pool: string[] }> = [
  { match: /noiv|altar|casament/i, pool: ["noiva-de-aluguel", "o-falso-noivo", "paixao-no-altar", "casamento-arranjado", "casamento-tensao", "vinganca-de-noiva", "noiva-janela"] },
  { match: /chefe|ceo|escrit[óo]rio|secret[áa]ri/i, pool: ["a-chefe", "amante-do-chefe", "escritorio-noite", "minha-secretaria", "quente-ceo-biblioteca"] },
  { match: /m[ée]dic|hospital|enferm|doutor/i, pool: ["medicos-corredor", "doutoras-proibido", "enfermeira-panico", "salva-vidas"] },
  { match: /detet|crime|investig|assassin/i, pool: ["detetive-chuva", "cumplices-do-crime", "olho-por-olho", "diario-da-vitima"] },
  { match: /m[áa]fi|herde|bilion|imp[ée]ri/i, pool: ["o-herdeiro", "filha-do-mafioso", "imperio-quebrado", "segredos-da-mansao"] },
  { match: /vingan/i, pool: ["vinganca-perfeita", "vinganca-de-noiva", "olho-por-olho"] },
  { match: /gem|troca/i, pool: ["gemeas", "trocadas-no-berco"] },
  { match: /vizinh|janela|liga[çc][ãa]o|telefon/i, pool: ["alguem-na-janela", "vizinho-perigoso", "ligacao-anonima", "noiva-janela"] },
  { match: /chuva|praia|ver[ãa]o|paris/i, pool: ["chuva-de-verao", "pai-filho-praia", "paris-trench", "robe-vermelho-chuva"] },
  { match: /motoq|moto/i, pool: ["o-motoqueiro"] },
  { match: /cantor|m[úu]sic|arara/i, pool: ["cantora-arara"] },
  { match: /padar|m[ãa]e|filh/i, pool: ["padaria-mae-filha", "boxeadora-mae", "pai-filho-praia"] },
  { match: /pet|gato|cach|c[ãa]o/i, pool: ["resgate-pet", "senhora-gatos"] },
  { match: /salva/i, pool: ["salva-vidas"] },
  { match: /jantar|trai[çc]/i, pool: ["jantar-traicao", "casamento-tensao"] },
  { match: /presa|seq[üu]es|ref[ée]m/i, pool: ["garota-presa"] },
  { match: /amig|rooftop/i, pool: ["amigas-rooftop"] },
  { match: /toque|beijo|paix|desejo|quente|sedu/i, pool: ["quente-beijo-neon", "quente-ceo-biblioteca", "quente-cetim-verde", "quente-cobertura", "quente-hotel-vermelho", "quente-renda-preta"] },
];

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickFromPool(pool: string[], seed: number): string | null {
  const valid = pool.filter((name) => POSTERS[name]);
  if (!valid.length) return null;
  return POSTERS[valid[seed % valid.length]];
}

export function makeGeneratedCover(input: GeneratedCoverInput): string {
  const seed = hashString(`${input.id}|${input.title}|${input.category}`);
  const haystack = `${input.title} ${input.id}`;

  for (const rule of KEYWORD_RULES) {
    if (rule.match.test(haystack)) {
      const url = pickFromPool(rule.pool, seed);
      if (url) return url;
    }
  }

  const categoryPool = CATEGORY_POOLS[input.category];
  if (categoryPool) {
    const url = pickFromPool(categoryPool, seed);
    if (url) return url;
  }

  return POSTERS[ALL_POSTER_NAMES[seed % ALL_POSTER_NAMES.length]];
}
