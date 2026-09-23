# 🛍️ Nadi - Landing Page com Painel Admin

Landing page moderna para exibição de produtos com painel administrativo completo. Desenvolvida com React + Supabase.

## ✨ Funcionalidades

### Landing Page (Pública)
- ✅ Exibição de produtos em grid responsivo
- ✅ Botão "Comprar" que redireciona para WhatsApp com mensagem pré-formatada
- ✅ Link para Instagram da loja
- ✅ Hero section personalizável
- ✅ Footer com informações de contato
- ✅ Design mobile-first

### Painel Administrativo
- ✅ Autenticação segura com Supabase Auth
- ✅ CRUD completo de produtos
- ✅ Upload de imagens para Supabase Storage
- ✅ Ativar/desativar produtos
- ✅ Ordenação de produtos
- ✅ Configurações da loja (nome, descrição, WhatsApp, Instagram)

## 🚀 Tecnologias

- **React 18** - Framework frontend
- **Vite** - Build tool
- **Supabase** - Backend as a Service (PostgreSQL, Auth, Storage)
- **Tailwind CSS** - Estilização
- **React Router** - Navegação
- **React Query** - Gerenciamento de estado e cache
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd nadi
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Supabase

#### 3.1. Crie um projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (se não tiver)
3. Crie um novo projeto
4. Anote a **URL** e a **anon key** do projeto

#### 3.2. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

#### 3.3. Crie as tabelas no Supabase

Acesse o **SQL Editor** no painel do Supabase e execute:

```sql
-- Tabela de produtos
CREATE TABLE produtos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  imagem_url TEXT,
  categoria TEXT,
  ativo BOOLEAN DEFAULT true,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações
CREATE TABLE configuracoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_loja TEXT NOT NULL,
  descricao_loja TEXT,
  logo_url TEXT,
  whatsapp TEXT NOT NULL,
  instagram TEXT,
  cor_primaria TEXT DEFAULT '#000000',
  cor_secundaria TEXT DEFAULT '#ffffff',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para produtos
CREATE POLICY "Produtos são visíveis publicamente"
  ON produtos FOR SELECT
  USING (true);

CREATE POLICY "Apenas usuários autenticados podem inserir produtos"
  ON produtos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Apenas usuários autenticados podem atualizar produtos"
  ON produtos FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas usuários autenticados podem deletar produtos"
  ON produtos FOR DELETE
  USING (auth.role() = 'authenticated');

-- Políticas de acesso para configurações
CREATE POLICY "Configurações são visíveis publicamente"
  ON configuracoes FOR SELECT
  USING (true);

CREATE POLICY "Apenas usuários autenticados podem atualizar configurações"
  ON configuracoes FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas usuários autenticados podem inserir configurações"
  ON configuracoes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

#### 3.4. Configure o Storage

1. No painel do Supabase, vá em **Storage**
2. Crie um bucket chamado `produtos-imagens`
3. Configure como **público**
4. Adicione a política de acesso:

```sql
-- Permitir upload apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem fazer upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'produtos-imagens' AND auth.role() = 'authenticated');

-- Permitir leitura pública
CREATE POLICY "Imagens são públicas"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'produtos-imagens');
```

#### 3.5. Crie o usuário administrador

No painel do Supabase, vá em **Authentication > Users** e clique em **Add user**:
- Email: seu@email.com
- Senha: sua_senha_segura
- Marque "Auto Confirm User"

### 4. Inicie o projeto

```bash
npm run dev
```

Acesse:
- **Landing Page**: http://localhost:5173
- **Login Admin**: http://localhost:5173/login
- **Painel Admin**: http://localhost:5173/admin

## 📱 Como Usar

### Configurar a Loja
1. Faça login em `/login` com as credenciais criadas
2. Vá para a aba **Configurações**
3. Preencha:
   - Nome da loja
   - Descrição
   - WhatsApp (formato: 5511999999999)
   - Link do Instagram
4. Clique em **Salvar**

### Adicionar Produtos
1. No painel admin, vá para a aba **Produtos**
2. Clique em **Novo Produto**
3. Preencha os dados:
   - Nome
   - Descrição
   - Preço
   - Categoria (opcional)
   - Ordem de exibição
   - Upload da imagem
   - Status (ativo/inativo)
4. Clique em **Criar**

### Gerenciar Produtos
- **Editar**: Clique no ícone de lápis
- **Ativar/Desativar**: Clique no ícone de olho
- **Excluir**: Clique no ícone de lixeira

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. Instale a CLI do Vercel:
```bash
npm i -g vercel
```

2. Faça o deploy:
```bash
vercel
```

3. Configure as variáveis de ambiente no painel do Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Deploy no Netlify

1. Instale a CLI do Netlify:
```bash
npm i -g netlify-cli
```

2. Faça o build:
```bash
npm run build
```

3. Faça o deploy:
```bash
netlify deploy --prod
```

4. Configure as variáveis de ambiente no painel do Netlify

## 📂 Estrutura do Projeto

```
nadi/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── ConfigManager.jsx    # Gerenciamento de configurações
│   │   │   ├── ProductForm.jsx      # Formulário de produtos
│   │   │   └── ProductsManager.jsx  # Gerenciamento de produtos
│   │   ├── Footer.jsx               # Footer da landing page
│   │   ├── Hero.jsx                 # Hero section
│   │   ├── ProductCard.jsx          # Card de produto
│   │   └── ProtectedRoute.jsx       # Proteção de rotas
│   ├── lib/
│   │   └── supabase.js              # Cliente Supabase
│   ├── pages/
│   │   ├── Admin.jsx                # Painel administrativo
│   │   ├── Home.jsx                 # Landing page
│   │   └── Login.jsx                # Página de login
│   ├── App.jsx                      # Rotas principais
│   ├── index.css                    # Estilos globais
│   └── main.jsx                     # Entry point
├── .env.example                     # Exemplo de variáveis de ambiente
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Personalização

### Cores
Edite o arquivo `tailwind.config.js` para personalizar as cores:

```js
theme: {
  extend: {
    colors: {
      primary: '#sua-cor',
      secondary: '#sua-cor',
    }
  }
}
```

### Textos
Os textos são configuráveis pelo painel admin na aba **Configurações**.

## 🔒 Segurança

- ✅ Row Level Security (RLS) habilitado no Supabase
- ✅ Autenticação obrigatória para operações administrativas
- ✅ Variáveis de ambiente para credenciais
- ✅ Validação de formulários

## 📝 Licença

MIT

## 🤝 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

Desenvolvido com ❤️ usando React + Supabase
#   n a d i - p e r f u m e s  
 