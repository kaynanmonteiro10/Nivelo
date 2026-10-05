export type Company = {
  id: number;
  slug: string;
  name: string;
  category: string;
  city: string;
  neighborhood: string;
  tagline: string;
  description: string;
  offerings: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  gallery: string;
  status: string;
};
export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  company_id: number;
  image: string;
  author: string;
  status: string;
  published_at: string;
  updated_at: string;
};
const photos: Record<string, string> = {
  "photo-1600210492486-724fe5c67fb0": "/images/casa-raiz.jpg",
  "photo-1616486338812-3dadae4b4ace": "/images/casa-detalhes.jpg",
  "photo-1494438639946-1ebd1d20bf85": "/images/ceramica.jpg",
  "photo-1414235077428-338989a2e8c0": "/images/mesa-aberta.jpg",
  "photo-1540555700478-4be289fbecef": "/images/botanica.jpg",
  "photo-1600607687920-4e2a09cf159d": "/images/forma-studio.jpg",
};
const photo = (id: string) => photos[id] || "/placeholder.svg";
const companySeeds = [
  [
    "casa-raiz",
    "Casa Raiz",
    "Casa & decoração",
    "São Paulo",
    "Pinheiros",
    "Objetos com história. Espaços com alma.",
    "Uma loja que acredita que morar bem começa nas pequenas escolhas. A Casa Raiz reúne móveis, cerâmicas e objetos feitos por produtores independentes, com atenção à origem dos materiais e ao tempo de cada criação.\n\nAqui, você encontra uma curadoria para a casa real: aquela que muda, acolhe e conta um pouco de quem vive nela.",
    "Móveis de madeira\nCerâmica artesanal\nObjetos de decoração\nCuradoria para ambientes",
    "Pinheiros, São Paulo — endereço demonstrativo",
    "Segunda a sexta, 10h às 19h\nSábado, 10h às 16h",
    "",
    "",
    "",
    photo("photo-1600210492486-724fe5c67fb0"),
    photo("photo-1616486338812-3dadae4b4ace") +
      "\n" +
      photo("photo-1494438639946-1ebd1d20bf85"),
    "published",
  ],
  [
    "mesa-aberta",
    "Mesa Aberta",
    "Gastronomia",
    "São Paulo",
    "Vila Madalena",
    "Comida da estação, encontros de todos os dias.",
    "Um restaurante de bairro com uma cozinha que acompanha as estações. O menu valoriza ingredientes frescos e receitas que convidam a sentar sem pressa.\n\nDo almoço durante a semana ao encontro de sábado, a proposta é a mesma: boa comida e uma mesa que acolhe.",
    "Almoço à la carte\nOpções vegetarianas\nCafé e sobremesas\nReservas para pequenos grupos",
    "Vila Madalena, São Paulo — endereço demonstrativo",
    "Terça a domingo, 12h às 22h",
    "",
    "",
    "",
    photo("photo-1414235077428-338989a2e8c0"),
    "",
    "published",
  ],
  [
    "botanica",
    "Botânica",
    "Bem-estar",
    "São Paulo",
    "Jardins",
    "Cuidado que começa pela escuta.",
    "Um espaço de cuidado dedicado a uma rotina mais equilibrada. A equipe da Botânica trabalha com orientação individual e práticas de bem-estar, respeitando o contexto e as necessidades de cada pessoa.",
    "Práticas de bem-estar\nOrientação individual\nOficinas e encontros",
    "Jardins, São Paulo — endereço demonstrativo",
    "Segunda a sexta, 9h às 18h",
    "",
    "",
    "",
    photo("photo-1540555700478-4be289fbecef"),
    "",
    "published",
  ],
  [
    "forma-studio",
    "Forma Studio",
    "Arquitetura",
    "São Paulo",
    "Vila Mariana",
    "Projetos para o jeito que você vive.",
    "Um escritório de arquitetura que aproxima boas ideias da vida cotidiana. Os projetos partem da escuta para criar espaços funcionais, com personalidade e escolhas conscientes.",
    "Projetos residenciais\nInteriores\nConsultoria de ambientes",
    "Vila Mariana, São Paulo — endereço demonstrativo",
    "Segunda a sexta, 9h às 18h",
    "",
    "",
    "",
    photo("photo-1600607687920-4e2a09cf159d"),
    "",
    "published",
  ],
];

const articleSeeds = [
  [
    "uma-casa-com-a-sua-historia",
    "O que faz uma casa ter a sua cara?",
    "Entre escolhas afetivas e materiais naturais, um olhar para os espaços que construímos ao longo do tempo.",
    "Casa & decoração",
    `Uma casa ganha personalidade aos poucos. Um objeto trazido de viagem, uma cadeira herdada, a luz que entra pela janela: nem sempre é preciso começar de novo para transformar um ambiente.\n\n## Comece pelo que já faz parte da sua vida\nAntes de comprar, observe. Quais objetos você usa todos os dias? Quais têm significado? Organizar essas peças pode revelar uma direção mais pessoal do que seguir uma tendência.\n\n## Materiais que envelhecem bem\nMadeira, linho e cerâmica podem mudar com o uso. Ao escolher uma peça, pergunte sobre a origem, os cuidados de manutenção e a possibilidade de reparo. A durabilidade depende tanto do material quanto de como ele foi produzido.\n\n## Pense no uso, além da imagem\nMeça o espaço e a circulação antes de comprar móveis. Observe a luz em diferentes horários. Uma escolha bonita precisa também fazer sentido para a rotina de quem mora ali.\n\n## Um ambiente não precisa ficar pronto de uma vez\nExperimente mudar a posição dos móveis e viver com o resultado antes de acrescentar novas peças. Construir aos poucos ajuda a entender o que realmente falta.`,
    1,
    photo("photo-1600210492486-724fe5c67fb0"),
  ],
  [
    "comer-bem-na-estacao",
    "Comer na estação: por que olhar para o calendário antes do cardápio",
    "Sabor, variedade e escolhas mais conscientes começam com uma pergunta simples: o que está na época?",
    "Gastronomia",
    `A oferta de frutas e verduras muda ao longo do ano e de região para região. Conhecer esse movimento ajuda a variar a alimentação e descobrir sabores.\n\n## Observe a feira\nConverse com quem vende e compare a oferta entre as semanas. Um ingrediente abundante costuma chegar mais fresco, mas preço e qualidade também dependem do clima e do transporte.\n\n## Deixe espaço para substituições\nUma receita pode aceitar diferentes legumes. Manter uma base e trocar os ingredientes conforme a disponibilidade ajuda a evitar desperdício e tornar a cozinha mais flexível.\n\n## Pergunte sobre o menu\nEm restaurantes, menus sazonais podem ser uma oportunidade de conhecer novos ingredientes. Pergunte à equipe sobre a composição e informe alergias ou restrições antes de fazer o pedido.`,
    2,
    photo("photo-1414235077428-338989a2e8c0"),
  ],
  [
    "pausas-no-cotidiano",
    "Pequenas pausas, outra relação com a rotina",
    "Ideias simples para abrir espaço para o descanso, sem transformar o bem-estar em mais uma obrigação.",
    "Bem-estar",
    `Descansar nem sempre exige uma grande mudança. Pequenos intervalos podem ajudar a perceber como o corpo e a atenção respondem ao ritmo do dia.\n\n## Um intervalo possível\nEscolha um momento realista para se afastar da tela e mudar de posição. Não existe uma duração ideal para todas as pessoas. Ajuste a pausa à sua rotina.\n\n## Menos metas, mais percepção\nUma caminhada curta ou alguns minutos em silêncio podem ser experiências úteis. Observe como você se sente, sem tratar essas práticas como uma promessa de resultado.\n\n## Quando procurar ajuda\nCansaço persistente, dor ou sofrimento emocional merecem avaliação profissional. Este conteúdo é informativo e não substitui orientação de saúde.`,
    3,
    photo("photo-1540555700478-4be289fbecef"),
  ],
  [
    "antes-de-reformar",
    "Antes de reformar, faça estas perguntas",
    "Uma boa reforma começa muito antes da obra: necessidades, orçamento e prioridades entram na conversa.",
    "Arquitetura",
    `Reformar envolve decisões conectadas. Definir o que precisa mudar antes de escolher acabamentos pode evitar retrabalho e ajudar a organizar o orçamento.\n\n## O que não funciona hoje?\nListe problemas concretos: falta de armazenamento, iluminação insuficiente ou circulação difícil. Essa lista ajuda a separar necessidades de desejos.\n\n## Qual é o orçamento completo?\nConsidere projeto, mão de obra, materiais e possíveis imprevistos. Peça propostas detalhadas e esclareça o que está incluído.\n\n## Há mudanças estruturais?\nAlterações em paredes, instalações e áreas molhadas precisam de avaliação técnica. Verifique regras do condomínio e responsabilidades profissionais antes de iniciar.`,
    4,
    photo("photo-1600607687920-4e2a09cf159d"),
  ],
];

const companyData: Company[] = companySeeds.map(
  (seed, i) =>
    Object.fromEntries([
      ["id", i + 1],
      ...[
        "slug",
        "name",
        "category",
        "city",
        "neighborhood",
        "tagline",
        "description",
        "offerings",
        "address",
        "hours",
        "phone",
        "email",
        "website",
        "image",
        "gallery",
        "status",
      ].map((key, j) => [key, seed[j]]),
    ]) as Company,
);
const articleData: Article[] = articleSeeds.map((a, i) => ({
  id: i + 1,
  slug: a[0] as string,
  title: a[1] as string,
  excerpt: a[2] as string,
  category: a[3] as string,
  content: a[4] as string,
  company_id: a[5] as number,
  image: a[6] as string,
  author: "Redação Nivelo",
  status: "published",
  published_at: `2026-10-0${5 - i}T12:00:00.000Z`,
  updated_at: `2026-10-0${5 - i}T12:00:00.000Z`,
}));
export function companies(_includeDrafts = false) {
  return companyData;
}
export function articles(_includeDrafts = false) {
  return articleData;
}
export function companyBySlug(slug: string) {
  return companyData.find((c) => c.slug === slug);
}
export function articleBySlug(slug: string) {
  return articleData.find((a) => a.slug === slug);
}
