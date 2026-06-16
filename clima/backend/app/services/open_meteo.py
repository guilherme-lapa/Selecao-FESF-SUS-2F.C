"""Cliente de comunicação com a API externa Open-Meteo.

Concentra as chamadas HTTP de saída (geocoding + forecast) num único
lugar, isolando o resto da aplicação dos detalhes do serviço externo.

Open-Meteo é gratuita e não exige chave de API.
Dados sob licença CC BY 4.0 (https://open-meteo.com/).
"""

import httpx

URL_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search"
URL_FORECAST = "https://api.open-meteo.com/v1/forecast"

# Tempo máximo de espera por resposta do serviço externo.
TIMEOUT = httpx.Timeout(10.0)


class ServicoExternoError(Exception):
    """Erro ao se comunicar com a API de clima externa."""


async def buscar_coordenadas(cidade: str) -> dict | None:
    """Converte o nome de uma cidade em coordenadas via geocoding.

    Retorna um dicionário com nome, país, latitude e longitude, ou
    None se a cidade não for encontrada.
    """
    params = {
        "name": cidade,
        "count": 1,
        "language": "pt",
        "format": "json",
    }
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as cliente:
            resposta = await cliente.get(URL_GEOCODING, params=params)
            resposta.raise_for_status()
            dados = resposta.json()
    except httpx.HTTPError as erro:
        raise ServicoExternoError(
            "Falha ao consultar o serviço de localização."
        ) from erro

    resultados = dados.get("results")
    if not resultados:
        return None

    local = resultados[0]
    return {
        "nome": local.get("name"),
        "pais": local.get("country"),
        "latitude": local.get("latitude"),
        "longitude": local.get("longitude"),
    }


async def buscar_previsao(latitude: float, longitude: float) -> dict:
    """Busca clima atual e previsão diária para as coordenadas dadas."""
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
        "daily": "weather_code,temperature_2m_max,temperature_2m_min",
        "timezone": "auto",
        "forecast_days": 5,
    }
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as cliente:
            resposta = await cliente.get(URL_FORECAST, params=params)
            resposta.raise_for_status()
            return resposta.json()
    except httpx.HTTPError as erro:
        raise ServicoExternoError(
            "Falha ao consultar o serviço de previsão do tempo."
        ) from erro
