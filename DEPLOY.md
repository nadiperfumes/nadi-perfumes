# 🚀 Guia de Deploy

## Deploy no Vercel (Recomendado)

### Opção 1: Via Interface Web (Mais Fácil)

1. **Faça push do código para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repo.git
   git push -u origin main
   ```

2. **Acesse o Vercel**
   - Vá para https://vercel.com
   - Faça login com sua conta GitHub
   - Clique em "Add New Project"
   - Selecione seu repositório

3. **Configure as Variáveis de Ambiente**
   - Na tela de configuração, vá em "Environment Variables"
   - Adicione:
     - `VITE_SUPABASE_URL` = sua_url_do_supabase
     - `VITE_SUPABASE_ANON_KEY` = sua_chave_anonima

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build finalizar
   - Seu site estará no ar! 🎉

### Opção 2: Via CLI

1. **Instale a CLI do Vercel**
   ```bash
   npm i -g vercel
   ```

2. **Faça login**
   ```bash
   vercel login
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

---

## Deploy no Netlify

### Opção 1: Via Interface Web

1. **Faça push do código para o GitHub** (mesmo processo acima)

2. **Acesse o Netlify**
   - Vá para https://netlify.com
   - Faça login
   - Clique em "Add new site" > "Import an existing project"
   - Conecte com GitHub e selecione seu repositório

3. **Configure o Build**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Configure as Variáveis de Ambiente**
   - Vá em "Site settings" > "Environment variables"
   - Adicione:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Deploy**
   - Clique em "Deploy site"
   - Aguarde o build finalizar

### Opção 2: Via CLI

1. **Instale a CLI do Netlify**
   ```bash
   npm i -g netlify-cli
   ```

2. **Faça login**
   ```bash
   netlify login
   ```

3. **Inicialize o site**
   ```bash
   netlify init
   ```

4. **Configure as variáveis de ambiente**
   ```bash
   netlify env:set VITE_SUPABASE_URL "sua_url"
   netlify env:set VITE_SUPABASE_ANON_KEY "sua_chave"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

---

## Configurar Domínio Customizado

### No Vercel
1. Vá em "Settings" > "Domains"
2. Adicione seu domínio
3. Configure os DNS conforme instruções

### No Netlify
1. Vá em "Domain settings"
2. Clique em "Add custom domain"
3. Configure os DNS conforme instruções

---

## Atualizações Automáticas

Ambas as plataformas fazem deploy automático quando você faz push para o GitHub:

```bash
git add .
git commit -m "Atualização"
git push
```

O site será atualizado automaticamente! 🚀

---

## Checklist Pré-Deploy

- [ ] Arquivo `.env` configurado localmente
- [ ] Projeto testado localmente (`npm run dev`)
- [ ] Código commitado no Git
- [ ] Repositório no GitHub (se usar interface web)
- [ ] Variáveis de ambiente configuradas na plataforma
- [ ] Build testado (`npm run build`)

---

## Troubleshooting

### Build falha com erro de variáveis de ambiente
- Verifique se as variáveis foram adicionadas corretamente
- Certifique-se de que começam com `VITE_`
- Refaça o deploy após adicionar as variáveis

### Site carrega mas não mostra produtos
- Verifique as variáveis de ambiente no painel da plataforma
- Verifique se o Supabase está configurado corretamente
- Abra o console do navegador (F12) para ver erros

### Erro 404 ao acessar /admin ou /login
- Adicione um arquivo `_redirects` (Netlify) ou `vercel.json` (Vercel)

**Para Netlify**, crie `public/_redirects`:
```
/*    /index.html   200
```

**Para Vercel**, crie `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🎉 Pronto!

Seu site está no ar e pronto para receber clientes!
