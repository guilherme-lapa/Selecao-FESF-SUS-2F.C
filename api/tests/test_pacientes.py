"""
Testes unitários e de integração para o endpoint /api/v1/pacientes.
Cobre os cenários de sucesso e erro para cada operação CRUD.
"""
import pytest
from fastapi.testclient import TestClient

from tests.conftest import PACIENTE_PAYLOAD


class TestCriarPaciente:
    """Testes para POST /api/v1/pacientes/"""

    def test_criar_paciente_sucesso(self, client: TestClient):
        """Deve criar um paciente e retornar status 201 com os dados."""
        response = client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD)

        assert response.status_code == 201
        data = response.json()
        assert data["nome"] == PACIENTE_PAYLOAD["nome"]
        assert data["cpf"] == PACIENTE_PAYLOAD["cpf"]
        assert data["email"] == PACIENTE_PAYLOAD["email"]
        assert "id" in data
        assert "criado_em" in data

    def test_criar_paciente_cpf_duplicado(self, client: TestClient):
        """Deve retornar 400 ao tentar cadastrar CPF já existente."""
        client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD)
        response = client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD)

        assert response.status_code == 400
        assert "CPF" in response.json()["detail"]

    def test_criar_paciente_sem_campos_obrigatorios(self, client: TestClient):
        """Deve retornar 422 quando campos obrigatórios estão ausentes."""
        response = client.post("/api/v1/pacientes/", json={"nome": "Apenas Nome"})

        assert response.status_code == 422

    def test_criar_paciente_cpf_formato_invalido(self, client: TestClient):
        """Deve retornar 422 para CPF em formato inválido."""
        payload = {**PACIENTE_PAYLOAD, "cpf": "12345678900"}  # sem máscara
        response = client.post("/api/v1/pacientes/", json=payload)

        assert response.status_code == 422

    def test_criar_paciente_sem_campos_opcionais(self, client: TestClient):
        """Deve criar paciente sem campos opcionais (telefone, email, endereço)."""
        payload = {
            "nome": "Ana Lima",
            "cpf": "987.654.321-00",
            "data_nascimento": "1985-03-10",
        }
        response = client.post("/api/v1/pacientes/", json=payload)

        assert response.status_code == 201
        assert response.json()["telefone"] is None


class TestListarPacientes:
    """Testes para GET /api/v1/pacientes/"""

    def test_listar_pacientes_lista_vazia(self, client: TestClient):
        """Deve retornar lista vazia quando não há pacientes."""
        response = client.get("/api/v1/pacientes/")

        assert response.status_code == 200
        assert response.json() == []

    def test_listar_pacientes_com_registros(self, client: TestClient):
        """Deve retornar lista com os pacientes cadastrados."""
        client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD)
        response = client.get("/api/v1/pacientes/")

        assert response.status_code == 200
        assert len(response.json()) == 1

    def test_listar_pacientes_paginacao(self, client: TestClient):
        """Deve respeitar os parâmetros skip e limit na paginação."""
        for i in range(3):
            payload = {**PACIENTE_PAYLOAD, "cpf": f"111.222.333-0{i}"}
            client.post("/api/v1/pacientes/", json=payload)

        response = client.get("/api/v1/pacientes/?skip=1&limit=1")

        assert response.status_code == 200
        assert len(response.json()) == 1


class TestBuscarPaciente:
    """Testes para GET /api/v1/pacientes/{id}"""

    def test_buscar_paciente_existente(self, client: TestClient):
        """Deve retornar os dados do paciente pelo ID."""
        criado = client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD).json()
        response = client.get(f"/api/v1/pacientes/{criado['id']}")

        assert response.status_code == 200
        assert response.json()["id"] == criado["id"]
        assert response.json()["nome"] == PACIENTE_PAYLOAD["nome"]

    def test_buscar_paciente_nao_encontrado(self, client: TestClient):
        """Deve retornar 404 para ID inexistente."""
        response = client.get("/api/v1/pacientes/9999")

        assert response.status_code == 404
        assert "não encontrado" in response.json()["detail"].lower()


class TestAtualizarPaciente:
    """Testes para PATCH /api/v1/pacientes/{id}"""

    def test_atualizar_paciente_sucesso(self, client: TestClient):
        """Deve atualizar os campos enviados e retornar dados atualizados."""
        criado = client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD).json()
        update = {"telefone": "(71) 88888-8888", "endereco": "Nova Rua, 456"}
        response = client.patch(f"/api/v1/pacientes/{criado['id']}", json=update)

        assert response.status_code == 200
        assert response.json()["telefone"] == "(71) 88888-8888"
        assert response.json()["endereco"] == "Nova Rua, 456"
        # campos não enviados devem permanecer inalterados
        assert response.json()["nome"] == PACIENTE_PAYLOAD["nome"]

    def test_atualizar_paciente_nao_encontrado(self, client: TestClient):
        """Deve retornar 404 ao tentar atualizar ID inexistente."""
        response = client.patch("/api/v1/pacientes/9999", json={"telefone": "(71) 11111-1111"})

        assert response.status_code == 404


class TestDeletarPaciente:
    """Testes para DELETE /api/v1/pacientes/{id}"""

    def test_deletar_paciente_sucesso(self, client: TestClient):
        """Deve deletar paciente e retornar 204 No Content."""
        criado = client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD).json()
        response = client.delete(f"/api/v1/pacientes/{criado['id']}")

        assert response.status_code == 204

    def test_deletar_paciente_verifica_remocao(self, client: TestClient):
        """Após deletar, busca pelo mesmo ID deve retornar 404."""
        criado = client.post("/api/v1/pacientes/", json=PACIENTE_PAYLOAD).json()
        client.delete(f"/api/v1/pacientes/{criado['id']}")
        response = client.get(f"/api/v1/pacientes/{criado['id']}")

        assert response.status_code == 404

    def test_deletar_paciente_nao_encontrado(self, client: TestClient):
        """Deve retornar 404 ao tentar deletar ID inexistente."""
        response = client.delete("/api/v1/pacientes/9999")

        assert response.status_code == 404
