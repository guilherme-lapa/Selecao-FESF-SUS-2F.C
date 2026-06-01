# 🔗 LinkSnap — Encurtador de Links

Aplicação **fullstack** para encurtar links e acompanhar estatísticas de acesso.

- **Back-end:** Python + FastAPI + SQLAlchemy
- **Front-end:** React + Next.js (App Router) + TypeScript + Tailwind CSS

---

## ✨ Funcionalidades

- Encurtamento com **código aleatório** ou **alias personalizado**
- Verificação de disponibilidade de alias e de aliases reservados
- **Redirecionamento** do código curto para a URL original
- Registro de cada acesso com **data e hora**
- Página de **estatísticas**: total de cliques + histórico completo
- Listagem dos links criados com busca
- Copiar link curto com um clique
- Validação de URL e de formato de alias (no front e no back-end)

---

## 🗂️ Estrutura

```
linksnap/
├── backend/                 # API FastAPI
│   └── app/
│       ├── core/            # Banco de dados + geração de código
│       ├── models/          # Modelos SQLAlchemy (Link, Clique)
│       ├── schemas/         # Schemas Pydantic (validação)
│       ├── routers/         # Endpoints REST + redirecionamento
│       └── main.py
└── frontend/                # Aplicação Next.js
    └── src/
        ├── app/             # Rotas (App Router)
        ├── components/
        │   ├── ui/          # Componentes reutilizáveis
        │   └── features/    # Componentes de domínio
        ├── hooks/           # useLinks, useCopiar
        ├── lib/api/         # Comunicação com a API
        ├── types/           # Tipos do domínio
        └── utils/           # Funções utilitárias
```

A separação em camadas mantém os componentes livres de lógica de
requisição: **componentes → hooks → lib/api → cliente HTTP**.

---

## 🚀 Como executar

> Pré-requisitos: **Python 3.10+** e **Node.js 18+**.

### 1. Back-end

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API em **http://localhost:8000** · Documentação em **http://localhost:8000/docs**

### 2. Front-end

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Aplicação em **http://localhost:3000**

---

## 🔌 Endpoints

| Método   | Rota             | Descrição                              |
| -------- | ---------------- | -------------------------------------- |
| `POST`   | `/links`         | Cria um link (aleatório ou com alias)  |
| `GET`    | `/links`         | Lista os links (aceita `?busca=`)      |
| `GET`    | `/links/{cod}`   | Detalha um link com histórico          |
| `DELETE` | `/links/{cod}`   | Remove um link                         |
| `GET`    | `/{cod}`         | Redireciona e registra o acesso        |

---

## 🛠️ Tecnologias

| Camada    | Stack                                            |
| --------- | ------------------------------------------------ |
| Back-end  | Python, FastAPI, SQLAlchemy, Pydantic, SQLite    |
| Front-end | React, Next.js, TypeScript, Tailwind CSS         |

---

## 📋 Decisões de projeto

- Os códigos aleatórios usam o módulo `secrets` (geração segura), com
  verificação de colisão antes de gravar.
- A entidade **Clique** é separada de **Link** (relação 1-para-N), o que
  permite guardar o histórico completo de acessos com data/hora.
- A rota de redirecionamento `/{codigo}` é registrada após as rotas
  específicas e há uma lista de códigos reservados para evitar conflitos.
- **TypeScript** em modo `strict` no front-end, com tipos espelhando o
  contrato da API.
