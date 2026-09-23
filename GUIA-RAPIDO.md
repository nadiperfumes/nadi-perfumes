# 🚀 Guia Rápido de Instalação

## Passo 1: Instalar Dependências
```bash
npm install
```

## Passo 2: Configurar Supabase

### 2.1. Criar Projeto no Supabase
1. Acesse https://supabase.com
2. Crie uma conta (gratuita)
3. Clique em "New Project"
4. Preencha os dados e aguarde a criação

### 2.2. Copiar Credenciais
No painel do projeto, vá em **Settings > API**:
- Copie a **URL** (Project URL)
- Copie a **anon/public key**

### 2.3. Criar arquivo .env
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

## Passo 3: Configurar Banco de Dados

### 3.1. Executar SQL
1. No painel do Supabase, vá em **SQL Editor**
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor e clique em **Run**

### 3.2. Criar Bucket de Imagens
1. Vá em **Storage**
2. Clique em "Create a new bucket"
3. Nome: `produtos-imagens`
4. Marque como **Public bucket**
5. Clique em "Create bucket"

## Passo 4: Criar Usuário Admin

1. No painel do Supabase, vá em **Authentication > Users**
2. Clique em "Add user" > "Create new user"
3. Preencha:
   - **Email**: seu@email.com
   - **Password**: sua_senha_segura
   - Marque **Auto Confirm User**
4. Clique em "Create user"

## Passo 5: Iniciar o Projeto

```bash
npm run dev
```

Acesse http://localhost:5173

## Passo 6: Fazer Login e Configurar

1. Acesse http://localhost:5173/login
2. Faça login com o email e senha criados
3. Vá para a aba **Configurações**
4. Preencha:
   - Nome da loja
   - Descrição
   - WhatsApp (ex: 5511999999999)
   - Instagram (ex: https://instagram.com/minhaloja)
5. Clique em **Salvar**

## Passo 7: Adicionar Produtos

1. Vá para a aba **Produtos**
2. Clique em **Novo Produto**
3. Preencha os dados e faça upload da imagem
4. Clique em **Criar**

## ✅ Pronto!

Acesse http://localhost:5173 para ver sua loja funcionando!

---

## 🆘 Problemas Comuns

### Erro: "Faltam as variáveis de ambiente do Supabase"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Verifique se as variáveis estão corretas
- Reinicie o servidor (`npm run dev`)

### Erro ao fazer login
- Verifique se o usuário foi criado no Supabase
- Verifique se marcou "Auto Confirm User"
- Tente resetar a senha no painel do Supabase

### Erro ao fazer upload de imagem
- Verifique se o bucket `produtos-imagens` foi criado
- Verifique se está marcado como público
- Verifique as políticas de acesso no SQL

### Produtos não aparecem na landing page
- Verifique se os produtos estão marcados como "Ativo"
- Verifique se as políticas RLS foram criadas corretamente
- Abra o console do navegador (F12) para ver erros

---

## 📞 Precisa de Ajuda?

Consulte o arquivo `README.md` para documentação completa.
