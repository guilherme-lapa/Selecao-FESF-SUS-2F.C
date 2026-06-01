"""Schemas Pydantic (validação e serialização).

Separam o contrato público da API da estrutura de persistência.
"""

import re
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator

# Alias permitido: 3 a 30 caracteres, apenas letras, números, hífen e underscore.
PADRAO_ALIAS = re.compile(r"^[a-zA-Z0-9_-]{3,30}$")


class LinkCreate(BaseModel):
    """Dados de entrada para criar um link encurtado."""

    url_original: str = Field(..., min_length=1)
    alias: Optional[str] = Field(
        None,
        description="Código personalizado opcional (3-30 caracteres).",
    )

    @field_validator("url_original")
    @classmethod
    def validar_url(cls, valor: str) -> str:
        """Garante que a URL comece com http:// ou https://."""
        valor = valor.strip()
        if not valor.startswith(("http://", "https://")):
            raise ValueError("A URL deve começar com http:// ou https://")
        return valor

    @field_validator("alias")
    @classmethod
    def validar_alias(cls, valor: Optional[str]) -> Optional[str]:
        """Valida o formato do alias quando informado."""
        if valor is None or valor == "":
            return None
        if not PADRAO_ALIAS.match(valor):
            raise ValueError(
                "Alias deve ter 3-30 caracteres: letras, números, '-' ou '_'."
            )
        return valor


class CliqueResponse(BaseModel):
    """Representa um acesso no histórico."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    acessado_em: datetime


class LinkResponse(BaseModel):
    """Dados de saída de um link, com contagem de cliques."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    codigo: str
    url_original: str
    criado_em: datetime
    total_cliques: int = 0


class LinkDetalhe(LinkResponse):
    """Detalhe de um link incluindo o histórico completo de cliques."""

    cliques: List[CliqueResponse] = []
