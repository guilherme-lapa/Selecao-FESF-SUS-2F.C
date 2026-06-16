"""Schemas Pydantic — formato da resposta da nossa API ao front-end."""

from typing import List

from pydantic import BaseModel


class Localizacao(BaseModel):
    """Dados da cidade localizada."""

    nome: str
    pais: str | None = None
    latitude: float
    longitude: float


class ClimaAtual(BaseModel):
    """Condições atuais do tempo."""

    temperatura: float
    umidade: int
    vento: float
    descricao: str
    icone: str


class PrevisaoDia(BaseModel):
    """Previsão resumida de um dia."""

    data: str
    temp_min: float
    temp_max: float
    descricao: str
    icone: str


class ClimaResponse(BaseModel):
    """Resposta completa: localização + clima atual + previsão."""

    local: Localizacao
    atual: ClimaAtual
    previsao: List[PrevisaoDia]
