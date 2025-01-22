class DashBoardPage {
  constructor() {}

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
  enterLabNumber(labNo) {
    cy.get("#search-input-41").should('be.visible').type(labNo);
  }

  pageItems(itemsPerPage) {
    cy.get("#cds-pagination-select-id-59").select(itemsPerPage);
  }
}

export default DashBoardPage;
