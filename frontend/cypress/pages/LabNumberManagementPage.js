class LabNumberManagementPage {
  constructor() {}

  verifyPageLoaded() {
    // Confirm the page is loaded by checking a unique element
    cy.contains("Lab Number Management").should("be.visible");
  }

  selectLabNumber(labNumberType) {
    // Ensure the dropdown is visible and interactable
    cy.get("#lab_number_type").should("be.visible").select(labNumberType); // Select the lab number type passed as an argument
  }

  checkPrefixCheckBox() {
    cy.get("#usePrefix").check({ force: true }); // Check the checkbox
  }
  typePrefix(prefix) {
    this.checkPrefixCheckBox();

    // Wait for the input to become enabled
    cy.get("#alphanumPrefix").should("not.be.disabled").type(prefix);
  }
  clickSubmitButton() {
    cy.wait(1000);
    cy.get(
      "#root > div > div.cds--white.cds--layer-one > main > div.adminPageContent > form > div > div:nth-child(9) > button",
    )
      .should("be.visible")
      .click();
  }

  clickSubmitButton2() {
    cy.wait(1000);
    cy.get(
      "#root > div > div.cds--white.cds--layer-one > main > div.adminPageContent > form > div > div:nth-child(11) > button",
    )
      .should("be.visible")
      .click();
  }
}

export default LabNumberManagementPage;
