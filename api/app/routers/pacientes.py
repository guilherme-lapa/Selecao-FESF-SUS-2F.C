from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.crud import paciente as crud_paciente
from app.database import get_db
from app.schemas.paciente import PacienteCreate, PacienteResponse, PacienteUpdate

router = APIRouter(prefix="/pacientes", tags=["Pacientes"])


@router.get(
    "/",
    response_model=List[PacienteResponse],
    summary="Listar pacientes",
    description="Retorna a lista paginada de todos os pacientes cadastrados.",
)
def listar_pacientes(
    skip: int = Query(0, ge=0, description="Registros a pular"),
    limit: int = Query(100, ge=1, le=500, description="Máximo de registros"),
    db: Session = Depends(get_db),
):
    return crud_paciente.get_pacientes(db, skip=skip, limit=limit)


@router.post(
    "/",
    response_model=PacienteResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar paciente",
    description="Cadastra um novo paciente. O CPF deve ser único no sistema.",
)
def criar_paciente(paciente: PacienteCreate, db: Session = Depends(get_db)):
    existente = crud_paciente.get_paciente_by_cpf(db, cpf=paciente.cpf)
    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="CPF já cadastrado no sistema.",
        )
    return crud_paciente.create_paciente(db=db, paciente=paciente)


@router.get(
    "/{paciente_id}",
    response_model=PacienteResponse,
    summary="Buscar paciente por ID",
    description="Retorna os dados de um paciente específico pelo seu ID.",
)
def buscar_paciente(paciente_id: int, db: Session = Depends(get_db)):
    db_paciente = crud_paciente.get_paciente(db, paciente_id=paciente_id)
    if not db_paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paciente não encontrado.",
        )
    return db_paciente


@router.patch(
    "/{paciente_id}",
    response_model=PacienteResponse,
    summary="Atualizar paciente",
    description="Atualiza parcialmente os dados de um paciente existente.",
)
def atualizar_paciente(
    paciente_id: int,
    paciente: PacienteUpdate,
    db: Session = Depends(get_db),
):
    db_paciente = crud_paciente.update_paciente(
        db, paciente_id=paciente_id, paciente_update=paciente
    )
    if not db_paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paciente não encontrado.",
        )
    return db_paciente


@router.delete(
    "/{paciente_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover paciente",
    description="Remove permanentemente um paciente e todas as suas consultas.",
)
def remover_paciente(paciente_id: int, db: Session = Depends(get_db)):
    deleted = crud_paciente.delete_paciente(db, paciente_id=paciente_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paciente não encontrado.",
        )
