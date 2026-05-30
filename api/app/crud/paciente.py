from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.paciente import Paciente
from app.schemas.paciente import PacienteCreate, PacienteUpdate


def get_paciente(db: Session, paciente_id: int) -> Optional[Paciente]:
    """Busca um paciente pelo ID."""
    return db.query(Paciente).filter(Paciente.id == paciente_id).first()


def get_paciente_by_cpf(db: Session, cpf: str) -> Optional[Paciente]:
    """Busca um paciente pelo CPF."""
    return db.query(Paciente).filter(Paciente.cpf == cpf).first()


def get_pacientes(
    db: Session, skip: int = 0, limit: int = 100
) -> List[Paciente]:
    """Retorna lista paginada de pacientes."""
    return db.query(Paciente).offset(skip).limit(limit).all()


def create_paciente(db: Session, paciente: PacienteCreate) -> Paciente:
    """Cria um novo paciente no banco de dados."""
    db_paciente = Paciente(**paciente.model_dump())
    db.add(db_paciente)
    db.commit()
    db.refresh(db_paciente)
    return db_paciente


def update_paciente(
    db: Session, paciente_id: int, paciente_update: PacienteUpdate
) -> Optional[Paciente]:
    """Atualiza os dados de um paciente existente."""
    db_paciente = get_paciente(db, paciente_id)
    if not db_paciente:
        return None
    update_data = paciente_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_paciente, field, value)
    db.commit()
    db.refresh(db_paciente)
    return db_paciente


def delete_paciente(db: Session, paciente_id: int) -> bool:
    """Remove um paciente do banco de dados. Retorna True se deletado."""
    db_paciente = get_paciente(db, paciente_id)
    if not db_paciente:
        return False
    db.delete(db_paciente)
    db.commit()
    return True
