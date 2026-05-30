"""
Testes unitários e de integração para o endpoint /api/v1/consultas.
Cobre os cenários de sucesso e erro para agendamento e gerenciamento de consultas.
"""
import pytest
from fastapi.testclient import TestClient

from tests.conftest import CONSULTA_PAYLOAD, PACIENTE_PAYLOAD


@pytest.fixture
def paciente_criado(client: TestClient) -> dict:
    """Fixture auxiliar: cria um paciente e retorna seus dados."""
    response = client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD)
    return response.json()


class TestAgendarConsulta:
    """Testes para POST /api/v1/consultas/"""

    def test_agendar_consulta_sucesso(self, client: TestClient, paciente_criado: dict):
        """Deve agendar uma consulta e retornar status 201."""
        payload = {**CONSULTA_PAYLOAD, "paciente_id": paciente_criado["id"]}
        response = client.post("/api/v1/consultas/", json=payload)

        assert response.status_code == 201
        data = response.json()
        assert data["especialidade"] == payload["especialidade"]
        assert data["status"] == "agendada"
        assert data["paciente_id"] == paciente_criado["id"]
        assert "id" in data

    def test_agendar_consulta_paciente_inexistente(self, client: TestClient):
        """Deve retornar 404 ao tentar agendar para paciente inexistente."""
        payload = {**CONSULTA_PAYLOAD, "paciente_id": 9999}
        response = client.post("/api/v1/consultas/", json=payload)

        assert response.status_code == 404
        assert "Paciente não encontrado" in response.json()["detail"]

    def test_agendar_consulta_sem_campos_obrigatorios(self, client: TestClient):
        """Deve retornar 422 quando campos obrigatórios estão ausentes."""
        response = client.post("/api/v1/consultas/", json={"especialidade": "Cardiologia"})

        assert response.status_code == 422


class TestListarConsultas:
    """Testes para GET /api/v1/consultas/"""

    def test_listar_consultas_lista_vazia(self, client: TestClient):
        """Deve retornar lista vazia quando não há consultas."""
        response = client.get("/api/v1/consultas/")

        assert response.status_code == 200
        assert response.json() == []

    def test_listar_consultas_com_registros(
        self, client: TestClient, paciente_criado: dict
    ):
        """Deve retornar lista com as consultas agendadas."""
        payload = {**CONSULTA_PAYLOAD, "paciente_id": paciente_criado["id"]}
        client.post("/api/v1/consultas/", json=payload)
        response = client.get("/api/v1/consultas/")

        assert response.status_code == 200
        assert len(response.json()) == 1


class TestBuscarConsultaPorPaciente:
    """Testes para GET /api/v1/consultas/paciente/{id}"""

    def test_listar_consultas_do_paciente(
        self, client: TestClient, paciente_criado: dict
    ):
        """Deve retornar apenas as consultas do paciente solicitado."""
        payload = {**CONSULTA_PAYLOAD, "paciente_id": paciente_criado["id"]}
        client.post("/api/v1/consultas/", json=payload)
        client.post("/api/v1/consultas/", json=payload)

        response = client.get(f"/api/v1/consultas/paciente/{paciente_criado['id']}")

        assert response.status_code == 200
        assert len(response.json()) == 2
        for consulta in response.json():
            assert consulta["paciente_id"] == paciente_criado["id"]

    def test_listar_consultas_paciente_inexistente(self, client: TestClient):
        """Deve retornar 404 para paciente inexistente."""
        response = client.get("/api/v1/consultas/paciente/9999")

        assert response.status_code == 404


class TestAtualizarConsulta:
    """Testes para PATCH /api/v1/consultas/{id}"""

    def test_atualizar_status_consulta(
        self, client: TestClient, paciente_criado: dict
    ):
        """Deve atualizar o status da consulta para 'realizada'."""
        payload = {**CONSULTA_PAYLOAD, "paciente_id": paciente_criado["id"]}
        criada = client.post("/api/v1/consultas/", json=payload).json()

        response = client.patch(
            f"/api/v1/consultas/{criada['id']}", json={"status": "realizada"}
        )

        assert response.status_code == 200
        assert response.json()["status"] == "realizada"

    def test_atualizar_consulta_nao_encontrada(self, client: TestClient):
        """Deve retornar 404 ao tentar atualizar consulta inexistente."""
        response = client.patch(
            "/api/v1/consultas/9999", json={"status": "cancelada"}
        )

        assert response.status_code == 404

    def test_atualizar_campos_consulta(
        self, client: TestClient, paciente_criado: dict
    ):
        """Deve atualizar especialidade e médico mantendo outros campos."""
        payload = {**CONSULTA_PAYLOAD, "paciente_id": paciente_criado["id"]}
        criada = client.post("/api/v1/consultas/", json=payload).json()

        update = {"especialidade": "Cardiologia", "medico": "Dr. Ana Costa"}
        response = client.patch(f"/api/v1/consultas/{criada['id']}", json=update)

        assert response.status_code == 200
        assert response.json()["especialidade"] == "Cardiologia"
        assert response.json()["medico"] == "Dr. Ana Costa"
        assert response.json()["status"] == "agendada"  # status inalterado


class TestDeletarConsulta:
    """Testes para DELETE /api/v1/consultas/{id}"""

    def test_deletar_consulta_sucesso(
        self, client: TestClient, paciente_criado: dict
    ):
        """Deve deletar consulta e retornar 204."""
        payload = {**CONSULTA_PAYLOAD, "paciente_id": paciente_criado["id"]}
        criada = client.post("/api/v1/consultas/", json=payload).json()

        response = client.delete(f"/api/v1/consultas/{criada['id']}")

        assert response.status_code == 204

    def test_deletar_consulta_nao_encontrada(self, client: TestClient):
        """Deve retornar 404 ao tentar deletar consulta inexistente."""
        response = client.delete("/api/v1/consultas/9999")

        assert response.status_code == 404
