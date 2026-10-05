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
