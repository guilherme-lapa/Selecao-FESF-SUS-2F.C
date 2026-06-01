# 🏥 Saúde Frontend

Interface web para o sistema de gerenciamento de pacientes e consultas médicas, desenvolvida com **Next.js 14**, **TypeScript** e **Tailwind CSS**.

## 🚀 Tecnologias

- **Next.js 14** — framework React com App Router e Server Components
- **TypeScript** — tipagem estática para maior segurança e produtividade
- **Tailwind CSS** — estilização utilitária responsiva
- **Fetch API** — comunicação com a Saúde API

## 📁 Estrutura do Projeto

```
saude-frontend/
├── src/
│   ├── app/                   # Rotas com App Router do Next.js 14
│   │   ├── layout.tsx         # Layout global com Navbar
│   │   ├── page.tsx           # Página inicial
│   │   ├── pacientes/
│   │   │   ├── page.tsx       # Listagem e cadastro de pacientes
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Detalhes do paciente + consultas
│   │   └── consultas/
│   │       └── page.tsx       # Listagem de consultas com filtros
│   ├── components/            # Componentes React reutilizáveis
│   │   ├── Navbar.tsx
│   │   ├── PacienteCard.tsx
│   │   ├── PacienteForm.tsx
│   │   └── ConsultaCard.tsx
│   ├── services/
│   │   └── api.ts             # Camada de serviço para a Saúde API
│   └── types/
│       └── index.ts           # Interfaces TypeScript
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## ⚙️ Como Rodar Localmente

> **Pré-requisito:** A [Saúde API](../saude-api) deve estar rodando em `http://localhost:8000`

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/saude-frontend.git
cd saude-frontend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.local.example .env.local
```

### 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📄 Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com acesso rápido |
| `/pacientes` | Listagem e cadastro de pacientes |
| `/pacientes/[id]` | Detalhes do paciente e histórico de consultas |
| `/consultas` | Todas as consultas com filtro por status |

## 🔧 Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run start      # Iniciar versão de produção
npm run lint       # Verificar problemas de código
npm run type-check # Verificar tipagem TypeScript
```

## 🛠️ Autor

Desenvolvido por **Guilherme Lapa** — [contato.guilhermelapa@gmail.com](mailto:contato.guilhermelapa@gmail.com)
