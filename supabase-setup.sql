-- ============================================
-- SETUP COMPLETO DO SUPABASE
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. CRIAR TABELAS
-- ============================================

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
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
CREATE TABLE IF NOT EXISTS configuracoes (
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

-- 2. HABILITAR ROW LEVEL SECURITY
-- ============================================

ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE ACESSO - PRODUTOS
-- ============================================

-- Permitir leitura pública de produtos
CREATE POLICY "Produtos são visíveis publicamente"
  ON produtos FOR SELECT
  USING (true);

-- Apenas usuários autenticados podem inserir produtos
CREATE POLICY "Apenas usuários autenticados podem inserir produtos"
  ON produtos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Apenas usuários autenticados podem atualizar produtos
CREATE POLICY "Apenas usuários autenticados podem atualizar produtos"
  ON produtos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Apenas usuários autenticados podem deletar produtos
CREATE POLICY "Apenas usuários autenticados podem deletar produtos"
  ON produtos FOR DELETE
  USING (auth.role() = 'authenticated');

-- 4. POLÍTICAS DE ACESSO - CONFIGURAÇÕES
-- ============================================

-- Permitir leitura pública de configurações
CREATE POLICY "Configurações são visíveis publicamente"
  ON configuracoes FOR SELECT
  USING (true);

-- Apenas usuários autenticados podem inserir configurações
CREATE POLICY "Apenas usuários autenticados podem inserir configurações"
  ON configuracoes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Apenas usuários autenticados podem atualizar configurações
CREATE POLICY "Apenas usuários autenticados podem atualizar configurações"
  ON configuracoes FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 5. POLÍTICAS DE STORAGE
-- ============================================
-- IMPORTANTE: Crie o bucket 'produtos-imagens' manualmente no painel Storage
-- e configure como PÚBLICO antes de executar estas políticas

-- Permitir upload apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem fazer upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'produtos-imagens' AND auth.role() = 'authenticated');

-- Permitir leitura pública das imagens
CREATE POLICY "Imagens são públicas"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'produtos-imagens');

-- Permitir atualização apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem atualizar imagens"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'produtos-imagens' AND auth.role() = 'authenticated');

-- Permitir exclusão apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem deletar imagens"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'produtos-imagens' AND auth.role() = 'authenticated');

-- 6. INSERIR CONFIGURAÇÃO INICIAL (OPCIONAL)
-- ============================================
-- Descomente e edite com suas informações

-- INSERT INTO configuracoes (nome_loja, descricao_loja, whatsapp, instagram)
-- VALUES (
--   'Minha Loja',
--   'Encontre os melhores produtos com qualidade e preço justo',
--   '5511999999999',
--   'https://instagram.com/minhaloja'
-- );

-- 7. INSERIR PRODUTOS DE EXEMPLO (OPCIONAL)
-- ============================================
-- Descomente para adicionar produtos de teste

-- INSERT INTO produtos (nome, descricao, preco, categoria, ativo, ordem)
-- VALUES 
--   ('Produto 1', 'Descrição do produto 1', 99.90, 'Categoria A', true, 1),
--   ('Produto 2', 'Descrição do produto 2', 149.90, 'Categoria B', true, 2),
--   ('Produto 3', 'Descrição do produto 3', 79.90, 'Categoria A', true, 3);

-- ============================================
-- SETUP CONCLUÍDO!
-- ============================================
-- Próximos passos:
-- 1. Criar bucket 'produtos-imagens' no Storage (se ainda não criou)
-- 2. Criar usuário admin em Authentication > Users
-- 3. Configurar variáveis de ambiente no projeto (.env)
-- 4. Iniciar o projeto: npm run dev
