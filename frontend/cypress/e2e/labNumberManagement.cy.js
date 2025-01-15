import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import LabNumberManagementPage from "../pages/LabNumberManagementPage";

let loginPage = null;
let homePage = null;
let adminPage = null;
let labNumMgtPage = null;

before(() => {
  // Initialize LoginPage object and navigate to Admin Page
  loginPage = new LoginPage();
  loginPage.visit();

  homePage = loginPage.goToHomePage();
  adminPage = homePage.goToAdminPage();
});

beforeEach(() => {
  // Load fixture data for each test
  cy.fixture("LabNumberManagement").as("labNMData");
});

describe("Lab Number Management", function () {
  it("User navigates to the Lab Number Management page", function () {
    labNumMgtPage = adminPage.goToLabNumberManagementPage();
  });

  it("User selects the lab number type and submits", function () {
    cy.get("@labNMData").then((labNumberManagementData) => {
      labNumMgtPage.selectLabNumber(
        labNumberManagementData.legacyLabNumberType,
      );
      labNumMgtPage.clickSubmitButton();
    });
  });
});
