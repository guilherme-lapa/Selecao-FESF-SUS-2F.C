from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.consulta import StatusConsulta


class ConsultaBase(BaseModel):
    paciente_id: int = Field(..., examples=[1])
    data_hora: datetime = Field(..., examples=["2025-06-20T10:00:00"])
    especialidade: str = Field(..., min_length=2, max_length=100, examples=["Clínica Geral"])
    medico: Optional[str] = Field(None, max_length=150, examples=["Dr. Carlos Souza"])
    observacoes: Optional[str] = Field(None, examples=["Paciente com histórico de hipertensão."])


class ConsultaCreate(ConsultaBase):
    """Schema para agendamento de uma nova consulta."""
    pass


class ConsultaUpdate(BaseModel):
    """Schema para atualização parcial de consulta."""
    data_hora: Optional[datetime] = None
    especialidade: Optional[str] = Field(None, min_length=2, max_length=100)
    medico: Optional[str] = Field(None, max_length=150)
    observacoes: Optional[str] = None
    status: Optional[StatusConsulta] = None


class ConsultaResponse(ConsultaBase):
    """Schema de resposta com dados completos da consulta."""
    id: int
    status: StatusConsulta
    criado_em: datetime
    atualizado_em: datetime

    model_config = {"from_attributes": True}
