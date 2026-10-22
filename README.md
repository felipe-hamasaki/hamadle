# Hamadle

Página inicial dos jogos diários. Projeto Vercel independente: `hamadle`.

- Site: https://hamadle.vercel.app
- Berserkdle: https://hamadle.vercel.app/berserk
- Código do portal: `D:\code\hamadle`
- Código do jogo: `D:\code\berserk-dle`

O portal é HTML/CSS estático. `vercel.json` encaminha `/berserk` e todos os seus recursos para o projeto `berserk-dle`, configurado com `basePath: '/berserk'`. Cada projeto pode ser publicado separadamente. Não adicionar uma regra genérica para `/_next`: cada novo jogo deve manter seus recursos dentro do próprio caminho.

Publicar desta pasta: `npx vercel deploy --prod --scope felipehborges-projects`.

## Desenvolvimento local

Execute `node scripts/preview.mjs` e abra `http://127.0.0.1:4173`.
O servidor entrega apenas os arquivos públicos da home e encaminha `/berserk` ao jogo já publicado. Não inicia nem altera o checkout do Berserkdle.

## Identidade visual

Home redesenhada em 21/10/2026: papel claro, azul cobalto, coral e amarelo, tipografia Dela Gothic One + DM Sans, mascote em SVG e entrada do jogo em formato de ingresso. Fontes hospedadas localmente, com licenças em `assets/fonts/`. A imagem WebP deriva do mesmo `eclipse.jpg` já usado pelo portal.

Referências consultadas: [Neal.fun](https://neal.fun/) para exploração e pequenas brincadeiras; [Poolsuite](https://poolsuite.net/) para identidade própria e controles táteis; [Poki](https://poki.com/) para acesso direto ao jogo. Nenhum código ou recurso visual desses sites foi copiado.

- `index.html`: estrutura e instruções de jogo.
- `style.css`: identidade, estados, foco visível, versões responsivas e movimento reduzido.
- `home.js`: modal nativo, olhos que seguem o cursor e reações do mascote por clique/teclado.
- `review/`: capturas locais de revisão, excluídas da publicação.

O redesenho não modifica as regras de encaminhamento de `vercel.json` nem os arquivos do jogo.

A home possui temas claro/escuro e traduções completas em português, inglês e espanhol, incluindo instruções e rótulos de acessibilidade. O idioma inicial é português; o tema inicial acompanha o sistema. Escolhas manuais ficam salvas nas chaves locais `hamadle:language` e `hamadle:theme`, com funcionamento normal mesmo quando o armazenamento não está disponível. Essas preferências afetam apenas a home.
