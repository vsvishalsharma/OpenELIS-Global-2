class LabNumberManagementPage {
  visitManagementPage() {
    //cy.visit('.cds--side-nav_link[href="#AnalyzerTestName"]');
    return cy.get("h2").should("contain.text", "Lab Number Management");
  }

  verifyPageLoaded() {
    // Confirm the page is loaded by checking a unique element
    cy.contains("Lab Number Management").should("be.visible");
  }

  selectLabNumber(labNumberType) {
    // Ensure the dropdown is visible and interactable
    cy.get("#lab_number_type").should("be.visible").select(labNumberType); // Select the lab number type passed as an argument
  }

  checkPrefixCheckBox() {
    cy.get(":nth-child(4) > .cds--form-item > .cds--checkbox-label").click();
  }
  typePrefix(userPrefix) {
    cy.get("#alphanumPrefix").type(userPrefix);
    cy.get(".cds--text-input").should("be.visible").click();
  }
  clickSubmitButton() {
    cy.get(
      "#root > div > div.cds--white.cds--layer-one > main > div.adminPageContent > form > div > div:nth-child(9) > button",
    ).click();
  }
}

export default LabNumberManagementPage;
