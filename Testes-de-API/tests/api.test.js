const request = require("supertest"); 
const baseUrl = "https://official-joke-api.appspot.com";

describe("Testes da API de Piadas", () => {

  test("GET /random_joke - Retorna uma piada com estrutura correta", async () => {
    const response = await request(baseUrl).get("/random_joke");

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("type", expect.any(String));
    expect(response.body).toHaveProperty("setup", expect.any(String));
    expect(response.body).toHaveProperty("punchline", expect.any(String));
  });

  test("POST /random_joke - Retorna erro 404 ao tentar criar uma piada", async () => {
    const response = await request(baseUrl).post("/random_joke").send({});

    expect(response.status).toBe(404);
  });

  test("GET /jokes/ten - Retorna uma lista de piadas", async () => {
    const response = await request(baseUrl).get("/jokes/ten");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /jokes/invalid_endpoint - Retorna erro 404", async () => {
    const response = await request(baseUrl).get("/jokes/invalid_endpoint");

    expect(response.status).toBe(404);
  });
});
