import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PathologyDashboardPage from "../pages/PathologyDashboardPage";

let homePage = null;
let loginPage = null;
let dashboard = null;

before("login", () => {
  loginPage = new LoginPage();
  loginPage.visit();
  homePage = loginPage.goToHomePage();
});

beforeEach(() => {
  // Navigate to the pathology dashboard page before each test
  //dashboard = homePage.goToPathologyDashboard();
  dashboard = new PathologyDashboardPage();
  dashboard.visit();
});

describe("Pathology Dashboard", function () {
  it("User Visits Pathology Dashboard", function () {
    dashboard.checkForHeader("Pathology");
  });

  it("User adds a new Pathology order", function () {
    homePage.goToOrderPage();
    // Add steps to fill out and submit the order form
    dashboard.fillOrderForm({
      patientId: "12345",
      sampleId: "67890",
      testType: "Blood Test",
      notes: "Urgent",
    });
    dashboard.submitOrderForm();
    dashboard
      .getSuccessMessage()
      .should("be.visible")
      .and("contain.text", "Order added successfully");
  });

  it("User can search for cases", function () {
    dashboard.searchForCase("case123");
    dashboard.getSearchResults().should("contain.text", "case123");
  });

  it("User can paginate results", function () {
    dashboard.clickNextPage();
    dashboard.getPreviousPageButton().should("be.visible");
  });

  it("Displays error message for failed data fetch", function () {
    cy.intercept("GET", "/api/pathology/dashboard", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("fetchDashboardData");

    cy.reload();
    cy.wait("@fetchDashboardData");
    dashboard
      .getErrorMessage()
      .should("be.visible")
      .and("contain.text", "Internal Server Error");
  });
});
