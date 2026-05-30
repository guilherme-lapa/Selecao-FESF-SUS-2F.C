# 🏥 Saúde API

API RESTful para gerenciamento de pacientes e consultas médicas, desenvolvida com **FastAPI**, **SQLAlchemy** e **Python**.

## 🚀 Tecnologias

- **FastAPI** — framework web moderno e de alta performance
- **SQLAlchemy 2.0** — ORM para mapeamento objeto-relacional
- **Pydantic v2** — validação de dados e serialização
- **SQLite** (dev) / **PostgreSQL** (produção)
- **Pytest + pytest-cov** — testes unitários e de integração
- **Uvicorn** — servidor ASGI

## 📁 Estrutura do Projeto

```
saude-api/
├── app/
│   ├── main.py          # Ponto de entrada da aplicação
│   ├── database.py      # Configuração do SQLAlchemy e sessão do banco
│   ├── models/          # Models SQLAlchemy (tabelas do banco)
│   │   ├── paciente.py
│   │   └── consulta.py
│   ├── schemas/         # Schemas Pydantic (validação e serialização)
│   │   ├── paciente.py
│   │   └── consulta.py
│   ├── crud/            # Operações de banco de dados (Create, Read, Update, Delete)
│   │   ├── paciente.py
│   │   └── consulta.py
│   └── routers/         # Endpoints da API organizados por domínio
│       ├── pacientes.py
│       └── consultas.py
├── tests/
│   ├── conftest.py      # Fixtures e configuração dos testes
│   ├── test_pacientes.py
│   └── test_consultas.py
├── .env.example
├── pytest.ini
├── requirements.txt
└── README.md
```

## ⚙️ Como Rodar Localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/saude-api.git
cd saude-api
```

### 2. Crie e ative o ambiente virtual
```bash
python -m venv .venv
source .venv/bin/activate      # Linux/macOS
.venv\Scripts\activate         # Windows
```

### 3. Instale as dependências
```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env se necessário
```

### 5. Inicie o servidor
```bash
uvicorn app.main:app --reload
```

A API estará disponível em `http://localhost:8000`

## 📖 Documentação

A documentação é gerada automaticamente pelo FastAPI:

| Interface | URL |
|-----------|-----|
| **Swagger UI** | http://localhost:8000/docs |
| **ReDoc** | http://localhost:8000/redoc |

## 🧪 Testes

```bash
# Executar todos os testes com cobertura
pytest

# Apenas os testes de pacientes
pytest tests/test_pacientes.py -v

# Gerar relatório HTML de cobertura
pytest --cov-report=html
```

## 🔗 Endpoints

### Pacientes
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/pacientes/` | Listar todos os pacientes |
| `POST` | `/api/v1/pacientes/` | Cadastrar novo paciente |
| `GET` | `/api/v1/pacientes/{id}` | Buscar paciente por ID |
| `PATCH` | `/api/v1/pacientes/{id}` | Atualizar dados do paciente |
| `DELETE` | `/api/v1/pacientes/{id}` | Remover paciente |

### Consultas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/consultas/` | Listar todas as consultas |
| `POST` | `/api/v1/consultas/` | Agendar nova consulta |
| `GET` | `/api/v1/consultas/{id}` | Buscar consulta por ID |
| `GET` | `/api/v1/consultas/paciente/{id}` | Listar consultas de um paciente |
| `PATCH` | `/api/v1/consultas/{id}` | Atualizar consulta |
| `DELETE` | `/api/v1/consultas/{id}` | Remover consulta |

## 📋 Exemplo de Uso

### Cadastrar um paciente
```bash
curl -X POST http://localhost:8000/api/v1/pacientes/ \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria da Silva",
    "cpf": "123.456.789-00",
    "data_nascimento": "1990-05-15",
    "telefone": "(71) 99999-9999",
    "email": "maria@email.com"
  }'
```

### Agendar uma consulta
```bash
curl -X POST http://localhost:8000/api/v1/consultas/ \
  -H "Content-Type: application/json" \
  -d '{
    "paciente_id": 1,
    "data_hora": "2025-06-20T10:00:00",
    "especialidade": "Clínica Geral",
    "medico": "Dr. Carlos Souza"
  }'
```

## 🛠️ Autor

Desenvolvido por **Guilherme Lapa** — [contato.guilhermelapa@gmail.com](mailto:contato.guilhermelapa@gmail.com)
