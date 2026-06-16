"""Endpoint REST para consulta de clima por cidade."""

from fastapi import APIRouter, HTTPException, Query

from app.schemas.clima import ClimaResponse
from app.services import clima_service
from app.services.open_meteo import ServicoExternoError

router = APIRouter()


@router.get("/clima", response_model=ClimaResponse, tags=["clima"])
async def consultar_clima(
    cidade: str = Query(..., min_length=1, description="Nome da cidade"),
):
    """Retorna clima atual e previsão de 5 dias para a cidade informada."""
    try:
        return await clima_service.obter_clima(cidade.strip())
    except clima_service.CidadeNaoEncontrada as erro:
        raise HTTPException(status_code=404, detail=str(erro))
    except ServicoExternoError as erro:
        # 502: nossa API funcionou, mas o serviço externo falhou.
        raise HTTPException(status_code=502, detail=str(erro))
