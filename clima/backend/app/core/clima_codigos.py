"""Tradução dos códigos de clima WMO para descrição e ícone.

O Open-Meteo retorna o tempo como um código numérico (padrão WMO).
Este módulo converte cada código em texto legível e um emoji, para
que o front-end receba dados já prontos para exibição.
"""

# Mapa: código WMO -> (descrição em pt-BR, emoji)
CODIGOS_WMO: dict[int, tuple[str, str]] = {
    0: ("Céu limpo", "☀️"),
    1: ("Predominantemente limpo", "🌤️"),
    2: ("Parcialmente nublado", "⛅"),
    3: ("Nublado", "☁️"),
    45: ("Névoa", "🌫️"),
    48: ("Névoa com geada", "🌫️"),
    51: ("Garoa leve", "🌦️"),
    53: ("Garoa moderada", "🌦️"),
    55: ("Garoa intensa", "🌧️"),
    61: ("Chuva fraca", "🌦️"),
    63: ("Chuva moderada", "🌧️"),
    65: ("Chuva forte", "🌧️"),
    71: ("Neve fraca", "🌨️"),
    73: ("Neve moderada", "🌨️"),
    75: ("Neve forte", "❄️"),
    80: ("Pancadas de chuva", "🌦️"),
    81: ("Pancadas moderadas", "🌧️"),
    82: ("Pancadas violentas", "⛈️"),
    95: ("Tempestade", "⛈️"),
    96: ("Tempestade com granizo", "⛈️"),
    99: ("Tempestade forte com granizo", "⛈️"),
}

_PADRAO = ("Desconhecido", "❓")


def descrever(codigo: int) -> dict:
    """Retorna descrição e ícone para um código WMO."""
    descricao, icone = CODIGOS_WMO.get(codigo, _PADRAO)
    return {"descricao": descricao, "icone": icone}
