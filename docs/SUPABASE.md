# Ativar o banco e o painel

O código já contém a integração. Sem as duas variáveis do Supabase, a Nivelo mantém os exemplos locais e identifica o painel como demonstração. Configuração incompleta causa erro, para evitar que uma falha de conexão seja confundida com conteúdo real. Os exemplos não são importados automaticamente para o banco.

## 1. Criar o projeto

Crie um projeto em https://supabase.com/dashboard, escolha uma região próxima do público e aguarde a criação. Guarde a senha do banco em um gerenciador de senhas; a aplicação não usa essa senha.

## 2. Executar a migração

No **SQL Editor**, execute todo o arquivo [202610050001_editorial.sql](../supabase/migrations/202610050001_editorial.sql) uma vez, em um projeto novo. A transação cria empresas, matérias, contas autorizadas, índices e regras de acesso. Se houver erro, não configure a Vercel até corrigi-lo. Não execute novamente sobre tabelas existentes.

O banco permite leitura pública somente de empresas publicadas e matérias publicadas cuja data já chegou e cuja empresa esteja publicada. Apenas contas presentes em `admin_users` podem editar. Uma conta comum não consegue se promover a administradora. A aplicação não usa `service_role` nem chave secreta para contornar essas regras.

## 3. Criar a primeira conta administrativa

Em **Authentication → Users → Add user**, crie sua conta com e-mail e senha seguros e confirmação de e-mail. Copie o **User UID** dela. No SQL Editor, substitua o UUID abaixo pelo UID real e execute:

```sql
insert into public.admin_users (user_id)
values ('UUID-DA-SUA-CONTA');
```

Desative novos cadastros públicos nas configurações de Authentication se não houver outra finalidade para contas. O site não oferece cadastro. Para remover a permissão de uma conta, exclua sua linha em `admin_users` pelo painel do Supabase; isso não apaga seu usuário.

## 4. Configurar a Vercel

Em **Supabase → Project Settings → API**, copie a URL do projeto e a chave **publishable**. A chave pública é destinada à aplicação; o controle de acesso fica nas políticas do banco. Nunca use uma chave `secret` ou `service_role` em uma variável com prefixo `NEXT_PUBLIC_`.

Em **Vercel → projeto da Nivelo → Settings → Environment Variables**, cadastre:

| Variável | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do seu projeto, como `https://seu-projeto.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave publishable do projeto |
| `SITE_URL` | `https://nivelo-seven.vercel.app` ou seu domínio definitivo |

Selecione **Production** e faça um novo deploy. Variáveis `NEXT_PUBLIC_` entram no build: alterar uma variável sem novo deploy não ativa a conexão. Cadastre-as também no ambiente de desenvolvimento do Codex para que possamos testar a integração; não envie senhas ou chaves no chat. No desenvolvimento local, copie `.env.example` para `.env.local` e preencha.

Em Authentication, configure a Site URL com o domínio de produção. O login atual usa e-mail e senha de uma conta previamente criada, sem OAuth ou fluxo de recuperação de senha. Para uma redefinição de senha nesta etapa, use o painel de Authentication do Supabase.

## 5. Validar antes de usar com clientes

1. Abra `/admin`: deve pedir login. Entre com a conta autorizada.
2. Cadastre uma empresa como rascunho; confirme que não aparece no diretório nem em sua URL pública.
3. Publique a empresa e confira sua página, contato, produtos/serviços e galeria.
4. Cadastre uma matéria vinculada a ela. Rascunhos e datas futuras devem ficar fora do portal, da busca e do sitemap.
5. Publique para hoje; confira capa, busca, página da empresa e sitemap. Reabra o painel ou entre em outro navegador para confirmar a persistência.
6. Saia da conta e confirme que não pode editar. Uma conta não autorizada também deve receber recusa.

As datas do editor correspondem ao início do dia em Brasília. O acompanhamento mensal exclui rascunhos e publicações futuras e usa o mês em Brasília. Fotos são cadastradas por URL (até 10 na galeria); upload de arquivos ainda não faz parte desta integração.

## Verificações feitas e limites

O build e os testes de validação/busca/recomendações funcionam sem credenciais. A migração e as regras de acesso foram exercitadas em PostgreSQL local via PGlite com os papéis anônimo, usuário comum e editor. Isso verifica o SQL, mas não substitui os seis passos acima em um projeto Supabase real. Login, cookies de sessão e gravação remota precisam dessa validação após a criação do projeto.

Não há cobrança automática, relatórios de audiência ou envio de e-mail comercial nesta etapa. O contato comercial da Nivelo ainda deve ser informado antes de captar clientes pelo site.
