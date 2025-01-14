import LoginPage from "../pages/LoginPage";

let homePage = null;
let loginPage = null;
let adminPage = null;

before("login", () => {
  loginPage = new LoginPage();
  loginPage.visit();
});

describe("Admin Component Menu", function () {
  it("User navigates to the Admin Component Menu", function () {
    homePage = loginPage.goToHomePage();
    adminPage = homePage.goToAdminPage();
  });
});
