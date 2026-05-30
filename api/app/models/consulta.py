import enum
from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class StatusConsulta(str, enum.Enum):
    agendada = "agendada"
    realizada = "realizada"
    cancelada = "cancelada"


class Consulta(Base):
    """Model SQLAlchemy representando uma consulta médica."""

    __tablename__ = "consultas"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(
        Integer, ForeignKey("pacientes.id", ondelete="CASCADE"), nullable=False
    )
    data_hora = Column(DateTime, nullable=False)
    especialidade = Column(String(100), nullable=False)
    medico = Column(String(150), nullable=True)
    observacoes = Column(Text, nullable=True)
    status = Column(
        Enum(StatusConsulta), default=StatusConsulta.agendada, nullable=False
    )
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    paciente = relationship("Paciente", back_populates="consultas")

    def __repr__(self) -> str:
        return (
            f"<Consulta id={self.id} paciente_id={self.paciente_id} "
            f"especialidade='{self.especialidade}' status='{self.status}'>"
        )
