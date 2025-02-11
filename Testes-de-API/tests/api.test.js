const request = require("supertest");
const baseUrl = "https://jsonplaceholder.typicode.com";

describe("Testes da API JSONPlaceholder - /users", () => {
  
  test("GET /users - Retorna uma lista de usuários", async () => {
    const response = await request(baseUrl).get("/users");

    expect(response.status).toBe(200); 
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

  test("GET /users/:id - Retorna um usuário específico", async () => {
    const response = await request(baseUrl).get("/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("username", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
  });

  test("GET /users/:id - Retorna erro 404 para usuário inexistente", async () => {
    const response = await request(baseUrl).get("/users/9999");

    expect(response.status).toBe(404);
  });

  test("POST /users - Cria um novo usuário corretamente", async () => {
    const newUser = {
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
    };

    const response = await request(baseUrl).post("/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
    expect(response.body).toHaveProperty("id", expect.any(Number));
  });

  test("POST /users - Retorna erro 400 ao enviar payload inválido", async () => {
    const invalidUser = { name: "Teste" };

    const response = await request(baseUrl).post("/users").send(invalidUser);

    expect(response.status).toBe(400);
  });
});
