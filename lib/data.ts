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
  kind?: "news" | "interview" | "guide";
  tags?: string[];
  editorial_priority?: number;
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
  kind: "guide",
  tags: [
    ["decoração", "casa"],
    ["alimentação", "sazonalidade"],
    ["rotina", "cuidado"],
    ["projeto", "reforma"],
  ][i],
  editorial_priority: 1,
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
const newsroomSeeds: Omit<Article, "status" | "author" | "updated_at">[] = [
  {
    id: 5,
    slug: "casa-raiz-ceramica-local",
    title: "Casa Raiz abre espaço para a cerâmica de pequenos produtores",
    excerpt:
      "A nova seleção reúne objetos do dia a dia e coloca a origem de cada peça no centro da conversa.",
    category: "Casa & decoração",
    company_id: 1,
    image: "/images/ceramica.jpg",
    kind: "news",
    tags: ["cerâmica", "decoração", "casa"],
    editorial_priority: 5,
    published_at: "2026-10-05T13:00:00.000Z",
    content: `Esta notícia é um exemplo fictício para demonstrar o portal. A Casa Raiz apresenta, neste cenário, uma seleção dedicada a peças de cerâmica produzidas em pequenos ateliês.

## O que muda na seleção
Vasos, recipientes e objetos para a mesa passam a ser apresentados ao lado de informações sobre materiais e processos. A proposta do exemplo é mostrar como uma novidade comercial pode ser contada com contexto.

## O que perguntar antes de escolher
Verifique se a peça pode entrar em contato com alimentos, quais cuidados exige e como foi produzida. Aparência artesanal não informa, por si só, a segurança ou a resistência de um objeto.

## Da novidade à descoberta
A página da empresa reúne sua proposta e o tipo de produto que oferece. Como se trata de uma demonstração, esta matéria não anuncia uma coleção disponível para compra.`,
  },
  {
    id: 6,
    slug: "mesa-aberta-menu-estacao",
    title: "Mesa Aberta apresenta um menu que acompanha a estação",
    excerpt:
      "No restaurante do exemplo, disponibilidade de ingredientes orienta novas combinações para o almoço.",
    category: "Gastronomia",
    company_id: 2,
    image: "/images/mesa-aberta.jpg",
    kind: "news",
    tags: ["alimentação", "sazonalidade", "restaurante"],
    editorial_priority: 4,
    published_at: "2026-10-05T12:30:00.000Z",
    content: `Este é um exemplo fictício de notícia de empresa. Neste cenário editorial, o Mesa Aberta renova seu menu a partir de ingredientes disponíveis na estação.

## Como nasce uma mudança no menu
A seleção leva em conta oferta, conservação e possibilidades de preparo. Menus sazonais podem variar entre regiões e não garantem, sozinhos, menor preço ou impacto ambiental.

## Informação também faz parte do serviço
Além do prato, o visitante precisa conhecer ingredientes e opções de substituição. Restrições e alergias devem ser conversadas diretamente com a equipe antes do pedido.

## O que conferir na visita
Consulte o menu atualizado, os horários e as condições de reserva. As informações desta demonstração não representam uma oferta real.`,
  },
  {
    id: 7,
    slug: "botanica-encontros-rotina",
    title: "Botânica propõe encontros sobre pausas e rotina",
    excerpt:
      "A agenda ilustrativa reúne conversas sobre descanso e escolhas possíveis no dia a dia.",
    category: "Bem-estar",
    company_id: 3,
    image: "/images/botanica.jpg",
    kind: "news",
    tags: ["rotina", "cuidado", "descanso"],
    editorial_priority: 3,
    published_at: "2026-10-04T14:00:00.000Z",
    content: `Esta agenda é fictícia e integra a demonstração da Nivelo. No exemplo, a Botânica organiza encontros para conversar sobre rotina e descanso.

## Uma conversa sem fórmulas prontas
As atividades ilustram a proposta de ouvir diferentes experiências. A intenção é tratar pausas como uma possibilidade, sem prometer benefícios universais.

## O que uma agenda precisa informar
Antes de participar de um encontro real, confira quem conduz a atividade, a acessibilidade do espaço, custos e condições de inscrição.

## Informação não substitui atendimento
Questões de saúde precisam de avaliação profissional. Os encontros desta matéria não estão abertos para inscrição e não constituem tratamento.`,
  },
  {
    id: 8,
    slug: "forma-studio-espacos-compactos",
    title: "Forma Studio volta o olhar para os espaços compactos",
    excerpt:
      "O projeto ilustrativo começa pelas necessidades da rotina antes de discutir metros quadrados e acabamentos.",
    category: "Arquitetura",
    company_id: 4,
    image: "/images/forma-studio.jpg",
    kind: "news",
    tags: ["projeto", "reforma", "espaço"],
    editorial_priority: 3,
    published_at: "2026-10-04T12:00:00.000Z",
    content: `Este é um exemplo fictício de notícia. No cenário apresentado, o Forma Studio dedica uma série de estudos a ambientes compactos.

## Entender o uso antes de desenhar
As primeiras perguntas envolvem circulação, armazenamento, iluminação e quantas pessoas usam o espaço. Soluções de projeto precisam responder à rotina, não apenas à fotografia.

## Cada imóvel tem condições próprias
Paredes, instalações e regras de condomínio podem limitar mudanças. A avaliação técnica é necessária antes de assumir que uma solução vista em outro projeto pode ser repetida.

## Um estudo é um ponto de partida
O conteúdo apresenta uma possibilidade editorial, não um serviço ou projeto anunciado pela empresa real. Conheça o perfil demonstrativo para explorar sua proposta.`,
  },
  {
    id: 9,
    slug: "escolher-ceramica-dia-a-dia",
    title: "Cerâmica para o dia a dia: o que observar além da aparência",
    excerpt:
      "Uso, manutenção e informação sobre o material ajudam a fazer uma escolha mais consciente.",
    category: "Casa & decoração",
    company_id: 1,
    image: "/images/casa-detalhes.jpg",
    kind: "guide",
    tags: ["cerâmica", "casa", "decoração"],
    editorial_priority: 0,
    published_at: "2026-10-03T14:00:00.000Z",
    content: `Uma peça de cerâmica pode ser decorativa ou ter uma função prática. Entender essa diferença é o primeiro passo antes de escolher.

## Comece pela finalidade
Para alimentos, confirme com o fabricante se a peça foi produzida para esse uso. Evite deduzir isso apenas pelo formato ou pelo acabamento.

## Conheça os cuidados
Pergunte sobre lavagem, aquecimento e armazenamento. Uma peça resistente no uso diário ainda pode exigir cuidados específicos.

## Considere o conjunto
Meça o espaço e compare dimensões. Uma escolha que combina com a sua rotina tende a ser mais útil do que uma compra feita só pela imagem.`,
  },
  {
    id: 10,
    slug: "perguntas-antes-reservar-mesa",
    title: "Quatro perguntas para fazer antes de reservar uma mesa",
    excerpt:
      "Horário, acessibilidade e restrições alimentares merecem entrar na conversa antes do encontro.",
    category: "Gastronomia",
    company_id: 2,
    image: "/images/mesa-aberta.jpg",
    kind: "guide",
    tags: ["restaurante", "alimentação", "reserva"],
    editorial_priority: 0,
    published_at: "2026-10-03T12:00:00.000Z",
    content: `Uma reserva funciona melhor quando as condições do encontro são conhecidas. Perguntas simples podem evitar desencontros.

## Existe tolerância para atrasos?
Confirme o horário e as regras de chegada. Alguns espaços trabalham com mais de um serviço por noite.

## Como são tratadas as restrições alimentares?
Informe alergias e pergunte sobre ingredientes e preparo. Uma opção vegetariana não significa ausência de todos os alérgenos.

## O espaço é acessível?
Pergunte sobre entrada, circulação e banheiros de acordo com as necessidades do grupo.

## Há condições para grupos?
Consulte limites, cobrança antecipada e cancelamento. As regras precisam estar claras antes de confirmar.`,
  },
  {
    id: 11,
    slug: "conversa-sobre-descanso",
    title: "Descanso não precisa virar mais uma meta",
    excerpt:
      "Uma conversa ilustrativa sobre o cuidado que cabe na vida real, sem receitas universais.",
    category: "Bem-estar",
    company_id: 3,
    image: "/images/botanica.jpg",
    kind: "interview",
    tags: ["rotina", "cuidado", "descanso"],
    editorial_priority: 0,
    published_at: "2026-10-02T14:00:00.000Z",
    content: `Esta conversa é uma simulação editorial, escrita para demonstrar o formato de entrevista. As respostas não foram coletadas de uma pessoa real e não constituem orientação clínica.

## Por que começar pela rotina?
Porque práticas de cuidado precisam considerar tempo, recursos e responsabilidades. Um conselho genérico pode não fazer sentido para uma pessoa específica.

## Toda pausa precisa ser produtiva?
Não. Tratar o descanso como uma nova obrigação pode tornar a experiência menos acolhedora. Observar o próprio ritmo pode ser um começo mais possível.

## Quando uma conversa não é suficiente?
Cansaço persistente, dor e sofrimento merecem atenção profissional. Conteúdo editorial não substitui avaliação de saúde.`,
  },
  {
    id: 12,
    slug: "ouvir-antes-projetar",
    title: "Antes do desenho, a escuta: como começa um projeto",
    excerpt:
      "Na conversa demonstrativa com o universo do Forma Studio, o ponto de partida é a vida de quem vai usar o espaço.",
    category: "Arquitetura",
    company_id: 4,
    image: "/images/forma-studio.jpg",
    kind: "interview",
    tags: ["projeto", "reforma", "espaço"],
    editorial_priority: 0,
    published_at: "2026-10-02T12:00:00.000Z",
    content: `Esta entrevista é fictícia. O formato foi criado para mostrar como a Nivelo pode apresentar a maneira de pensar de uma empresa, sem atribuir declarações a pessoas reais.

## Qual é a primeira pergunta de um projeto?
Como o espaço é usado hoje e o que precisa mudar. Uma boa conversa ajuda a identificar prioridades antes de discutir estilo.

## Onde entra o orçamento?
Desde o início. Conhecer limites ajuda a escolher materiais, etapas e soluções compatíveis com o projeto.

## O que o visitante deve levar para a primeira conversa?
Medidas disponíveis, referências e uma lista de dificuldades da rotina podem ajudar. A documentação necessária varia de acordo com o imóvel e o serviço.`,
  },
];
articleData.push(
  ...newsroomSeeds.map((a) => ({
    ...a,
    status: "published",
    author: "Redação Nivelo",
    updated_at: a.published_at,
  })),
);
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
