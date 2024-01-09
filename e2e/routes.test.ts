const supertest = require("supertest");
import { PUBLIC_HOLIDAYS_API_URL } from "../config";

describe("GET /AvailableCountries", () => {
  it("should return 200 and list of available countries", async () => {
    const response = await supertest(PUBLIC_HOLIDAYS_API_URL).get(
      "/AvailableCountries"
    );
    expect(response.status).toBe(200);
  });
});

describe("GET /PublicHolidays/{year}/{countryCode}", () => {
  it("should return 200 and list of public holidays for a specific year and country", async () => {
    const year = 2024;
    const countryCode = "DE";
    const response = await supertest(PUBLIC_HOLIDAYS_API_URL).get(
      `/PublicHolidays/${year}/${countryCode}`
    );
    expect(response.status).toBe(200);
  });

  it("should return 404 when providing an unknown country code", async () => {
    const year = 2024;
    const countryCode = "UNKNOWN";
    const response = await supertest(PUBLIC_HOLIDAYS_API_URL).get(
      `/PublicHolidays/${year}/${countryCode}`
    );
    expect(response.status).toBe(404);
  });

  it("should return 400 when providing invalid parameters", async () => {
    const year = "invalid";
    const countryCode = "DE";
    const response = await supertest(PUBLIC_HOLIDAYS_API_URL).get(
      `/PublicHolidays/${year}/${countryCode}`
    );
    expect(response.status).toBe(400);
  });
});
