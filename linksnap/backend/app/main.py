"""Ponto de entrada da aplicação FastAPI do LinkSnap."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.routers import links

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LinkSnap API",
    description="Encurtador de links com estatísticas de acesso.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check antes do router, para não ser capturado pela rota /{codigo}.
@app.get("/health", tags=["health"])
def health_check() -> dict:
    """Verifica se a API está no ar."""
    return {"status": "ok", "servico": "LinkSnap API"}


app.include_router(links.router)
