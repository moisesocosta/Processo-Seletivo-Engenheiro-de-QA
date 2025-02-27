const request = require("supertest");
const baseUrl = "https://jsonplaceholder.typicode.com";

describe("Testes da API JSONPlaceholder - /users", () => {
  
  // A API responde corretamente → Testar requisições GET e POST.
  test("GET /users - Retorna uma lista de usuários", async () => {
    const response = await request(baseUrl).get("/users");

    // Respostas HTTP corretas → Testar status 200.
    expect(response.status).toBe(200); 

    // Validação da estrutura do JSON → O retorno da API deve conter os campos esperados.
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    
    response.body.forEach(user => {
      expect(user).toHaveProperty("id", expect.any(Number));
      expect(user).toHaveProperty("name", expect.any(String));
      expect(user).toHaveProperty("username", expect.any(String));
      expect(user).toHaveProperty("email", expect.any(String));
      expect(user).toHaveProperty("address");
    });
  });

  // A API responde corretamente → Testar requisições GET com ID específico.
  test("GET /users/:id - Retorna um usuário específico", async () => {
    const response = await request(baseUrl).get("/users/1");

    // Respostas HTTP corretas → Testar status 200.
    expect(response.status).toBe(200);

    // Validação da estrutura do JSON → O retorno da API deve conter os campos esperados.
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("username", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
  });

  // Respostas HTTP corretas → Testar status 404 para usuário inexistente.
  test("GET /users/:id - Retorna erro 404 para usuário inexistente", async () => {
    const response = await request(baseUrl).get("/users/9999");

    expect(response.status).toBe(404);
  });

  // A API responde corretamente → Testar requisição POST para criar um usuário.
  test("POST /users - Cria um novo usuário corretamente", async () => {
    const newUser = {
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
    };

    const response = await request(baseUrl).post("/users").send(newUser);

    // Respostas HTTP corretas → Testar status 201 para criação de um novo recurso.
    expect(response.status).toBe(201);

    // Validação da estrutura do JSON → O retorno da API deve conter os campos esperados.
    expect(response.body).toMatchObject(newUser);
    expect(response.body).toHaveProperty("id", expect.any(Number));
  });

  // Respostas HTTP corretas → Testar status 400 para payload inválido.
  test("POST /users - Retorna erro 400 ao enviar payload inválido", async () => {
    const invalidUser = { name: "Teste" };

    const response = await request(baseUrl).post("/users").send(invalidUser);

    expect(response.status).toBe(400);
  });
});
