from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import consultas, pacientes

# Cria as tabelas no banco de dados ao iniciar
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Saúde API",
    description="""
## API de Gerenciamento de Saúde

Sistema para cadastro e acompanhamento de **pacientes** e **consultas médicas**.

### Funcionalidades
- Cadastro completo de pacientes
- Agendamento e gerenciamento de consultas
- Rastreamento de status de consultas (agendada, realizada, cancelada)
    """,
    version="1.0.0",
    contact={
        "name": "Guilherme Lapa",
        "email": "contato.guilhermelapa@gmail.com",
    },
    license_info={"name": "MIT"},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pacientes.router, prefix="/api/v1")
app.include_router(consultas.router, prefix="/api/v1")


@app.get("/", tags=["Root"])
def read_root():
    """Endpoint raiz com informações da API."""
    return {
        "message": "Bem-vindo à Saúde API",
        "docs": "/docs",
        "redoc": "/redoc",
        "versao": "1.0.0",
    }


@app.get("/health", tags=["Root"])
def health_check():
    """Verificação de saúde da aplicação."""
    return {"status": "ok"}
