import type { ImageAttribution, Recipe, RecipeSource } from "../types";

const accessedAt = "2026-07-13";

const source = (title: string, publisher: string, url: string): RecipeSource => ({
  title,
  publisher,
  url,
  accessedAt,
  supports: ["ingredientes", "preparo"]
});

const image = (
  author: string,
  title: string,
  sourceUrl: string,
  license: string,
  licenseUrl: string,
  transformations = "Recorte central, redimensionamento para 480 e 960 px e conversão para WebP."
): ImageAttribution => ({
  author,
  title,
  sourceUrl,
  license,
  licenseUrl,
  transformations
});

export const recipes: Recipe[] = [
  {
    id: "r01",
    slug: "feijoada",
    name: "Feijoada",
    category: "Pratos principais",
    summary: "Feijão-preto cozido lentamente com cortes suínos e temperos aromáticos.",
    timeMinutes: 240,
    servings: 16,
    servingLabel: "porções",
    difficulty: "Avançada",
    ingredients: [
      "1 kg de feijão-preto",
      "800 g de carne-seca em pedaços",
      "1,1 kg de costela suína salgada em ripas",
      "600 g de lombo suíno salgado em cubos",
      "500 g de paio",
      "3 cebolas picadas",
      "5 dentes de alho picados",
      "¼ de xícara de azeite",
      "3 folhas de louro",
      "1 colher (chá) de cominho"
    ],
    steps: [
      "Na véspera, cubra as carnes salgadas com água e deixe na geladeira por 24 horas, trocando a água pelo menos quatro vezes.",
      "Escorra e cozinhe a carne-seca, a costela e o lombo separadamente até começarem a amaciar. Descarte a água e reserve.",
      "Em uma panela grande, aqueça o azeite e refogue a cebola e o alho. Junte o feijão lavado, o louro e o cominho.",
      "Cubra com água, acrescente a carne-seca e a costela e cozinhe em fogo baixo por cerca de 2 horas, completando a água quando necessário.",
      "Adicione o lombo e o paio inteiro e cozinhe por mais 1 hora. Fatie o paio, devolva à panela e apure até o caldo ficar encorpado."
    ],
    tags: ["Cozimento lento", "Para compartilhar"],
    image: {
      basePath: "images/feijoada",
      width: 960,
      height: 720,
      attribution: image(
        "Wilfredor",
        "Feijoada à brasileira 3",
        "https://commons.wikimedia.org/wiki/File:Feijoada_%C3%A0_brasileira_3.jpg",
        "CC0 1.0",
        "https://creativecommons.org/publicdomain/zero/1.0/"
      )
    },
    sources: [source("Feijoada", "Panelinha", "https://panelinha.com.br/receita/feijoada")]
  },
  {
    id: "r02",
    slug: "coxinha",
    name: "Coxinha de frango",
    category: "Salgados",
    summary: "Massa macia, recheio de frango bem temperado e casquinha dourada.",
    timeMinutes: 120,
    servings: 24,
    servingLabel: "unidades",
    difficulty: "Avançada",
    ingredients: [
      "500 g de peito de frango",
      "1 litro de água",
      "1 cebola picada",
      "2 dentes de alho picados",
      "2 colheres (sopa) de azeite",
      "2 colheres (sopa) de extrato de tomate",
      "½ xícara de cheiro-verde picado",
      "200 g de requeijão cremoso",
      "3 xícaras de farinha de trigo",
      "2 colheres (sopa) de manteiga",
      "2 ovos batidos",
      "2 xícaras de farinha de rosca",
      "Óleo para fritar e sal a gosto"
    ],
    steps: [
      "Cozinhe o frango na água com sal. Reserve 750 ml do caldo, deixe a carne amornar e desfie.",
      "Refogue metade da cebola e do alho no azeite. Junte o extrato, o frango e o cheiro-verde; ajuste o sal e deixe esfriar.",
      "Leve o caldo reservado ao fogo com a manteiga e o restante da cebola e do alho. Quando ferver, acrescente a farinha de uma vez e mexa até a massa se soltar da panela.",
      "Sove a massa ainda morna até ficar lisa. Divida, abra cada porção, coloque frango e um pouco de requeijão e modele em formato de gota.",
      "Passe as coxinhas no ovo e na farinha de rosca. Frite por etapas em óleo a 170 °C e escorra sobre uma grade ou papel absorvente."
    ],
    tags: ["Fritura", "Para compartilhar"],
    image: {
      basePath: "images/coxinha",
      width: 960,
      height: 720,
      attribution: image(
        "Thomas Locke Hobbs",
        "Coxinhas!!!",
        "https://www.flickr.com/photos/thomashobbs/347193328/",
        "CC BY-SA 2.0",
        "https://creativecommons.org/licenses/by-sa/2.0/"
      )
    },
    sources: [
      source(
        "Coxinha",
        "Receitas Globo",
        "https://receitas.globo.com/receitas-da-tv/bem-juntinhos/coxinha-gnt.ghtml"
      )
    ]
  },
  {
    id: "r03",
    slug: "pao-de-queijo",
    name: "Pão de queijo",
    category: "Salgados",
    summary: "Porções assadas de polvilho com casca firme, miolo elástico e queijo curado.",
    timeMinutes: 60,
    servings: 18,
    servingLabel: "unidades",
    difficulty: "Média",
    ingredients: [
      "2 xícaras de polvilho azedo",
      "1 xícara de polvilho doce",
      "1½ xícara de queijo meia-cura ralado fino",
      "3 ovos",
      "1½ xícara de água",
      "¼ de xícara de óleo",
      "1 colher (chá) de sal"
    ],
    steps: [
      "Aqueça o forno a 200 °C. Misture os dois tipos de polvilho com o sal em uma tigela grande.",
      "Ferva a água com o óleo e despeje sobre os polvilhos. Misture com uma colher e espere amornar.",
      "Acrescente o queijo e os ovos, um por vez, misturando até obter uma massa pegajosa e uniforme.",
      "Com as mãos untadas, modele porções do tamanho de uma bola de pingue-pongue e distribua em assadeira, deixando espaço entre elas.",
      "Asse por cerca de 30 minutos, até os pães crescerem e ficarem dourados."
    ],
    tags: ["Assado", "Lanche"],
    image: {
      basePath: "images/pao-de-queijo",
      width: 960,
      height: 720,
      attribution: image(
        "Joy",
        "Pão de Queijo (Brazilian Cheese Bread)",
        "https://commons.wikimedia.org/wiki/File:P%C3%A3o_de_Queijo_(Brazilian_Cheese_Bread).jpg",
        "CC BY 2.0",
        "https://creativecommons.org/licenses/by/2.0/"
      )
    },
    sources: [
      source("Pão de queijo", "Panelinha", "https://panelinha.com.br/receita/pao-de-queijo")
    ]
  },
  {
    id: "r04",
    slug: "brigadeiro",
    name: "Brigadeiro",
    category: "Doces",
    summary: "Docinho de chocolate cozido até o ponto de enrolar e coberto com confeitos.",
    timeMinutes: 50,
    servings: 30,
    servingLabel: "unidades",
    difficulty: "Fácil",
    ingredients: [
      "1 lata de leite condensado (395 g)",
      "⅔ de xícara de leite",
      "1 colher (sopa) de manteiga",
      "3 colheres (sopa) de cacau em pó",
      "¾ de xícara de granulado ou nibs de cacau",
      "Manteiga para untar as mãos"
    ],
    steps: [
      "Misture o leite condensado, o leite, a manteiga e o cacau em uma panela média antes de levar ao fogo.",
      "Cozinhe em fogo médio, mexendo sempre. Depois que ferver, continue por cerca de 15 minutos, até a massa se desprender do fundo.",
      "Transfira para um prato untado e deixe esfriar completamente.",
      "Unte as mãos, faça pequenas bolas e passe no granulado ou nos nibs."
    ],
    tags: ["Festa", "Para compartilhar"],
    image: {
      basePath: "images/brigadeiro",
      width: 960,
      height: 720,
      attribution: image(
        "Mayra Chiachia (Maych)",
        "Brigadeiro",
        "https://commons.wikimedia.org/wiki/File:Brigadeiro.jpg",
        "CC BY-SA 2.0",
        "https://creativecommons.org/licenses/by-sa/2.0/"
      )
    },
    sources: [source("Brigadeiro", "Panelinha", "https://panelinha.com.br/receita/brigadeiro")]
  },
  {
    id: "r05",
    slug: "moqueca-baiana",
    name: "Moqueca baiana",
    category: "Pratos principais",
    summary: "Peixe cozido entre camadas de legumes, leite de coco e azeite de dendê.",
    timeMinutes: 85,
    servings: 6,
    servingLabel: "porções",
    difficulty: "Média",
    ingredients: [
      "6 postas de peixe firme",
      "3 limões",
      "3 dentes de alho picados",
      "3 cebolas em rodelas",
      "3 tomates em rodelas",
      "2 pimentões em rodelas",
      "½ xícara de coentro picado",
      "200 g de coco fresco ralado",
      "2 xícaras de água morna",
      "½ xícara de azeite",
      "½ xícara de azeite de dendê",
      "Sal e pimenta a gosto"
    ],
    steps: [
      "Tempere o peixe com suco de limão, alho e sal e deixe descansar por 20 minutos.",
      "Bata o coco com a água morna e coe em pano limpo, apertando bem para extrair o leite.",
      "Em uma panela larga, faça camadas com cebola, tomate, pimentão, peixe e coentro. Regue com o azeite e o dendê.",
      "Tampe e cozinhe em fogo baixo por cerca de 40 minutos, movimentando a panela pelas alças de vez em quando, sem mexer as postas.",
      "Junte o leite de coco e cozinhe por mais 2 minutos. Ajuste o sal e sirva."
    ],
    tags: ["Peixe", "Panela única"],
    image: {
      basePath: "images/moqueca-baiana",
      width: 960,
      height: 720,
      attribution: image(
        "Gabriel David R. Botelho",
        "Moqueca de peixe",
        "https://commons.wikimedia.org/wiki/File:Moqueca_de_peixe.jpg",
        "CC BY-SA 4.0",
        "https://creativecommons.org/licenses/by-sa/4.0/"
      )
    },
    sources: [
      source(
        "Moqueca baiana com leite de coco caseiro",
        "Panelinha",
        "https://panelinha.com.br/receita/moqueca-baiana-com-leite-de-coco-caseiro"
      )
    ]
  },
  {
    id: "r06",
    slug: "baiao-de-dois",
    name: "Baião de dois",
    category: "Pratos principais",
    summary: "Arroz e feijão-fradinho reunidos com carne-seca, bacon e queijo coalho.",
    timeMinutes: 180,
    servings: 6,
    servingLabel: "porções",
    difficulty: "Avançada",
    ingredients: [
      "500 g de carne-seca dessalgada",
      "1 xícara de feijão-fradinho",
      "1 xícara de arroz",
      "100 g de bacon em cubos",
      "200 g de queijo coalho em cubos",
      "½ cebola picada",
      "2 dentes de alho picados",
      "2 folhas de louro",
      "1 colher (sopa) de manteiga de garrafa",
      "Coentro e cebolinha picados",
      "Sal a gosto"
    ],
    steps: [
      "Cozinhe a carne-seca dessalgada até ficar macia. Reserve parte do caldo, desfie a carne e descarte o excesso de gordura.",
      "Cozinhe o feijão-fradinho com o louro até ficar macio, mas ainda inteiro. Escorra e reserve.",
      "Doure o bacon em uma panela larga. Junte cebola, alho e carne-seca e refogue bem.",
      "Acrescente o arroz, o feijão e 2 xícaras do caldo reservado. Cozinhe em fogo baixo até o arroz ficar macio.",
      "Desligue o fogo, misture a manteiga de garrafa, o queijo coalho, o coentro e a cebolinha. Tampe por 5 minutos antes de servir."
    ],
    tags: ["Panela única", "Para compartilhar"],
    image: {
      basePath: "images/baiao-de-dois",
      width: 960,
      height: 720,
      attribution: image(
        "Zé Carlos Barretta",
        "Baião de dois",
        "https://commons.wikimedia.org/wiki/File:Bai%C3%A3o_de_dois.jpg",
        "CC BY 2.0",
        "https://creativecommons.org/licenses/by/2.0/"
      )
    },
    sources: [
      source("Baião de dois", "Panelinha", "https://panelinha.com.br/receita/baiao-de-dois")
    ]
  },
  {
    id: "r07",
    slug: "pudim-de-leite",
    name: "Pudim de leite",
    category: "Doces",
    summary: "Pudim liso, assado em banho-maria e servido com calda de caramelo.",
    timeMinutes: 300,
    servings: 12,
    servingLabel: "porções",
    difficulty: "Média",
    ingredients: [
      "1 xícara de açúcar para o caramelo",
      "2 latas de leite condensado",
      "2½ xícaras de leite",
      "4 ovos"
    ],
    steps: [
      "Derreta o açúcar em fogo baixo até formar um caramelo âmbar. Espalhe no fundo e nas laterais de uma forma com furo central.",
      "Misture o leite condensado, o leite e os ovos delicadamente, evitando incorporar ar. Passe por uma peneira.",
      "Despeje na forma, cubra com papel-alumínio e coloque dentro de uma assadeira com água quente.",
      "Asse a 160 °C por cerca de 1 hora e 30 minutos, até as bordas firmarem e o centro ainda balançar levemente.",
      "Deixe esfriar e leve à geladeira por pelo menos 3 horas. Solte as bordas e desenforme sobre um prato."
    ],
    tags: ["Sobremesa", "Gelado"],
    image: {
      basePath: "images/pudim-de-leite",
      width: 960,
      height: 720,
      attribution: image(
        "Marcelo Träsel",
        "Pudim de leite (3544235183)",
        "https://commons.wikimedia.org/wiki/File:Pudim_de_leite_(3544235183).jpg",
        "CC BY-SA 2.0",
        "https://creativecommons.org/licenses/by-sa/2.0/"
      )
    },
    sources: [
      source(
        "Pudim de leite liso",
        "Panelinha",
        "https://panelinha.com.br/receita/pudim-de-leite-liso"
      )
    ]
  },
  {
    id: "r08",
    slug: "bolo-de-cenoura",
    name: "Bolo de cenoura",
    category: "Bolos",
    summary: "Massa macia de cenoura com cobertura fina e quebradiça de chocolate.",
    timeMinutes: 70,
    servings: 12,
    servingLabel: "porções",
    difficulty: "Média",
    ingredients: [
      "3 cenouras médias descascadas e fatiadas (cerca de 360 g)",
      "4 ovos",
      "1 xícara de óleo",
      "1½ xícara de açúcar",
      "2 xícaras de farinha de trigo",
      "1 colher (sopa) de fermento químico",
      "1 pitada de sal",
      "½ xícara de chocolate em pó",
      "⅓ de xícara de açúcar para a cobertura",
      "1 colher (sopa) de manteiga",
      "⅓ de xícara de água"
    ],
    steps: [
      "Aqueça o forno a 180 °C e unte uma forma retangular média com manteiga e farinha.",
      "Bata no liquidificador a cenoura, os ovos, o óleo e o açúcar até obter uma mistura lisa.",
      "Transfira para uma tigela e incorpore a farinha, o sal e o fermento sem bater em excesso.",
      "Asse por cerca de 45 minutos. Espete um palito no centro; ele deve sair limpo.",
      "Para a cobertura, ferva o chocolate, o açúcar, a manteiga e a água por 2 minutos. Mexa fora do fogo até engrossar levemente e espalhe sobre o bolo morno."
    ],
    tags: ["Assado", "Café da tarde"],
    image: {
      basePath: "images/bolo-de-cenoura",
      width: 960,
      height: 720,
      attribution: image(
        "SantaRosa OLD SKOOL",
        "DSCF3115.aJPG",
        "https://www.flickr.com/photos/93087247@N00/2811983350",
        "CC BY 2.0",
        "https://creativecommons.org/licenses/by/2.0/"
      )
    },
    sources: [
      source(
        "Bolo de cenoura com cobertura de chocolate",
        "Panelinha",
        "https://panelinha.com.br/receita/bolo-de-cenoura-com-cobertura-de-chocolate"
      )
    ]
  },
  {
    id: "r09",
    slug: "arroz-carreteiro",
    name: "Arroz carreteiro",
    category: "Pratos principais",
    summary: "Arroz saboroso preparado com carne-seca, linguiça e bacon em uma só panela.",
    timeMinutes: 50,
    servings: 6,
    servingLabel: "porções",
    difficulty: "Fácil",
    ingredients: [
      "2 xícaras de arroz",
      "4 xícaras de água",
      "100 g de carne-seca dessalgada, cozida e desfiada",
      "250 g de linguiça calabresa em meias-luas",
      "70 g de bacon em cubos",
      "½ cebola picada",
      "2 dentes de alho picados",
      "2 folhas de louro",
      "2 colheres (sopa) de óleo",
      "½ xícara de salsinha picada",
      "Pimenta-do-reino e sal a gosto"
    ],
    steps: [
      "Aqueça uma panela larga e doure o bacon e a linguiça no óleo. Junte a carne-seca e refogue por mais alguns minutos.",
      "Acrescente a cebola, o alho e o louro e cozinhe até os temperos ficarem macios.",
      "Adicione o arroz e misture por 1 minuto para envolver os grãos na gordura do refogado.",
      "Junte a água, ajuste o sal e cozinhe em fogo baixo, com a tampa entreaberta, por cerca de 20 minutos.",
      "Desligue, tampe por 5 minutos e solte o arroz com um garfo. Finalize com salsinha e pimenta."
    ],
    tags: ["Panela única", "Rápido"],
    image: {
      basePath: "images/arroz-carreteiro",
      width: 960,
      height: 720,
      attribution: image(
        "Cesar Vieira",
        "Arroz carreteiro",
        "https://commons.wikimedia.org/wiki/File:Arroz_carreteiro.jpg",
        "CC BY-SA 4.0",
        "https://creativecommons.org/licenses/by-sa/4.0/"
      )
    },
    sources: [
      source("Arroz carreteiro", "Panelinha", "https://panelinha.com.br/receita/arroz-carreteiro")
    ]
  },
  {
    id: "r10",
    slug: "bolinho-de-chuva",
    name: "Bolinho de chuva",
    category: "Doces",
    summary: "Bolinhos fritos de massa leve, finalizados com açúcar e canela.",
    timeMinutes: 40,
    servings: 50,
    servingLabel: "unidades",
    difficulty: "Fácil",
    ingredients: [
      "2 ovos",
      "¾ de xícara de açúcar",
      "2 colheres (sopa) de manteiga",
      "1 pitada de sal",
      "1 xícara de leite",
      "2 xícaras de farinha de trigo",
      "1 colher (sopa) de fermento químico",
      "Óleo para fritar",
      "½ xícara de açúcar e 1 colher (chá) de canela para finalizar"
    ],
    steps: [
      "Misture os ovos, o açúcar, a manteiga e o sal. Junte o leite aos poucos.",
      "Acrescente a farinha e mexa até a massa ficar lisa. Por último, incorpore o fermento.",
      "Aqueça o óleo a 170 °C. Com duas colheres, solte pequenas porções de massa no óleo, sem encher a panela.",
      "Frite até os bolinhos crescerem e dourarem por igual. Escorra sobre papel absorvente.",
      "Ainda mornos, passe os bolinhos na mistura de açúcar e canela."
    ],
    tags: ["Fritura", "Café da tarde"],
    image: {
      basePath: "images/bolinho-de-chuva",
      width: 960,
      height: 720,
      attribution: image(
        "Carlos Rabelo",
        "Bolinho de Chuva",
        "https://www.flickr.com/photos/73304772@N04/19837637871",
        "CC BY-SA 2.0",
        "https://creativecommons.org/licenses/by-sa/2.0/"
      )
    },
    sources: [
      source("Bolinho de chuva", "Panelinha", "https://panelinha.com.br/receita/bolinho-de-chuva")
    ]
  },
  {
    id: "r11",
    slug: "canjica-cremosa",
    name: "Canjica cremosa",
    category: "Doces",
    summary: "Milho-branco cozido com leites, coco e especiarias até ficar cremoso.",
    timeMinutes: 180,
    servings: 20,
    servingLabel: "porções",
    difficulty: "Média",
    ingredients: [
      "500 g de milho para canjica",
      "Água para deixar de molho e cozinhar",
      "½ xícara de açúcar",
      "1 litro de leite",
      "1 lata de leite condensado (395 g)",
      "500 ml de leite de coco",
      "1 xícara de coco ralado",
      "1 canela em rama",
      "4 cravos-da-índia",
      "Canela em pó para servir"
    ],
    steps: [
      "Cubra a canjica com bastante água e deixe de molho na geladeira por pelo menos 8 horas.",
      "Escorra, coloque na panela de pressão com água nova, a canela e os cravos e cozinhe por 30 minutos após pegar pressão.",
      "Espere a pressão sair, abra a panela e verifique se os grãos estão macios. Acrescente mais água e cozinhe novamente, se necessário.",
      "Junte o açúcar, o leite, o leite condensado, o leite de coco e o coco ralado. Cozinhe sem pressão, mexendo, até engrossar.",
      "Retire as especiarias, deixe amornar e sirva com canela em pó."
    ],
    tags: ["Festa", "Para compartilhar"],
    image: {
      basePath: "images/canjica-cremosa",
      width: 960,
      height: 720,
      attribution: image(
        "Melsj",
        "Canjica com amendoim",
        "https://commons.wikimedia.org/wiki/File:Canjica_com_amendoim.jpg",
        "CC BY-SA 4.0",
        "https://creativecommons.org/licenses/by-sa/4.0/"
      )
    },
    sources: [
      source(
        "Canjica doce",
        "Receitas Globo",
        "https://receitas.globo.com/tipos-de-prato/doces-e-sobremesas/canjica-doce-53787279-958d-4765-bd25-2b79a33471ee.ghtml"
      )
    ]
  },
  {
    id: "r12",
    slug: "quindim",
    name: "Quindim",
    category: "Doces",
    summary: "Doce assado de gemas e coco, com superfície brilhante e base dourada.",
    timeMinutes: 210,
    servings: 10,
    servingLabel: "porções",
    difficulty: "Avançada",
    ingredients: [
      "15 gemas",
      "100 g de coco fresco ralado",
      "1½ xícara de açúcar",
      "3 colheres (sopa) de manteiga derretida",
      "Manteiga e açúcar para preparar a forma"
    ],
    steps: [
      "Misture o coco, o açúcar e a manteiga derretida e deixe descansar por 1 hora para o coco hidratar.",
      "Passe as gemas por uma peneira, sem pressionar, e incorpore delicadamente à mistura de coco.",
      "Deixe a massa descansar por mais 30 minutos. Enquanto isso, aqueça o forno a 180 °C e unte e açucare uma forma com furo central.",
      "Coloque a massa na forma e leve ao forno em banho-maria com água quente por cerca de 1 hora e 30 minutos.",
      "Espere amornar, solte as laterais com uma faca fina e desenforme. Leve à geladeira antes de servir."
    ],
    tags: ["Sobremesa", "Assado"],
    image: {
      basePath: "images/quindim",
      width: 960,
      height: 720,
      attribution: image(
        "Leonardo “Leguas” Carvalho",
        "Quindim",
        "https://commons.wikimedia.org/wiki/File:Quindim.jpg",
        "CC BY-SA 2.5",
        "https://creativecommons.org/licenses/by-sa/2.5/"
      )
    },
    sources: [source("Quindim", "Panelinha", "https://panelinha.com.br/receita/quindim")]
  }
];
