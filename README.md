# PavSoftware Portfólio Full-Stack

Uma plataforma de portfólio moderna e de alto desempenho, construída com React, Node.js e PostgreSQL.

---

## 🏗️ Arquitetura

- **Monorepo**: Gerido com NPM Workspaces.
- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, Sequelize ORM, PostgreSQL.
- **Base de Dados**: PostgreSQL com migrations/sync do Sequelize.
- **Autenticação**: JWT com rotas protegidas.

---

## 📁 Estrutura do Projeto

```bash
apps/
  web/          # Frontend React + Vite
  api/          # API Node + Express
```
⚙️ Instruções de Setup
📌 Pré-requisitos
Node.js (v18+)
PostgreSQL
📥 Instalação
Clonar o repositório
Instalar dependências em todas as aplicações:
npm install
🔧 Configuração
Criar um ficheiro .env em apps/api/ e apps/web/ baseado no .env.example.
API .env
PORT=5000
DB_NAME=portfolio
DB_USER=postgres
DB_PASS=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
🚀 Execução Local

Para executar frontend e backend em simultâneo:

npm run dev

Ou separadamente:

Frontend:
npm run dev:web
Backend:
npm run dev:api
✨ Funcionalidades
📊 Portfólio Dinâmico (gestão de projetos via admin)
🖼️ Galeria de imagens dinâmica
💬 Sistema de testemunhos (feedback de clientes)
🛠️ Painel Admin completo (CRUD)
🎨 Design premium com dark mode estilo fintech
📱 Totalmente responsivo (mobile-first)
⚡ Animações suaves com Framer Motion
👨‍💻 Autor

Desenvolvido por PavSoftware

GitHub: https://github.com/pavlovclaymor

📄 Licença

MIT
