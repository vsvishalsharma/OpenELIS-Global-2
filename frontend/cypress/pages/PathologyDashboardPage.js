class PathologyDashboardPage {
  visit() {
    cy.visit("/pathology-dashboard");
  }

  checkForHeader(headerText) {
    cy.get("h1").should("contain.text", headerText);
  }

  searchForCase(caseId) {
    cy.get('input[placeholder="Search"]').type(caseId);
    cy.get('button[type="submit"]').click();
  }

  getSearchResults() {
    return cy.get(".search-results");
  }

  clickNextPage() {
    cy.get(".pagination-next").click();
  }

  getPreviousPageButton() {
    return cy.get(".pagination-previous");
  }

  getErrorMessage() {
    return cy.get(".error-message");
  }

  fillOrderForm({ patientId, sampleId, testType, notes }) {
    cy.get('input[name="patientId"]').type(patientId);
    cy.get('input[name="sampleId"]').type(sampleId);
    cy.get('select[name="testType"]').select(testType);
    cy.get('textarea[name="notes"]').type(notes);
  }

  submitOrderForm() {
    cy.get('button[type="submit"]').click();
  }

  getSuccessMessage() {
    return cy.get(".success-message");
  }
}

export default PathologyDashboardPage;
