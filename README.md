# Nivelo

Protótipo visual de um portal editorial de empresas, em Next.js, React e TypeScript.

## Desenvolvimento

Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

`npm run build` valida os tipos e gera a versão de produção. `npm start` inicia essa versão.

## Telas

- `/`: capa editorial, empresas, categorias e conteúdos.
- `/empresas`: diretório com busca por nome, produtos, serviços e localização.
- `/empresas/casa-raiz`: exemplo de página completa de empresa.
- `/artigos`: pesquisa de conteúdo e assuntos.
- `/artigos/uma-casa-com-a-sua-historia`: matéria com empresa relacionada.
- `/admin`: painel visual com acompanhamento de dois conteúdos por mês, listas e editores.

Os exemplos estão em `lib/data.ts`. As empresas, endereços e conteúdos são fictícios. Os formulários administrativos simulam alterações apenas no `sessionStorage` da aba; não alteram o portal público. Restaurar exemplos limpa a simulação.

Não há backend, autenticação ou integração com Supabase nesta etapa. O administrativo é uma demonstração pública. Na próxima etapa, os dados e a autenticação poderão ser conectados ao Supabase e o projeto publicado na Vercel.

Fontes e fotos são servidas localmente. Créditos das fotos em `public/images/CREDITS.md`.

Metadados, URLs legíveis, HTML semântico, dados estruturados e sitemap já têm uma estrutura inicial. Antes da publicação real, defina `SITE_URL` com o domínio definitivo, substitua os exemplos e revise os dados das empresas e os conteúdos editoriais.

## Organização editorial e descoberta

A capa prioriza manchetes, últimas publicações e editorias. Notícias, entrevistas e guias têm identificação própria, data e autoria. Os 12 conteúdos são demonstrativos; notícias e entrevistas não descrevem acontecimentos ou declarações reais.

A busca integrada fica em `/buscar`. Ela considera todas as palavras relevantes da consulta, ignora diferenças de acento e prioriza títulos e nomes sobre menções no corpo. A busca de empresas também filtra categoria e localização.

`lib/discovery.ts` reúne algoritmos determinísticos de busca, destaques diversificados, leituras relacionadas e recomendações personalizadas. A capa combina prioridade editorial (0 a 5) e recência, procurando variar empresas e editorias. As sugestões relacionadas consideram assunto, etiquetas e empresa. Não há contadores de popularidade inventados.

O visitante ativa a personalização no bloco “Para você”. As últimas 20 matérias lidas, por até 30 dias, ficam no `localStorage` do navegador; esse histórico não é enviado a um servidor. Recomendações priorizam os assuntos lidos mais recentemente, evitam repetir matérias já lidas e procuram variar editorias. É possível pausar e limpar o histórico. Não há personalização entre dispositivos ou contas nesta etapa.

No protótipo administrativo, os campos de formato, etiquetas e prioridade de capa são simulados na aba, como os demais campos; não alteram a capa pública. A integração desses controles com conteúdo persistido fica para a etapa do Supabase.

`npm test` executa os testes dos algoritmos e da separação entre subtítulos e parágrafos. Use Node.js 22.18+ ou 24 para executar os testes TypeScript diretamente.

URLs de SEO usam `SITE_URL`, o domínio de produção informado pela Vercel ou o endereço atual da Nivelo, nessa ordem.

## Aparência

O tema segue `prefers-color-scheme` por padrão e acompanha mudanças do sistema sem recarregar a página. O seletor no cabeçalho oferece Automático, Claro e Escuro. A escolha explícita fica no navegador em `nivelo-theme` e é aplicada antes da primeira renderização visível. No celular, o controle aparece como um ícone ao lado do menu.

A identidade mantém os azuis da Nivelo, com paletas próprias para fundo, texto, superfícies, formulários e estados. As fotografias usam proporções horizontais e cantos suaves, preservando a estrutura editorial.
