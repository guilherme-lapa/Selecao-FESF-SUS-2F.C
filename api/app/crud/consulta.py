from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.consulta import Consulta
from app.schemas.consulta import ConsultaCreate, ConsultaUpdate


def get_consulta(db: Session, consulta_id: int) -> Optional[Consulta]:
    """Busca uma consulta pelo ID."""
    return db.query(Consulta).filter(Consulta.id == consulta_id).first()


def get_consultas(
    db: Session, skip: int = 0, limit: int = 100
) -> List[Consulta]:
    """Retorna lista paginada de consultas."""
    return db.query(Consulta).offset(skip).limit(limit).all()


def get_consultas_por_paciente(
    db: Session, paciente_id: int
) -> List[Consulta]:
    """Retorna todas as consultas de um paciente específico."""
    return (
        db.query(Consulta).filter(Consulta.paciente_id == paciente_id).all()
    )


def create_consulta(db: Session, consulta: ConsultaCreate) -> Consulta:
    """Cria uma nova consulta no banco de dados."""
    db_consulta = Consulta(**consulta.model_dump())
    db.add(db_consulta)
    db.commit()
    db.refresh(db_consulta)
    return db_consulta


def update_consulta(
    db: Session, consulta_id: int, consulta_update: ConsultaUpdate
) -> Optional[Consulta]:
    """Atualiza os dados de uma consulta existente."""
    db_consulta = get_consulta(db, consulta_id)
    if not db_consulta:
        return None
    update_data = consulta_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_consulta, field, value)
    db.commit()
    db.refresh(db_consulta)
    return db_consulta


def delete_consulta(db: Session, consulta_id: int) -> bool:
    """Remove uma consulta do banco de dados. Retorna True se deletada."""
    db_consulta = get_consulta(db, consulta_id)
    if not db_consulta:
        return False
    db.delete(db_consulta)
    db.commit()
    return True
