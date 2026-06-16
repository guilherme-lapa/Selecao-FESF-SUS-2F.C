"""Serviço de clima — orquestra as chamadas à API externa.

Esta camada é o "cérebro" da integração: recebe o nome de uma cidade,
coordena geocoding e forecast no Open-Meteo, traduz os códigos de tempo
e devolve um objeto pronto para o front-end. Mantém os routers enxutos.
"""

from app.core.clima_codigos import descrever
from app.schemas.clima import (
    ClimaAtual,
    ClimaResponse,
    Localizacao,
    PrevisaoDia,
)
from app.services import open_meteo


class CidadeNaoEncontrada(Exception):
    """A cidade pesquisada não foi encontrada no geocoding."""


async def obter_clima(cidade: str) -> ClimaResponse:
    """Busca o clima completo de uma cidade pelo nome.

    Passos:
      1. Geocoding: nome da cidade -> coordenadas.
      2. Forecast: coordenadas -> clima atual + previsão.
      3. Monta a resposta traduzindo os códigos de tempo.
    """
    local = await open_meteo.buscar_coordenadas(cidade)
    if local is None:
        raise CidadeNaoEncontrada(f"Cidade '{cidade}' não encontrada.")

    bruto = await open_meteo.buscar_previsao(
        local["latitude"], local["longitude"]
    )

    atual_bruto = bruto["current"]
    clima_atual = descrever(atual_bruto["weather_code"])
    atual = ClimaAtual(
        temperatura=atual_bruto["temperature_2m"],
        umidade=atual_bruto["relative_humidity_2m"],
        vento=atual_bruto["wind_speed_10m"],
        descricao=clima_atual["descricao"],
        icone=clima_atual["icone"],
    )

    diario = bruto["daily"]
    previsao: list[PrevisaoDia] = []
    for i, data in enumerate(diario["time"]):
        info = descrever(diario["weather_code"][i])
        previsao.append(
            PrevisaoDia(
                data=data,
                temp_min=diario["temperature_2m_min"][i],
                temp_max=diario["temperature_2m_max"][i],
                descricao=info["descricao"],
                icone=info["icone"],
            )
        )

    return ClimaResponse(
        local=Localizacao(**local),
        atual=atual,
        previsao=previsao,
    )
