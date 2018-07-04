const request = require("supertest");
const app = require("../app");
const seedData = require("../utils/kindergarten.json");

describe("GET", () => {
  it("GET /kindergarten without query param should return proper Hi message", async () => {
    const response = await request(app).get("/kindergarten");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual("Hi from Kindergarten Router!");
  });

  it("GET /kindergarten with query params should return filtered kindergarten", async () => {
    const expectedReturn = [
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Insurance(Optional)",
        frequency: "Annually",
        amount: "3.21"
      },
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Deposit",
        frequency: "Ad-hoc",
        amount: "900.00"
      },
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Deposit",
        frequency: "Ad-hoc",
        amount: "1080.00"
      },
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Deposit",
        frequency: "Ad-hoc",
        amount: "1275.00"
      },
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Deposit",
        frequency: "Ad-hoc",
        amount: "1593.75"
      },
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Deposit",
        frequency: "Ad-hoc",
        amount: "1912.50"
      },
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Deposit",
        frequency: "Ad-hoc",
        amount: "720.00"
      },
      {
        centre_code: "EB0003",
        centre_name: "E-BRIDGE PRE-SCHOOL PTE. LTD.",
        incidental_charges: "Registration Fee",
        frequency: "Ad-hoc",
        amount: "107.00"
      }
    ];
    const response = await request(app).get(`/kindergarten?centre_code=EB0003`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedReturn);
  });

  it("GET /kindergarten with invalid query key should return an empty list", async () => {
    const response = await request(app).get(
      "/kindergarten?centre_code=EB0003&key=value"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it("GET /kindergarten/list should return the list of seeded data", async () => {
    const response = await request(app).get("/kindergarten/list");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(seedData);
  });
});
