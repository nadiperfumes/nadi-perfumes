# 🔧 Comandos Úteis

## 📦 Instalação e Desenvolvimento

### Instalar dependências
```bash
npm install
```

### Iniciar servidor de desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:5173

### Build para produção
```bash
npm run build
```
Gera pasta `dist/` com arquivos otimizados

### Preview do build
```bash
npm run preview
```
Testa o build localmente antes do deploy

## 🗄️ Supabase

### Acessar projeto
```bash
# Abra no navegador
https://supabase.com/dashboard
```

### Ver logs em tempo real
No painel do Supabase:
- Database > Logs
- Storage > Logs
- Auth > Logs

### Backup do banco de dados
No painel do Supabase:
- Database > Backups
- Clique em "Create backup"

## 🚀 Deploy

### Vercel

#### Via CLI
```bash
# Instalar CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Configurar variáveis de ambiente
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Netlify

#### Via CLI
```bash
# Instalar CLI
npm i -g netlify-cli

# Login
netlify login

# Inicializar
netlify init

# Deploy
netlify deploy --prod
```

#### Configurar variáveis de ambiente
```bash
netlify env:set VITE_SUPABASE_URL "sua_url"
netlify env:set VITE_SUPABASE_ANON_KEY "sua_chave"
```

## 🔄 Git

### Inicializar repositório
```bash
git init
git add .
git commit -m "Initial commit"
```

### Conectar com GitHub
```bash
git remote add origin https://github.com/seu-usuario/seu-repo.git
git branch -M main
git push -u origin main
```

### Atualizar código
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

### Ver status
```bash
git status
```

### Ver histórico
```bash
git log --oneline
```

## 🧹 Limpeza

### Limpar cache do npm
```bash
npm cache clean --force
```

### Remover node_modules e reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
```

### Limpar build
```bash
rm -rf dist
```

## 🔍 Debugging

### Ver erros no console
Abra o navegador e pressione `F12`

### Ver logs do Vite
O terminal mostra logs em tempo real durante `npm run dev`

### Verificar variáveis de ambiente
```bash
# No terminal (Linux/Mac)
echo $VITE_SUPABASE_URL

# No terminal (Windows PowerShell)
$env:VITE_SUPABASE_URL
```

## 📊 Análise

### Ver tamanho do build
```bash
npm run build
# Veja o output no terminal
```

### Analisar bundle
Adicione ao `package.json`:
```json
"scripts": {
  "analyze": "vite build --mode analyze"
}
```

## 🔐 Segurança

### Verificar vulnerabilidades
```bash
npm audit
```

### Corrigir vulnerabilidades
```bash
npm audit fix
```

### Atualizar dependências
```bash
npm update
```

## 📝 Tailwind

### Gerar arquivo de configuração
```bash
npx tailwindcss init -p
```

### Ver classes disponíveis
Consulte: https://tailwindcss.com/docs

## 🎨 Customização

### Adicionar nova página
1. Crie arquivo em `src/pages/NovaPagina.jsx`
2. Adicione rota em `src/App.jsx`:
```jsx
<Route path="/nova-pagina" element={<NovaPagina />} />
```

### Adicionar novo componente
1. Crie arquivo em `src/components/NovoComponente.jsx`
2. Importe onde precisar:
```jsx
import NovoComponente from './components/NovoComponente'
```

## 🔄 Atualização de Dependências

### Ver dependências desatualizadas
```bash
npm outdated
```

### Atualizar todas as dependências
```bash
npm update
```

### Atualizar dependência específica
```bash
npm install react@latest
```

## 🧪 Testes (Futuro)

### Instalar Vitest
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Adicionar script de teste
No `package.json`:
```json
"scripts": {
  "test": "vitest"
}
```

## 📱 Mobile

### Testar em dispositivo móvel
1. Inicie o servidor: `npm run dev`
2. Encontre seu IP local:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. Acesse no celular: `http://SEU_IP:5173`

### Usar ngrok para teste remoto
```bash
# Instalar ngrok
npm i -g ngrok

# Expor porta local
ngrok http 5173
```

## 🔧 Troubleshooting

### Porta 5173 já em uso
```bash
# Matar processo na porta 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Ou usar outra porta
npm run dev -- --port 3000
```

### Erro de permissão (Windows)
Execute o terminal como Administrador

### Erro de módulo não encontrado
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentação

### React
https://react.dev

### Vite
https://vitejs.dev

### Supabase
https://supabase.com/docs

### Tailwind CSS
https://tailwindcss.com/docs

### React Router
https://reactrouter.com

### React Query
https://tanstack.com/query/latest

## 💡 Dicas

### Atalhos do VS Code
- `Ctrl + P` - Buscar arquivo
- `Ctrl + Shift + F` - Buscar em todos arquivos
- `Ctrl + /` - Comentar linha
- `Alt + Shift + F` - Formatar código

### Extensões Recomendadas
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

### Snippets Úteis
- `rafce` - React Arrow Function Component Export
- `imr` - Import React
- `imrd` - Import ReactDOM

---

## 🎯 Comandos Mais Usados

```bash
# Desenvolvimento
npm install          # Instalar dependências
npm run dev         # Iniciar servidor

# Deploy
npm run build       # Build para produção
vercel --prod       # Deploy no Vercel
netlify deploy --prod  # Deploy no Netlify

# Git
git add .           # Adicionar mudanças
git commit -m "msg" # Commitar
git push            # Enviar para GitHub

# Manutenção
npm update          # Atualizar dependências
npm audit fix       # Corrigir vulnerabilidades
```

---

**Salve este arquivo para referência rápida! 📌**
