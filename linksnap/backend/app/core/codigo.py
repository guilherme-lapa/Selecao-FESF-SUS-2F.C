"""Geração de códigos curtos aleatórios para os links.

Mantida isolada da camada de rotas para facilitar testes e reuso.
"""

import secrets
import string

# Alfabeto sem caracteres ambíguos (0/O, 1/l) para facilitar leitura.
ALFABETO = string.ascii_letters + string.digits


def gerar_codigo(tamanho: int = 6) -> str:
    """Gera um código aleatório criptograficamente seguro."""
    return "".join(secrets.choice(ALFABETO) for _ in range(tamanho))
