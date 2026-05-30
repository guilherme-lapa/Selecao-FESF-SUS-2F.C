from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.crud import consulta as crud_consulta
from app.crud import paciente as crud_paciente
from app.database import get_db
from app.schemas.consulta import ConsultaCreate, ConsultaResponse, ConsultaUpdate

router = APIRouter(prefix="/consultas", tags=["Consultas"])


@router.get(
    "/",
    response_model=List[ConsultaResponse],
    summary="Listar consultas",
    description="Retorna a lista paginada de todas as consultas.",
)
def listar_consultas(
    skip: int = Query(0, ge=0, description="Registros a pular"),
    limit: int = Query(100, ge=1, le=500, description="Máximo de registros"),
    db: Session = Depends(get_db),
):
    return crud_consulta.get_consultas(db, skip=skip, limit=limit)


@router.post(
    "/",
    response_model=ConsultaResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Agendar consulta",
    description="Agenda uma nova consulta para um paciente existente.",
)
def agendar_consulta(consulta: ConsultaCreate, db: Session = Depends(get_db)):
    paciente = crud_paciente.get_paciente(db, paciente_id=consulta.paciente_id)
    if not paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paciente não encontrado. Verifique o paciente_id.",
        )
    return crud_consulta.create_consulta(db=db, consulta=consulta)


@router.get(
    "/{consulta_id}",
    response_model=ConsultaResponse,
    summary="Buscar consulta por ID",
    description="Retorna os dados de uma consulta específica.",
)
def buscar_consulta(consulta_id: int, db: Session = Depends(get_db)):
    db_consulta = crud_consulta.get_consulta(db, consulta_id=consulta_id)
    if not db_consulta:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consulta não encontrada.",
        )
    return db_consulta


@router.get(
    "/paciente/{paciente_id}",
    response_model=List[ConsultaResponse],
    summary="Listar consultas de um paciente",
    description="Retorna todas as consultas associadas a um paciente específico.",
)
def listar_consultas_paciente(paciente_id: int, db: Session = Depends(get_db)):
    paciente = crud_paciente.get_paciente(db, paciente_id=paciente_id)
    if not paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paciente não encontrado.",
        )
    return crud_consulta.get_consultas_por_paciente(db, paciente_id=paciente_id)


@router.patch(
    "/{consulta_id}",
    response_model=ConsultaResponse,
    summary="Atualizar consulta",
    description="Atualiza dados ou status de uma consulta existente.",
)
def atualizar_consulta(
    consulta_id: int,
    consulta: ConsultaUpdate,
    db: Session = Depends(get_db),
):
    db_consulta = crud_consulta.update_consulta(
        db, consulta_id=consulta_id, consulta_update=consulta
    )
    if not db_consulta:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consulta não encontrada.",
        )
    return db_consulta


@router.delete(
    "/{consulta_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Cancelar/Remover consulta",
    description="Remove permanentemente uma consulta do sistema.",
)
def remover_consulta(consulta_id: int, db: Session = Depends(get_db)):
    deleted = crud_consulta.delete_consulta(db, consulta_id=consulta_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consulta não encontrada.",
        )
