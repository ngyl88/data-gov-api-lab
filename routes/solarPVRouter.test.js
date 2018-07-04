const request = require("supertest");
const app = require("../app");

const installations = require("../utils/solar-pv-installation.json");

describe("GET without query param", () => {
  it("GET /solarPV should return proper Hi message", async () => {
    const response = await request(app).get("/solarPV");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual("Hi from SolarPV Router!");
  });

  it("GET /solarPV/list should return the list of data", async () => {
    const response = await request(app).get("/solarPV/list");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(installations);
  });

  it("GET /solarPV/:year should return information wth appropriate year", async () => {
    const yearRequest = "2015";
    const expectedDataForYear = installations.filter(
      installation => installation.year === yearRequest
    );

    const response = await request(app).get(`/solarPV/${yearRequest}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedDataForYear);
  });
});

describe("GET with query param", () => {
  it("GET /solarPV/search with ura_planning_region should return properly filtered data", async () => {
    const ura_planning_region = "Overall";
    const expectedFilteredData = installations.filter(
      installation => installation.ura_planning_region === ura_planning_region
    );

    const response = await request(app).get(
      `/solarPV/search?ura_planning_region=${ura_planning_region}`
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedFilteredData);
  });

  it("GET /solarPV/:year with ura_planning_region should return properly filtered data", async () => {
    const ura_planning_region = "Central";
    const year = "2015";
    const expectedFilteredData = installations
      .filter(installation => installation.year === year)
      .filter(
        installation => installation.ura_planning_region === ura_planning_region
      );

    const response = await request(app).get(
      `/solarPV/${year}?ura_planning_region=${ura_planning_region}`
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedFilteredData);
  });

  it.skip("GET /solarPV/search with sorting asc", async () => {
    const expectedFilteredData = installations
      .sort((a, b) => {
        if (a["residential_status"] === b["residential_status"]) return 0;
        return a["residential_status"] < b["residential_status"] ? -1 : 1;
      })
      .sort((a, b) => {
        if (a["year"] === b["year"]) return 0;
        return Number(a["year"]) < Number(b["year"]) ? -1 : 1;
      });

    const response = await request(app).get(
      `/solarPV/search?sort[residential_status]=asc&sort[year]=asc`
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedFilteredData);
  });
  it.skip("GET /solarPV/search with sorting desc", async () => {});
  it.skip("GET /solarPV/search with sorting (asc and desc)", () => {});
});

describe("PUT", () => {});

describe("POST", () => {});

describe("DELETE", () => {});
