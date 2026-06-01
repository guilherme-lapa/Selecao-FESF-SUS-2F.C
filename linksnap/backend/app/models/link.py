"""Modelos de dados (camada de persistência).

Um Link possui muitos Cliques — cada acesso ao link curto gera um
registro de Clique com a data/hora, permitindo montar o histórico.
"""

from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


def agora_utc() -> datetime:
    """Retorna o instante atual em UTC (timezone-aware)."""
    return datetime.now(timezone.utc)


class Link(Base):
    """Representa um link encurtado."""

    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String, unique=True, nullable=False, index=True)
    url_original = Column(String, nullable=False)
    criado_em = Column(DateTime, default=agora_utc, nullable=False)

    cliques = relationship(
        "Clique",
        back_populates="link",
        cascade="all, delete-orphan",
    )


class Clique(Base):
    """Representa um único acesso a um link encurtado."""

    __tablename__ = "cliques"

    id = Column(Integer, primary_key=True, index=True)
    link_id = Column(Integer, ForeignKey("links.id"), nullable=False)
    acessado_em = Column(DateTime, default=agora_utc, nullable=False)

    link = relationship("Link", back_populates="cliques")
