"""
Configuração global dos testes com pytest.
Cria um banco de dados SQLite em memória para cada sessão de testes.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app

# Banco de dados em memória para os testes (não persiste entre execuções)
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db():
    """
    Fixture que fornece uma sessão de banco de dados limpa para cada teste.
    As tabelas são criadas antes e destruídas após cada função de teste.
    """
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db):
    """
    Fixture que fornece um TestClient do FastAPI com o banco de dados de teste injetado.
    """
    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


# ---- Dados reutilizáveis nos testes ----

PACIENTE_PAYLOAD = {
    "nome": "João da Silva",
    "cpf": "123.456.789-00",
    "data_nascimento": "1990-05-15",
    "telefone": "(71) 99999-9999",
    "email": "joao@email.com",
    "endereco": "Rua das Flores, 123 - Salvador, BA",
}

CONSULTA_PAYLOAD = {
    "paciente_id": 1,
    "data_hora": "2025-06-20T10:00:00",
    "especialidade": "Clínica Geral",
    "medico": "Dr. Carlos Souza",
    "observacoes": "Consulta de rotina",
}
