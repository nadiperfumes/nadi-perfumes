# ✅ Checklist de Configuração

Use este checklist para garantir que tudo está configurado corretamente.

## 📦 Instalação

- [ ] Node.js 18+ instalado
- [ ] Projeto clonado/baixado
- [ ] Dependências instaladas (`npm install`)

## 🔧 Supabase - Configuração Inicial

- [ ] Conta criada no Supabase (https://supabase.com)
- [ ] Novo projeto criado
- [ ] URL e anon key copiadas
- [ ] Arquivo `.env` criado na raiz do projeto
- [ ] Variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` configuradas

## 🗄️ Banco de Dados

- [ ] SQL Editor aberto no Supabase
- [ ] Script `supabase-setup.sql` executado com sucesso
- [ ] Tabelas `produtos` e `configuracoes` criadas
- [ ] Row Level Security (RLS) habilitado
- [ ] Políticas de acesso criadas

## 📁 Storage

- [ ] Bucket `produtos-imagens` criado
- [ ] Bucket configurado como **público**
- [ ] Políticas de storage aplicadas

## 👤 Usuário Admin

- [ ] Usuário criado em Authentication > Users
- [ ] Email e senha definidos
- [ ] Opção "Auto Confirm User" marcada
- [ ] Credenciais anotadas em local seguro

## 🚀 Teste Local

- [ ] Servidor iniciado (`npm run dev`)
- [ ] Landing page acessível (http://localhost:5173)
- [ ] Página de login acessível (http://localhost:5173/login)
- [ ] Login realizado com sucesso
- [ ] Painel admin acessível (http://localhost:5173/admin)

## ⚙️ Configuração da Loja

- [ ] Aba "Configurações" acessada no painel admin
- [ ] Nome da loja preenchido
- [ ] Descrição da loja preenchida
- [ ] WhatsApp configurado (formato: 5511999999999)
- [ ] Instagram configurado (URL completa)
- [ ] Configurações salvas com sucesso

## 📦 Produtos

- [ ] Primeiro produto criado
- [ ] Imagem do produto enviada
- [ ] Produto marcado como "ativo"
- [ ] Produto aparece na landing page
- [ ] Botão "Comprar" redireciona para WhatsApp corretamente
- [ ] Mensagem do WhatsApp contém nome e preço do produto

## 🌐 Deploy (Opcional)

- [ ] Código commitado no Git
- [ ] Repositório criado no GitHub
- [ ] Plataforma de deploy escolhida (Vercel/Netlify)
- [ ] Variáveis de ambiente configuradas na plataforma
- [ ] Deploy realizado com sucesso
- [ ] Site acessível publicamente
- [ ] Funcionalidades testadas em produção

## 🎨 Personalização (Opcional)

- [ ] Logo da loja adicionado
- [ ] Cores personalizadas (Tailwind config)
- [ ] Favicon customizado
- [ ] Meta tags para SEO configuradas
- [ ] Open Graph tags para redes sociais

## 📱 Testes Finais

- [ ] Testado em desktop
- [ ] Testado em tablet
- [ ] Testado em mobile
- [ ] Todos os links funcionando
- [ ] Imagens carregando corretamente
- [ ] Formulários validando corretamente
- [ ] WhatsApp abrindo com mensagem correta
- [ ] Instagram abrindo corretamente

---

## 🆘 Problemas?

Se algo não está funcionando, consulte:
1. `GUIA-RAPIDO.md` - Instruções passo a passo
2. `README.md` - Documentação completa
3. `DEPLOY.md` - Guia de deploy
4. Console do navegador (F12) - Para ver erros JavaScript
5. Supabase Logs - Para ver erros do backend

---

## 🎉 Tudo Pronto!

Se todos os itens estão marcados, sua loja está pronta para uso!

**Próximos passos:**
- Adicione mais produtos
- Compartilhe o link da sua loja
- Monitore as vendas pelo WhatsApp
- Atualize produtos conforme necessário
