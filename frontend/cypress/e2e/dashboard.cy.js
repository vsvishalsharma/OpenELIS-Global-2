import LoginPage from "../pages/LoginPage";

let homePage = null;
let loginPage = null;
let dashboard = null;

before("login", () => {
  loginPage = new LoginPage();
  loginPage.visit();

  homePage = loginPage.goToHomePage();

  cy.fixture("Order").as("dashBData");
});

describe("Pathology Dashboard", function () {
  it("User  Visits the Dashboard", function () {
    dashboard = homePage.goToPathology();
  });

  it("User checks filters, selects cases and items per page", function () {
    dashboard.checkFilters();
    cy.fixture("Order").then((dashBData) => {
      dashboard.selectCases(dashBData.myCases);
      dashboard.enterLabNumber(dashBData.labNo);
      dashboard.pageItems(dashBData.itemsPerPage);
    });
  });
});

describe("Immunohistochemistry Dashboard", function () {
  it("User  Visits the Dashboard", function () {
    dashboard = homePage.goToImmunoChemistryDashboard();
  });

  it("User checks filters, selects cases and items per page", function () {
    dashboard.checkFilters();
    cy.fixture("Order").then((dashBData) => {
      dashboard.selectCompletedCases(dashBData.myCases2);
      dashboard.enterLabNumber(dashBData.labNo);
      dashboard.pageItems(dashBData.itemsPerPage);
    });
  });
});

describe("Cytology Dashboard", function () {
  it("User  Visits the Dashboard", function () {
    dashboard = homePage.goToCytology();
  });

  it("User checks filters, selects cases and items per page", function () {
    dashboard.checkFilters();
    cy.fixture("Order").then((dashBData) => {
      dashboard.selectScreeningCases(dashBData.myCases3);
      dashboard.enterLabNumber(dashBData.labNo);
      dashboard.pageItems(dashBData.itemsPerPage);
    });
  });
});
