"""Endpoints REST para criação, consulta e redirecionamento de links."""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.core.codigo import gerar_codigo
from app.core.database import get_db
from app.models.link import Clique, Link
from app.schemas.link import LinkCreate, LinkDetalhe, LinkResponse

router = APIRouter()

# Códigos reservados que não podem ser usados como alias (rotas da API/app).
CODIGOS_RESERVADOS = {"api", "links", "docs", "openapi.json", "admin"}


def _com_contagem(link: Link) -> dict:
    """Monta o dicionário de resposta de um link com o total de cliques."""
    return {
        "id": link.id,
        "codigo": link.codigo,
        "url_original": link.url_original,
        "criado_em": link.criado_em,
        "total_cliques": len(link.cliques),
    }


@router.post("/links", response_model=LinkResponse, status_code=201, tags=["links"])
def criar_link(dados: LinkCreate, db: Session = Depends(get_db)):
    """Cria um link encurtado, com código aleatório ou alias personalizado."""
    if dados.alias:
        if dados.alias in CODIGOS_RESERVADOS:
            raise HTTPException(400, "Esse alias é reservado pelo sistema.")
        if db.query(Link).filter(Link.codigo == dados.alias).first():
            raise HTTPException(409, "Esse alias já está em uso.")
        codigo = dados.alias
    else:
        # Gera um código aleatório, repetindo no caso (raro) de colisão.
        codigo = gerar_codigo()
        while db.query(Link).filter(Link.codigo == codigo).first():
            codigo = gerar_codigo()

    link = Link(codigo=codigo, url_original=dados.url_original)
    db.add(link)
    db.commit()
    db.refresh(link)
    return _com_contagem(link)


@router.get("/links", response_model=List[LinkResponse], tags=["links"])
def listar_links(
    busca: str = Query("", description="Filtra por código ou URL"),
    db: Session = Depends(get_db),
):
    """Lista todos os links criados, do mais recente para o mais antigo."""
    query = db.query(Link)
    if busca:
        termo = f"%{busca}%"
        query = query.filter(
            (Link.codigo.ilike(termo)) | (Link.url_original.ilike(termo))
        )
    links = query.order_by(Link.criado_em.desc()).all()
    return [_com_contagem(link) for link in links]


@router.get("/links/{codigo}", response_model=LinkDetalhe, tags=["links"])
def detalhar_link(codigo: str, db: Session = Depends(get_db)):
    """Retorna um link com seu histórico completo de cliques."""
    link = db.query(Link).filter(Link.codigo == codigo).first()
    if link is None:
        raise HTTPException(404, "Link não encontrado.")
    return {
        **_com_contagem(link),
        "cliques": sorted(link.cliques, key=lambda c: c.acessado_em, reverse=True),
    }


@router.delete("/links/{codigo}", status_code=204, tags=["links"])
def remover_link(codigo: str, db: Session = Depends(get_db)):
    """Remove um link e todo o seu histórico de cliques."""
    link = db.query(Link).filter(Link.codigo == codigo).first()
    if link is None:
        raise HTTPException(404, "Link não encontrado.")
    db.delete(link)
    db.commit()


@router.get("/{codigo}", tags=["redirect"])
def redirecionar(codigo: str, db: Session = Depends(get_db)):
    """Redireciona o código curto para a URL original e registra o acesso."""
    link = db.query(Link).filter(Link.codigo == codigo).first()
    if link is None:
        raise HTTPException(404, "Link não encontrado.")

    db.add(Clique(link_id=link.id))
    db.commit()

    return RedirectResponse(url=link.url_original)
