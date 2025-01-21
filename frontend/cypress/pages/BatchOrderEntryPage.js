class BatchOrderEntry {
  visitSetupPage() {
    cy.get("h2").should("contain.text", "Batch Order Entry Setup");
  }

  checkNextButtonDisabled() {
    cy.get(":nth-child(12) > .cds--btn").should("be.disabled");
  }

  selectForm(formTypeRoutine) {
    cy.get("#form-dropdown").select(formTypeRoutine);
  }

  selectSampleType(serumSample) {
    cy.get("#selectSampleType").should("be.visible").select(serumSample);
  }

  checkBilanPanel() {
    cy.contains('span','Bilan Biochimique').click();
  }

  checkSerologiePanel() {
    cy.contains('span','Serologie VIH').click();
  }

  checkDenguePCR() {
    cy.contains('span','DENGUE PCR').click();
  }

  checkHIVViralLoad() {
    cy.contains('span','HIV VIRAL LOAD').click();
  }

  checkCreatinine() {
    cy.contains('span','Creatinine').click();
  }

  checkNextLabel() {
    return cy.get(":nth-child(8) > .cds--btn");
  }

  clickGenerateButton() {
    cy.get(":nth-child(2) > .cds--link").click();
  }

  selectMethod(method) {
    cy.get("#method-dropdown").select(method);
  }

  checkFacilityCheckbox() {
    cy.get("#facility-checkbox").check({ force: true });
  }

  checkPatientCheckbox() {
    cy.get("#patient-checkbox").check({ force: true });
  }

  enterSiteName(siteName) {
    cy.get("#siteName").type(siteName);
    cy.get(".suggestion-active").should("be.visible").click();
  }

  typeLabNumber(labNumber){
    cy.get("#display_labNo").type(labNumber);
  }
  checkNextButtonEnabled() {
    cy.contains('button', 'Next').click();
  }

  selectDNAPCRTest() {
    cy.get("#eid_dnaPCR").check({force: true} );
  }

  selectTubeSample() {
    cy.contains('span','Dry Tube').click();
  }

  selectBloodSample() {
    cy.contains('span','Dry Blood Spot').click();
  }

  visitBatchOrderEntryPage() {
    cy.get("h2").should("contain.text", "Batch Order Entry");
  }

  clickGenerateAndSaveBarcode() {
    cy.get(".cds--link > p").click();
  }

  saveOrder() {
    cy.get(":nth-child(6) > .cds--btn").click();
  }


  clickFinishButton() {
    cy.contains("button", "Finish").click();
  }
}

export default BatchOrderEntry;
