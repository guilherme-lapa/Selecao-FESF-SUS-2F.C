"""Ponto de entrada da aplicação FastAPI do Clima.

Diferente dos outros projetos, este não usa banco de dados: atua como
um intermediário (proxy/orquestrador) para a API externa Open-Meteo.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import clima

app = FastAPI(
    title="Clima API",
    description="Consulta clima atual e previsão via Open-Meteo.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
def health_check() -> dict:
    """Verifica se a API está no ar."""
    return {"status": "ok", "servico": "Clima API"}


app.include_router(clima.router)
