import amorProibido from "@/assets/series/optimized-posters/amor-proibido.webp";
import oHerdeiro from "@/assets/series/optimized-posters/o-herdeiro.webp";
import noivaDeAluguel from "@/assets/series/optimized-posters/noiva-de-aluguel.webp";
import vingancaPerfeita from "@/assets/series/optimized-posters/vinganca-perfeita.webp";
import codigoDoDesejo from "@/assets/series/optimized-posters/codigo-do-desejo.webp";
import aChefe from "@/assets/series/optimized-posters/a-chefe.webp";
import gemeas from "@/assets/series/optimized-posters/gemeas.webp";
import chuvaDeVerao from "@/assets/series/optimized-posters/chuva-de-verao.webp";
import oMotoqueiro from "@/assets/series/optimized-posters/o-motoqueiro.webp";
import heroFeature from "@/assets/series/hero-feature.webp";
import reencontroRodoviaria from "@/assets/series/optimized-posters/reencontro-rodoviaria.webp";
import resgatePet from "@/assets/series/optimized-posters/resgate-pet.webp";
import senhoraGatos from "@/assets/series/optimized-posters/senhora-gatos.webp";
import paiFilhoPraia from "@/assets/series/optimized-posters/pai-filho-praia.webp";
import boxeadoraMae from "@/assets/series/optimized-posters/boxeadora-mae.webp";
import padariaMaeFilha from "@/assets/series/optimized-posters/padaria-mae-filha.webp";
import cantoraArara from "@/assets/series/optimized-posters/cantora-arara.webp";
import jantarTraicao from "@/assets/series/optimized-posters/jantar-traicao.webp";
import doutorasProibido from "@/assets/series/optimized-posters/doutoras-proibido.webp";
import enfermeiraPanico from "@/assets/series/optimized-posters/enfermeira-panico.webp";
import robeVermelhoChuva from "@/assets/series/optimized-posters/robe-vermelho-chuva.webp";
import salvaVidas from "@/assets/series/optimized-posters/salva-vidas.webp";
import garotaPresa from "@/assets/series/optimized-posters/garota-presa.webp";
import casalNeon from "@/assets/series/optimized-posters/casal-neon.webp";
import escritorioNoite from "@/assets/series/optimized-posters/escritorio-noite.webp";
import casamentoTensao from "@/assets/series/optimized-posters/casamento-tensao.webp";
import detetiveChuva from "@/assets/series/optimized-posters/detetive-chuva.webp";
import noiteProibida from "@/assets/series/optimized-posters/noite-proibida.webp";
import amanteDoChefe from "@/assets/series/optimized-posters/amante-do-chefe.webp";
import segredosDaMansao from "@/assets/series/optimized-posters/segredos-da-mansao.webp";
import ultimaMentira from "@/assets/series/optimized-posters/ultima-mentira.webp";
import casamentoArranjado from "@/assets/series/optimized-posters/casamento-arranjado.webp";
import encontroSecreto from "@/assets/series/optimized-posters/encontro-secreto.webp";
import filhaDoMafioso from "@/assets/series/optimized-posters/filha-do-mafioso.webp";
import paixaoNoAltar from "@/assets/series/optimized-posters/paixao-no-altar.webp";
import imperioQuebrado from "@/assets/series/optimized-posters/imperio-quebrado.webp";
import vingancaDeNoiva from "@/assets/series/optimized-posters/vinganca-de-noiva.webp";
import olhoPorOlho from "@/assets/series/optimized-posters/olho-por-olho.webp";
import trocadasNoBerco from "@/assets/series/optimized-posters/trocadas-no-berco.webp";
import oFalsoNoivo from "@/assets/series/optimized-posters/o-falso-noivo.webp";
import alguemNaJanela from "@/assets/series/optimized-posters/alguem-na-janela.webp";
import diarioDaVitima from "@/assets/series/optimized-posters/diario-da-vitima.webp";
import cumplicesDoCrime from "@/assets/series/optimized-posters/cumplices-do-crime.webp";
import minhaSecretaria from "@/assets/series/optimized-posters/minha-secretaria.webp";
import vizinhoPerigoso from "@/assets/series/optimized-posters/vizinho-perigoso.webp";

export type Series = {
  id: string;
  title: string;
  cover: string;
  category: Category;
  tags: string[];
  rating: number;
  episodes: number;
  duration: string;
  year: number;
  synopsis: string;
  hook: string;
};

export type Category =
  | "Romance"
  | "Drama"
  | "Desejo"
  | "Vingança"
  | "Reviravolta"
  | "Suspense"
  | "Comédia"
  | "Mistério"
  | "Hospital"
  | "Crime"
  | "Proibido"
  | "+18";

export const heroImage = heroFeature;

const RAW_SERIES: Series[] = [
  {
    id: "jantar-traicao",
    title: "O Jantar da Traição",
    cover: jantarTraicao,
    category: "Suspense",
    tags: ["Suspense", "Drama", "Traição"],
    rating: 4.9,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Ele serviu o vinho. Ela leu o bilhete escondido na taça.",
    synopsis:
      "No 38º andar, com a cidade brilhando lá embaixo, Helena percebe o colar de pérolas no centro da mesa — não era dela. Ricardo serve o vinho como se nada estivesse errado, mas o relógio de ouro ao lado do prato denuncia tudo. Esta noite, um dos dois não vai dormir na mesma cama de novo.",
  },
  {
    id: "doutoras-proibido",
    title: "Plantão Proibido",
    cover: doutorasProibido,
    category: "Proibido",
    tags: ["Proibido", "Hospital", "+18"],
    rating: 4.9,
    episodes: 7,
    duration: "1 min",
    year: 2025,
    hook: "Um beijo no corredor da radiologia. Uma testemunha na porta. Carreiras em jogo.",
    synopsis:
      "Dra. Marina jurou nunca misturar bisturi com desejo. Mas quando a residente Camila a prensa contra a parede do corredor às 3 da manhã, todo o juramento desmonta. O problema é a Dra. Helena parada na porta — segurando o prontuário que pode acabar com as duas.",
  },
  {
    id: "enfermeira-panico",
    title: "Código Azul",
    cover: enfermeiraPanico,
    category: "Hospital",
    tags: ["Hospital", "Drama", "Suspense"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "A paciente do leito 12 abriu os olhos. E disse o nome dela.",
    synopsis:
      "Sofia é a enfermeira mais nova da UTI. Quando a mulher em coma há três meses desperta gritando o nome dela — sem nunca tê-la visto na vida — todo o hospital começa a olhar diferente. E os arquivos do antigo plantão da mãe dela começam a sumir.",
  },
  {
    id: "robe-vermelho-chuva",
    title: "A Janela do 18º Andar",
    cover: robeVermelhoChuva,
    category: "Desejo",
    tags: ["Desejo", "Drama", "+18"],
    rating: 4.8,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Ele aluga o quarto em frente. Toda noite, a luz acende às 22h em ponto.",
    synopsis:
      "Lara não fecha mais a cortina. Sabe que ele está olhando — o estranho do prédio em frente que mandou a primeira garrafa de vinho com um bilhete sem assinatura. A chuva escorre pela janela, o robe escorrega do ombro, e o telefone do hotel toca pela terceira vez esta semana.",
  },
  {
    id: "salva-vidas",
    title: "Salva-Vidas",
    cover: salvaVidas,
    category: "Romance",
    tags: ["Romance", "Drama", "Verão"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ela quase morreu no mar. Ele a tirou da água. Agora não consegue mais soltá-la.",
    synopsis:
      "Beatriz veio pra Búzios pra esquecer. Caio é o salva-vidas que conhece cada onda traiçoeira daquela praia. Quando a ressaca a puxa pra o fundo e ele mergulha sem pensar, nenhum dos dois imagina que o resgate é só o começo de uma temporada que vai mudar tudo.",
  },
  {
    id: "garota-presa",
    title: "Vestido Vermelho",
    cover: garotaPresa,
    category: "Crime",
    tags: ["Crime", "Drama", "Suspense"],
    rating: 4.9,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "A polícia achou que era só mais uma. Não sabia que ela carregava o telefone do prefeito.",
    synopsis:
      "Tainá foi pega na batida do motel da BR-364 com o vestido vermelho rasgado e a bolsa cheia de dinheiro vivo. O sargento Mendes começa a anotar tudo no prancheta — até ela soltar o nome do homem que estava no quarto. A partir daí, a noite inteira da cidade muda de lado.",
  },
  {
    id: "casal-neon",
    title: "Mão no Pescoço",
    cover: casalNeon,
    category: "+18",
    tags: ["+18", "Desejo", "Bad Boy"],
    rating: 4.9,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "A chave no pescoço dela abre o cofre dele. Ela ainda não sabe disso.",
    synopsis:
      "Sob os letreiros de neon de Liberdade, Yuri encosta a boca no ouvido de Letícia e pede que ela não respire. Ela obedece. O que ele não disse é que o colar que ela usa há cinco anos — herança da avó — é a única coisa que abre o cofre onde está enterrado o passado dele.",
  },
  {
    id: "escritorio-noite",
    title: "A Pasta Azul",
    cover: escritorioNoite,
    category: "Drama",
    tags: ["Drama", "Suspense", "Trabalho"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ele entrou na sala dela à meia-noite com a pasta que ela tinha trancado no cofre.",
    synopsis:
      "Dra. Min-jung é a advogada mais discreta do escritório. Quando o sócio Daniel aparece na sala dela depois do expediente segurando a pasta com o contrato que devia ter sido destruído, ela percebe que alguém abriu o cofre. E que a próxima reunião do conselho pode ser a última.",
  },
  {
    id: "casamento-tensao",
    title: "O Sim que Não Veio",
    cover: casamentoTensao,
    category: "Drama",
    tags: ["Drama", "Romance", "Família"],
    rating: 4.8,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Faltam quinze minutos para o casamento. O bilhete está dentro do livro de votos.",
    synopsis:
      "Catarina passa a mão no vestido de pérolas pela última vez antes de sentar à mesa. Vicente, de costas, abre o livro de votos e encontra a letra que reconhece de cor — a do irmão mais velho, que morreu há doze anos. Os candelabros já foram acesos. Os convidados já chegaram. Mas o jantar de ensaio acabou de virar outra coisa.",
  },
  {
    id: "detetive-chuva",
    title: "Sob a Mesma Chuva",
    cover: detetiveChuva,
    category: "Mistério",
    tags: ["Mistério", "Suspense", "Romance"],
    rating: 4.9,
    episodes: 7,
    duration: "1 min",
    year: 2025,
    hook: "Ela é a única testemunha. Ele é o detetive que jurou nunca mais se envolver.",
    synopsis:
      "Clara viu o atirador antes de qualquer câmera capturar. O detetive Vitor a tira da fita amarela na chuva da Lapa às 2 da manhã, e percebe que o rosto dela está em três casos arquivados que ele tinha jurado esquecer. A próxima testemunha geralmente não vive até o amanhecer — e ele não vai deixar essa morrer.",
  },
  {
    id: "amor-proibido",
    title: "Amor Proibido",
    cover: amorProibido,
    category: "Romance",
    tags: ["Romance", "Desejo", "Drama"],
    rating: 4.9,
    episodes: 3,
    duration: "1 min",
    year: 2025,
    hook: "Ela jurou nunca mais amar. Até ele aparecer na porta do escritório.",
    synopsis:
      "Helena é uma advogada de sucesso que acabou de fechar o maior caso da carreira. Mas quando o novo cliente bilionário entra na sala, ela descobre que é o homem que destruiu sua vida há dez anos. E agora ele quer algo dela que vai muito além do contrato.",
  },
  {
    id: "o-herdeiro",
    title: "O Herdeiro",
    cover: oHerdeiro,
    category: "Drama",
    tags: ["Drama", "Vingança", "Poder"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ele voltou para destruir a família que o abandonou. Mas se apaixonou pela pessoa errada.",
    synopsis:
      "Vinte anos depois de ser jogado para fora do império da família, Rafael volta como o investidor anônimo que comprou todas as dívidas dos Albuquerque. O plano de vingança era perfeito — até ele reencontrar Júlia, a filha do homem que ele jurou destruir.",
  },
  {
    id: "noiva-de-aluguel",
    title: "Noiva de Aluguel",
    cover: noivaDeAluguel,
    category: "Romance",
    tags: ["Romance", "Comédia", "Reviravolta"],
    rating: 4.7,
    episodes: 7,
    duration: "1 min",
    year: 2025,
    hook: "Casamento de fachada. Sentimentos reais demais.",
    synopsis:
      "Para herdar a fortuna do avô, Lucas precisa estar casado em 30 dias. Beatriz aceita o contrato pelo dinheiro. O que nenhum dos dois esperava era que aquele 'sim' diante do altar fosse acordar algo que não estava no acordo.",
  },
  {
    id: "vinganca-perfeita",
    title: "Vingança Perfeita",
    cover: vingancaPerfeita,
    category: "Vingança",
    tags: ["Vingança", "Suspense", "Drama"],
    rating: 4.9,
    episodes: 4,
    duration: "1 min",
    year: 2025,
    hook: "Dez anos planejando. Uma noite para destruir tudo.",
    synopsis:
      "Eles acharam que tinham matado Camila. Erraram. Agora, com outro nome, outro rosto e uma fortuna construída do zero, ela voltou para o jantar de aniversário do homem que mandou queimá-la viva. E trouxe os convites errados.",
  },
  {
    id: "codigo-do-desejo",
    title: "Código do Desejo",
    cover: codigoDoDesejo,
    category: "Desejo",
    tags: ["Desejo", "Romance", "Hospital"],
    rating: 4.8,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Plantão da madrugada. Regras quebradas. Sem volta.",
    synopsis:
      "Dr. Bruno é o cirurgião mais respeitado — e mais inacessível — do hospital. Quando a nova residente Marina entra na sala de emergência, ele descobre que existe uma coisa que nem ele consegue controlar.",
  },
  {
    id: "a-chefe",
    title: "A Chefe",
    cover: aChefe,
    category: "Drama",
    tags: ["Drama", "Poder", "Romance"],
    rating: 4.7,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ela manda em mil pessoas. Só não consegue mandar no próprio coração.",
    synopsis:
      "Alessandra construiu o maior conglomerado de mídia do Brasil sozinha. Quando contrata um novo motorista para escapar dos paparazzi, ela não imagina que aquele homem de poucas palavras conhece todos os seus segredos.",
  },
  {
    id: "gemeas",
    title: "As Gêmeas",
    cover: gemeas,
    category: "Reviravolta",
    tags: ["Reviravolta", "Mistério", "Drama"],
    rating: 4.9,
    episodes: 7,
    duration: "1 min",
    year: 2025,
    hook: "Uma morreu. A outra assumiu a vida dela. Ninguém percebeu.",
    synopsis:
      "Quando Lara desaparece misteriosamente, sua irmã gêmea Laís decide tomar seu lugar para descobrir a verdade. O problema é que a vida de Lara tinha segredos que nem o marido conhecia — e agora alguém percebeu a troca.",
  },
  {
    id: "chuva-de-verao",
    title: "Chuva de Verão",
    cover: chuvaDeVerao,
    category: "Romance",
    tags: ["Romance", "Verão", "Jovem"],
    rating: 4.6,
    episodes: 3,
    duration: "1 min",
    year: 2025,
    hook: "Três meses no Rio. Um beijo na chuva. A vida mudou.",
    synopsis:
      "Sofia veio passar o verão na casa da avó em Copacabana esperando esquecer o noivo traidor. O que ela não esperava era esbarrar com Theo, o surfista que vai virar todo o seu mundo de cabeça para baixo em 90 dias.",
  },
  {
    id: "o-motoqueiro",
    title: "O Motoqueiro",
    cover: oMotoqueiro,
    category: "Desejo",
    tags: ["Desejo", "Bad Boy", "Romance"],
    rating: 4.8,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Ela é a filha do prefeito. Ele é o bandido da cidade. O que pode dar errado?",
    synopsis:
      "Quando Isabela bate o carro do pai na porta da oficina de Caio, ela só queria sumir antes que o escândalo explodisse. Mas o líder da gangue mais perigosa da cidade tem suas próprias condições para guardar o segredo dela.",
  },
  {
    id: "noite-proibida",
    title: "Noite Proibida",
    cover: noiteProibida,
    category: "+18",
    tags: ["+18", "Desejo", "Romance"],
    rating: 4.9,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Uma noite. Sem nomes. Sem regras. Mas ela acordou na mesa de reunião dele.",
    synopsis:
      "Mariana só queria fugir do casamento marcado. O que ela não imaginava era que o estranho do bar seria o novo CEO da empresa do noivo — e que aquela noite mudaria tudo.",
  },
  {
    id: "amante-do-chefe",
    title: "Amante do Chefe",
    cover: amanteDoChefe,
    category: "+18",
    tags: ["+18", "Poder", "Desejo"],
    rating: 4.8,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Contrato confidencial. Cláusula proibida. Sentimentos reais.",
    synopsis:
      "Ricardo paga uma fortuna pelo silêncio. Carolina aceita o acordo achando que controla tudo. Até descobrir que o homem que a contratou tem segredos muito mais perigosos que os dela.",
  },
  {
    id: "segredos-da-mansao",
    title: "Segredos da Mansão",
    cover: segredosDaMansao,
    category: "Mistério",
    tags: ["Mistério", "Suspense", "Drama"],
    rating: 4.7,
    episodes: 7,
    duration: "1 min",
    year: 2025,
    hook: "Toda família tem um segredo. Esta tem um corpo no porão.",
    synopsis:
      "Quando Helena herda a mansão da avó que nunca conheceu, ela descobre cartas escondidas, um quarto trancado há 40 anos e um nome riscado em todas as fotos da família.",
  },
  {
    id: "ultima-mentira",
    title: "A Última Mentira",
    cover: ultimaMentira,
    category: "Suspense",
    tags: ["Suspense", "Thriller", "Drama"],
    rating: 4.8,
    episodes: 4,
    duration: "1 min",
    year: 2025,
    hook: "Ele desapareceu há um ano. Hoje ela recebeu uma mensagem dele.",
    synopsis:
      "Júlia finalmente seguiu em frente após o sumiço do marido. Até a câmera de segurança da padaria capturar o rosto que ela jurou nunca mais ver — e ele estava olhando direto para ela.",
  },
  {
    id: "casamento-arranjado",
    title: "Casamento Arranjado",
    cover: casamentoArranjado,
    category: "Comédia",
    tags: ["Comédia", "Romance", "Reviravolta"],
    rating: 4.6,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Os pais combinaram tudo. Os filhos se odeiam. O resto é cinema.",
    synopsis:
      "Para salvar duas empresas falidas, dois pais bilionários armam o casamento dos filhos. O que eles não sabiam é que Pedro e Larissa já se conheciam — e tinham uma história muito complicada para esquecer.",
  },
  {
    id: "encontro-secreto",
    title: "Encontro Secreto",
    cover: encontroSecreto,
    category: "+18",
    tags: ["+18", "Romance", "Desejo"],
    rating: 4.7,
    episodes: 4,
    duration: "1 min",
    year: 2025,
    hook: "Um aplicativo. Um quarto de hotel. Zero arrependimentos. Até descobrirem quem é o outro.",
    synopsis:
      "Beatriz baixou o app só para esquecer o ex. Daniel topou o encontro só por curiosidade. Quando se encontram na sala de reuniões na segunda-feira, percebem que o jogo só começou.",
  },
  {
    id: "filha-do-mafioso",
    title: "Filha do Mafioso",
    cover: filhaDoMafioso,
    category: "Suspense",
    tags: ["Suspense", "Romance", "Drama"],
    rating: 4.9,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Para vingar o pai, ela precisa se casar com o inimigo. E não se apaixonar.",
    synopsis:
      "Quando o império da família é ameaçado, Valentina aceita o casamento com o herdeiro do clã rival. O plano era simples: descobrir os segredos deles e destruí-los por dentro.",
  },
  {
    id: "paixao-no-altar",
    title: "Paixão no Altar",
    cover: paixaoNoAltar,
    category: "Romance",
    tags: ["Romance", "Drama"],
    rating: 4.7,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ela ia se casar. Até o ex aparecer no meio da cerimônia.",
    synopsis:
      "Camila estava prestes a dizer 'sim' quando Felipe entrou pela porta da igreja. Sete anos depois, ele tinha apenas uma frase para dizer — e ela sabia que mudaria tudo.",
  },
  {
    id: "verao-em-paris",
    title: "O Último Ônibus",
    cover: reencontroRodoviaria,
    category: "Drama",
    tags: ["Drama", "Família", "Reencontro"],
    rating: 4.9,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Sete anos sem se falarem. Uma chuva. Um abraço que ninguém esperava.",
    synopsis:
      "Helena saiu de casa aos 19 anos jurando nunca mais voltar. Sete invernos depois, uma ligação de madrugada a coloca no último ônibus pra cidade natal. Na rodoviária molhada, a mãe que ela aprendeu a odiar está de pé na chuva — segurando algo que vai virar tudo de cabeça pra baixo.",
  },
  {
    id: "amor-de-laboratorio",
    title: "O Resgate",
    cover: resgatePet,
    category: "Drama",
    tags: ["Drama", "Romance", "Animais"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ela salvou o cachorro. O dono veio buscar. Ninguém estava pronto.",
    synopsis:
      "Dra. Marcela tira o plantão da madrugada na clínica que ninguém quer. Quando trazem um golden meio morto encontrado na enchente, ela passa a noite inteira lutando pra salvá-lo. Três dias depois, o dono aparece pra buscá-lo — e ela reconhece o homem da foto que carrega no bolso há dez anos.",
  },
  {
    id: "imperio-quebrado",
    title: "Império Quebrado",
    cover: imperioQuebrado,
    category: "Drama",
    tags: ["Drama", "Família", "Poder"],
    rating: 4.7,
    episodes: 7,
    duration: "1 min",
    year: 2025,
    hook: "O patriarca morreu. A guerra entre os filhos começou.",
    synopsis:
      "Quando o velho Albuquerque morre sem deixar testamento, os três filhos descobrem que o império não é exatamente deles. Uma quarta herdeira aparece — e ninguém sabia que ela existia.",
  },
  {
    id: "doutora-da-vida-real",
    title: "No Ringue com Minha Mãe",
    cover: boxeadoraMae,
    category: "Drama",
    tags: ["Drama", "Família", "Superação"],
    rating: 4.9,
    episodes: 7,
    duration: "1 min",
    year: 2025,
    hook: "Ela treinou a vida inteira pra esse soco. A mãe enfaixa as mãos como se fosse o último.",
    synopsis:
      "Sara tem 23 anos e três rounds pra se tornar campeã nacional. No vestiário do galpão velho, a mãe enfaixa cada dedo em silêncio — porque é a única forma que ela conhece de dizer 'eu te amo'. Ninguém na arquibancada sabe o que essas duas mulheres sangraram pra chegar até aqui.",
  },
  {
    id: "tentacao-da-noite",
    title: "A Voz do Pelourinho",
    cover: cantoraArara,
    category: "Drama",
    tags: ["Drama", "Romance", "Música"],
    rating: 4.8,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Cantava na rua por moedas. Hoje um produtor de São Paulo a ouviu e o destino mudou de cor.",
    synopsis:
      "Iara canta no Pelourinho desde os 12 anos, com Lorde — a arara azul que herdou da avó — pousada no ombro. Quando um produtor estrangeiro promete levá-la pra cantar no mundo inteiro, ela precisa escolher entre o sonho e tudo aquilo que faz a voz dela soar como Salvador.",
  },
  {
    id: "professor-particular",
    title: "A Padaria da Minha Mãe",
    cover: padariaMaeFilha,
    category: "Drama",
    tags: ["Drama", "Família", "Romance"],
    rating: 4.7,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Largou Paris pra salvar a padaria que a mãe sangrou pra construir.",
    synopsis:
      "Júlia era chef estrelada em Paris quando soube que a mãe estava prestes a perder a padaria que criou as duas filhas. Voltou pra cidade pequena disposta a salvar o negócio em 60 dias. O que ela não esperava era que o banco que ia tomar tudo pertencesse ao primeiro amor que ela jurou esquecer.",
  },
  {
    id: "vinganca-de-noiva",
    title: "Vingança de Noiva",
    cover: vingancaDeNoiva,
    category: "Vingança",
    tags: ["Vingança", "Drama", "Romance"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Foi traída no casamento. Voltou cinco anos depois para o casamento dele.",
    synopsis:
      "Bruna fugiu da cidade depois de ver o noivo com a melhor amiga. Cinco anos depois, ela é a planejadora do casamento dele com a mesma mulher — e ninguém reconheceu.",
  },
  {
    id: "olho-por-olho",
    title: "Olho por Olho",
    cover: olhoPorOlho,
    category: "Vingança",
    tags: ["Vingança", "Suspense"],
    rating: 4.9,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Eles destruíram a empresa do pai dela. Ela vai destruir a vida deles um por um.",
    synopsis:
      "Aos 22 anos, Larissa perdeu tudo. Aos 30, ela é a sócia silenciosa que comprou as três empresas dos sócios traidores. Hoje começa a primeira reunião do conselho.",
  },
  {
    id: "trocadas-no-berco",
    title: "Trocadas no Berço",
    cover: trocadasNoBerco,
    category: "Reviravolta",
    tags: ["Reviravolta", "Drama", "Família"],
    rating: 4.7,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Vinte e cinco anos depois, descobriu que a família não era dela.",
    synopsis:
      "O exame de DNA era pra confirmar uma cirurgia. Confirmou outra coisa: Beatriz nunca foi filha de quem a criou. E a verdadeira herdeira está pronta para reivindicar tudo.",
  },
  {
    id: "o-falso-noivo",
    title: "O Falso Noivo",
    cover: oFalsoNoivo,
    category: "Reviravolta",
    tags: ["Reviravolta", "Romance"],
    rating: 4.6,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ela contratou um noivo de mentira. Ele apareceu no casamento de verdade.",
    synopsis:
      "Para calar a família no Natal, Júlia paga um ator para fingir ser o noivo. O problema começa quando os pais marcam o casamento de surpresa — e o ator decide ir até o fim.",
  },
  {
    id: "alguem-na-janela",
    title: "Alguém na Janela",
    cover: alguemNaJanela,
    category: "Mistério",
    tags: ["Mistério", "Suspense"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Toda noite à mesma hora, ela vê alguém olhando do prédio em frente.",
    synopsis:
      "Sofia se mudou para o apartamento sozinha depois do divórcio. Na terceira noite, percebeu que a sombra na janela em frente não era de qualquer pessoa — era do ex-marido. E o prédio em frente está abandonado há anos.",
  },
  {
    id: "diario-da-vitima",
    title: "O Diário da Vítima",
    cover: diarioDaVitima,
    category: "Mistério",
    tags: ["Mistério", "Thriller"],
    rating: 4.7,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "Um diário escondido. Cinco suspeitos. Um deles ainda mora na casa.",
    synopsis:
      "Quando Helena reforma a casa antiga da avó, encontra um diário no fundo da parede. Cada página revela um segredo da família — e o último capítulo acusa alguém que ainda janta com ela aos domingos.",
  },
  {
    id: "cumplices-do-crime",
    title: "Cúmplices do Crime",
    cover: cumplicesDoCrime,
    category: "Suspense",
    tags: ["Suspense", "Thriller", "Romance"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Um corpo. Duas testemunhas. Uma versão que ninguém pode contar.",
    synopsis:
      "Carla e Diego se conheceram na pior noite de suas vidas. Agora, três meses depois, alguém sabe o que eles fizeram naquele beco — e está cobrando o silêncio em parcelas.",
  },
  {
    id: "ex-da-minha-irma",
    title: "Verão com Meu Pai",
    cover: paiFilhoPraia,
    category: "Drama",
    tags: ["Drama", "Família", "Reconciliação"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Doze anos sem se verem. Trinta dias na praia pra recuperar uma vida inteira.",
    synopsis:
      "Quando a mãe de Theo morre de repente, o garoto de 9 anos é mandado pra casa do pai que ele só conhecia por fotos. Rafael largou tudo no Norte pra criar o filho num vilarejo de praia, com o velho golden Tom como única ponte entre os dois. O verão que era pra ser de luto vira o início de algo que nenhum dos dois sabia que precisava.",
  },
  {
    id: "casa-dos-amigos",
    title: "Dona Cida e Seus Sete Gatos",
    cover: senhoraGatos,
    category: "Drama",
    tags: ["Drama", "Família", "Reviravolta"],
    rating: 4.8,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Cinco amigos. Uma casa. Um casamento que ninguém viu chegando.",
    synopsis:
      "Depois da faculdade, o grupo de amigos divide uma casa em Pinheiros. Quando dois deles começam a se beijar escondido na cozinha, todo o equilíbrio do grupo está em jogo.",
  },
  {
    id: "minha-secretaria",
    title: "Minha Secretária",
    cover: minhaSecretaria,
    category: "+18",
    tags: ["+18", "Desejo", "Poder"],
    rating: 4.9,
    episodes: 5,
    duration: "1 min",
    year: 2025,
    hook: "Ele é o CEO. Ela controla a agenda. E muito mais.",
    synopsis:
      "Fernanda é a secretária mais eficiente da empresa. Quando o novo CEO descobre que ela conhece todos os segredos do antigo, ele faz uma proposta que ela não vai conseguir recusar.",
  },
  {
    id: "vizinho-perigoso",
    title: "O Vizinho Perigoso",
    cover: vizinhoPerigoso,
    category: "+18",
    tags: ["+18", "Bad Boy", "Suspense"],
    rating: 4.8,
    episodes: 6,
    duration: "1 min",
    year: 2025,
    hook: "As paredes são finas. Os segredos dele são grandes demais.",
    synopsis:
      "Rafaela se mudou para o apartamento esperando paz. O que ela ouve do vizinho à noite a tira do sério — até o dia em que ele bate na porta dela e tudo muda.",
  },
];

export const CATEGORIES: { id: Category | "Todas"; label: string }[] = [
  { id: "Todas", label: "Todas" },
  { id: "Romance", label: "Romance" },
  { id: "Drama", label: "Drama" },
  { id: "Desejo", label: "Desejo" },
  { id: "Proibido", label: "Proibido" },
  { id: "Vingança", label: "Vingança" },
  { id: "Reviravolta", label: "Reviravolta" },
  { id: "Suspense", label: "Suspense" },
  { id: "Crime", label: "Crime" },
  { id: "Hospital", label: "Hospital" },
  { id: "Comédia", label: "Comédia" },
  { id: "Mistério", label: "Mistério" },
  { id: "+18", label: "+18" },
];

export const FEATURED_ID = "amor-proibido";

const PRIORITY_IDS = [
  "jantar-traicao",
  "doutoras-proibido",
  "casal-neon",
  "detetive-chuva",
  "garota-presa",
  "robe-vermelho-chuva",
  "casamento-tensao",
  "salva-vidas",
  "escritorio-noite",
  "enfermeira-panico",
  "verao-em-paris",
  "amor-de-laboratorio",
  "doutora-da-vida-real",
  "tentacao-da-noite",
  "professor-particular",
  "ex-da-minha-irma",
  "casa-dos-amigos",
];

export const SERIES: Series[] = [
  ...PRIORITY_IDS
    .map((id) => RAW_SERIES.find((s) => s.id === id))
    .filter((s): s is Series => Boolean(s)),
  ...RAW_SERIES.filter((s) => !PRIORITY_IDS.includes(s.id)),
];

// Append 300 procedurally-generated stories for catalog volume.
import { GENERATED_SERIES, SPICY_IDS as GEN_SPICY_IDS } from "./seriesData.generated";
SERIES.push(...GENERATED_SERIES);
export const SPICY_IDS = GEN_SPICY_IDS;
