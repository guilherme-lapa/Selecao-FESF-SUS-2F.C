from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class PacienteBase(BaseModel):
    nome: str = Field(..., min_length=2, max_length=150, examples=["Maria da Silva"])
    cpf: str = Field(..., pattern=r"^\d{3}\.\d{3}\.\d{3}-\d{2}$", examples=["123.456.789-00"])
    data_nascimento: date = Field(..., examples=["1990-05-15"])
    telefone: Optional[str] = Field(None, examples=["(71) 99999-9999"])
    email: Optional[EmailStr] = Field(None, examples=["maria@email.com"])
    endereco: Optional[str] = Field(None, examples=["Rua das Flores, 123 - Salvador, BA"])


class PacienteCreate(PacienteBase):
    """Schema para criação de paciente."""
    pass


class PacienteUpdate(BaseModel):
    """Schema para atualização parcial de paciente (PATCH)."""
    nome: Optional[str] = Field(None, min_length=2, max_length=150)
    telefone: Optional[str] = None
    email: Optional[EmailStr] = None
    endereco: Optional[str] = None


class PacienteResponse(PacienteBase):
    """Schema de resposta com dados completos do paciente."""
    id: int
    criado_em: datetime
    atualizado_em: datetime

    model_config = {"from_attributes": True}
