class DashBoardPage {
  constructor() {}

  homeSearchBar() {
    //#tooltip-43 #mainHeader > div.cds--header__global > span:nth-child(1) > button
    cy.get("#mainHeader > div.cds--header__global > span:nth-child(1)").click();
    //cy.get(".search-bar-container").should("be.visible").click();
  }
  searchBarInput(inputName) {
    cy.get("#searchItem").type(inputName);
  }

  searchBarClose() {
    cy.get("#mainHeader > div.cds--header__global > span:nth-child(2)").click();
  }

  notificationIcon() {
    cy.get(
      "#mainHeader > div.cds--header__global > span:nth-child(2) > button",
    ).click();
  }

  notificationIconClose() {
    cy.get("#close-slide-over").click();
  }

  userIcon() {
    cy.get(
      "#mainHeader > div.cds--header__global > span:nth-child(3) > button",
    ).click();
  }

  userSelectsEng(engLang) {
    cy.get("#selector").select(engLang);
  }

  userClosesIcon() {
    cy.get(
      "#mainHeader > div.cds--header__global > span:nth-child(3) > button",
    ).click();
  }

  checkFilters() {
    cy.get("#filterMyCases").check({ force: true });
  }

  selectCases(myCases) {
    cy.get("#statusFilter").select(myCases);
  }

  selectCompletedCases(myCases2) {
    cy.get("#statusFilter").select(myCases2);
  }

  selectScreeningCases(myCases3) {
    cy.get("#statusFilter").select(myCases3);
  }
  enterLabNumber(labNumb) {
    cy.get("#search-input-41").should("be.visible").type(labNumb);
  }

  pageItems(itemsPerPage) {
    cy.get("#cds-pagination-select-id-59").select(itemsPerPage);
  }
}

export default DashBoardPage;
