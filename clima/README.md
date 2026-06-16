# 🌤️ Clima — Previsão do Tempo

Aplicação **fullstack** que busca o clima atual e a previsão dos próximos
dias de qualquer cidade, consumindo a API externa **Open-Meteo**.

- **Back-end:** Python + FastAPI (atua como intermediário/orquestrador)
- **Front-end:** React + Next.js (App Router) + TypeScript + Tailwind CSS

> O back-end **não usa banco de dados**: ele orquestra duas chamadas à
> API pública Open-Meteo (geocoding + previsão), traduz os códigos de
> tempo e entrega uma resposta pronta para o front-end.

---

## ✨ Funcionalidades

- Busca de clima por nome de cidade
- **Clima atual:** temperatura, condição, umidade e vento
- **Previsão de 5 dias:** mínima, máxima e condição de cada dia
- Tradução dos códigos meteorológicos (WMO) em descrições e ícones
- Tratamento de erros: cidade não encontrada e falha do serviço externo

---

## 🗂️ Estrutura

```
clima/
├── docker-compose.yml       # Orquestra back + front com Docker
├── backend/                 # API FastAPI
│   ├── Dockerfile           # Imagem do back-end
│   ├── .dockerignore
│   └── app/
│       ├── core/            # Tradução de códigos de clima (WMO)
│       ├── schemas/         # Schemas Pydantic (resposta)
│       ├── services/        # Integração com Open-Meteo + orquestração
│       │   ├── open_meteo.py     # Cliente HTTP da API externa
│       │   └── clima_service.py  # Orquestra geocoding + previsão
│       ├── routers/         # Endpoint REST
│       └── main.py
└── frontend/                # Aplicação Next.js
    ├── Dockerfile           # Imagem do front-end
    ├── .dockerignore
    └── src/
        ├── app/             # Rotas (App Router)
        ├── components/      # ui/ e features/
        ├── hooks/           # useClima
        ├── lib/             # api/ + utilitários
        └── types/           # Tipos do domínio
```

---

## 🚀 Como executar

### 🐳 Opção A — Com Docker (recomendado)

> Pré-requisito: **Docker Desktop** instalado e em execução.
> Sobe back-end e front-end juntos com um único comando.

Na raiz do projeto (onde fica o `docker-compose.yml`):

```bash
docker compose up --build
```

Aguarde a construção das imagens (a primeira vez pode levar alguns
minutos). Depois acesse:

- **Aplicação:** http://localhost:3000
- **Documentação da API:** http://localhost:8000/docs

Para encerrar: `Ctrl + C` no terminal e, para remover os containers,
`docker compose down`.

---

### 💻 Opção B — Manualmente (sem Docker)

> Pré-requisitos: **Python 3.10+** e **Node.js 18+**.
> Não é necessária nenhuma chave de API — o Open-Meteo é gratuito e aberto.

#### 1. Back-end

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API em **http://localhost:8000** · Documentação em **http://localhost:8000/docs**

#### 2. Front-end

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Aplicação em **http://localhost:3000**

---

## 🔌 Endpoint

| Método | Rota                | Descrição                              |
| ------ | ------------------- | -------------------------------------- |
| `GET`  | `/clima?cidade=...` | Clima atual + previsão de 5 dias       |

Exemplo: `GET /clima?cidade=Salvador`

---

## 🛠️ Tecnologias

| Camada    | Stack                                          |
| --------- | ---------------------------------------------- |
| Back-end  | Python, FastAPI, Pydantic, httpx               |
| Front-end | React, Next.js, TypeScript, Tailwind CSS       |
| Infra     | Docker, Docker Compose                         |
| Dados     | Open-Meteo API (gratuita, sem chave)           |

---

## 📋 Decisões de projeto

- O back-end funciona como **proxy/orquestrador**: o front nunca fala
  direto com o Open-Meteo, o que permite tratar erros, traduzir códigos
  e simplificar a resposta num só lugar.
- A integração externa fica isolada em `services/open_meteo.py`, separada
  da regra de orquestração em `services/clima_service.py`.
- Uso de `httpx` assíncrono para as chamadas externas, aproveitando o
  modelo async do FastAPI.
- Sem banco de dados — a arquitetura foi adaptada ao problema, que é de
  consulta a um serviço externo, não de persistência.
- **Containerização com Docker:** back-end e front-end têm seus próprios
  `Dockerfile`, orquestrados por um `docker-compose.yml`, permitindo subir
  toda a aplicação com um único comando, sem instalar Python ou Node
  localmente.

---

Dados meteorológicos fornecidos por [Open-Meteo](https://open-meteo.com/)
sob licença CC BY 4.0.