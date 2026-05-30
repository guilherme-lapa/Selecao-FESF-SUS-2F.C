from datetime import datetime

from sqlalchemy import Column, Date, DateTime, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Paciente(Base):
    """Model SQLAlchemy representando um paciente."""

    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(150), nullable=False)
    cpf = Column(String(14), unique=True, index=True, nullable=False)
    data_nascimento = Column(Date, nullable=False)
    telefone = Column(String(20), nullable=True)
    email = Column(String(100), nullable=True)
    endereco = Column(String(250), nullable=True)
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    consultas = relationship(
        "Consulta", back_populates="paciente", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Paciente id={self.id} nome='{self.nome}' cpf='{self.cpf}'>"
