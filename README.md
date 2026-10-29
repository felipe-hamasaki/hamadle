# Hamadle

Página inicial dos jogos diários. Projeto Vercel independente: `hamadle`.

- Site: https://hamadle.vercel.app
- Berserkdle: https://hamadle.vercel.app/berserk
- Hunter × Hunter DLE: `/hxh` (implementado neste repositório)
- Código do portal: `D:\code\hamadle`
- Código do jogo: `D:\code\berserk-dle`

O portal é HTML/CSS estático. `vercel.json` encaminha `/berserk` e todos os seus recursos para o projeto `berserk-dle`, configurado com `basePath: '/berserk'`. O HxH é exportado pelo Next.js neste repositório: `npm run build:portal` gera `portal-dist/hxh.html`, imagens e bundles sob `/hxh/`, junto com a home estática. Não há dependência de servidor Next em produção nem regra genérica para `/_next`.

Publicar desta pasta: `npx vercel deploy --prod --scope felipehborges-projects`.

## Desenvolvimento local

Execute `npm ci`, `npm run build:portal` e `node scripts/preview.mjs`; abra `http://127.0.0.1:4173`.
O servidor entrega a home, o HxH compilado e encaminha `/berserk` ao jogo já publicado. Não inicia nem altera o checkout do Berserkdle. Para editar o HxH com atualização automática, use `npm run dev` e abra `/hxh`; a home do Next é apenas um índice de desenvolvimento.

Validação: `npm test`, `npm run lint`, `npm run typecheck`. Os testes Playwright padrão usam o servidor de desenvolvimento. Para testar a exportação real do portal, após o build, execute no PowerShell `$env:PLAYWRIGHT_PORTAL='1'; npm run test:e2e`.

O elenco e as convenções do HxH estão em [docs/hxh-editorial.md](docs/hxh-editorial.md). Saves usam `hxh:v1:AAAA-MM-DD`, separados dos saves do Berserk.

## Identidade visual

Home redesenhada em 21/10/2026: papel claro, azul cobalto, coral e amarelo, tipografia Dela Gothic One + DM Sans, mascote em SVG e entrada do jogo em formato de ingresso. Fontes hospedadas localmente, com licenças em `assets/fonts/`. A imagem WebP deriva do mesmo `eclipse.jpg` já usado pelo portal.

Referências consultadas: [Neal.fun](https://neal.fun/) para exploração e pequenas brincadeiras; [Poolsuite](https://poolsuite.net/) para identidade própria e controles táteis; [Poki](https://poki.com/) para acesso direto ao jogo. Nenhum código ou recurso visual desses sites foi copiado.

- `index.html`: estrutura e instruções de jogo.
- `style.css`: identidade, estados, foco visível, versões responsivas e movimento reduzido.
- `home.js`: modal nativo, olhos que seguem o cursor e reações do mascote por clique/teclado.
- `review/`: capturas locais de revisão, excluídas da publicação.

O redesenho não modifica as regras de encaminhamento de `vercel.json` nem os arquivos do jogo.

A home possui temas claro/escuro e traduções completas em português, inglês e espanhol, incluindo instruções e rótulos de acessibilidade. O idioma inicial é português; o tema inicial acompanha o sistema. Escolhas manuais ficam salvas nas chaves locais `hamadle:language` e `hamadle:theme`, com funcionamento normal mesmo quando o armazenamento não está disponível. Essas preferências afetam apenas a home.
