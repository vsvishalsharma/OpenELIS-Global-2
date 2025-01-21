import LoginPage from "../pages/LoginPage";

let homePage = null;
let loginPage = null;
let batchOrder = null;

const navigateToBatchOrderEntryPage = () => {
  homePage = loginPage.goToHomePage();
  batchOrder = homePage.goToBatchOrderEntry();
};

before(() => {
  cy.fixture("BatchOrder").as("batchOrderData");
});

before("login", () => {
  loginPage = new LoginPage();
  loginPage.visit();
});

describe("Batch Order Entry On Demand and Serum form type", function () {
  before("navigate to Batch Order Entry Page", function () {
    navigateToBatchOrderEntryPage();
  });

  it("User visits Batch Order Entry Setup Page", function () {
    batchOrder.visitSetupPage();
    batchOrder.checkNextButtonDisabled();
  });

  it("User selects Routine Form and Routine form type", function () {
    cy.fixture("BatchOrder").then((batchOrderData) => {
      batchOrder.selectForm(batchOrderData.formTypeRoutine);
      batchOrder.selectSampleType(batchOrderData.serumSample);
    });
  });

  it("User checks Panels and Tests", function () {
    batchOrder.checkBilanPanel();
    batchOrder.checkSerologiePanel();
    //tests picked at random
    batchOrder.checkDenguePCR();
    batchOrder.checkHIVViralLoad();
    batchOrder.checkCreatinine();
  });

  it("Should Select Methods, Site Name and Move to Next Page", function () {
    cy.fixture("BatchOrder").then((batchOrderData) => {
      batchOrder.selectMethod(batchOrderData.methodOnDemand);
      batchOrder.checkFacilityCheckbox();
      batchOrder.checkPatientCheckbox();
      batchOrder.enterSiteName(batchOrderData.siteName);
      batchOrder.checkNextButtonEnabled();
    });
  });

  it("Generate BarCode", function () {
    cy.fixture("BatchOrder").then((batchOrderData) => {
      batchOrder.typeLabNumber(batchOrderData.labNumber);
      batchOrder.clickGenerateAndSaveBarcode();
      batchOrder.checkNextLabel().should("be.visible");
    });
    });
  
    it("User clicks the finish button", function () {
      batchOrder.clickFinishButton();
    });
  });

describe("Batch Order Entry Pre Printed and EID form type", function () {
  before("navigate to Batch Order Entry Page", function () {
    navigateToBatchOrderEntryPage();
  });

  it("User visits Batch Order Entry Setup Page", function () {
    batchOrder.visitSetupPage();
    batchOrder.checkNextButtonDisabled();
  });

  it("User selects EID form, samples and test", function () {
    cy.fixture("BatchOrder").then((batchOrderData) => {
      batchOrder.selectForm(batchOrderData.formTypeEID);
      batchOrder.selectDNAPCRTest();
      batchOrder.selectTubeSample();
      batchOrder.selectBloodSample();
    });
  });

  it("User Selects Methods, Site Name and Move to Next Page", function () {
    cy.fixture("BatchOrder").then((batchOrderData) => {
      batchOrder.selectMethod(batchOrderData.methodPrePrinted);
      batchOrder.checkFacilityCheckbox();
      batchOrder.checkPatientCheckbox();
      batchOrder.enterSiteName(batchOrderData.siteName);
      batchOrder.checkNextButtonEnabled();
    });
  });

  it("Should Visit Batch Order Entry Page", function () {
    batchOrder.visitBatchOrderEntryPage();
  });


  it(" Generate Barcode", function () {
    batchOrder.clickGenerateButton();
    batchOrder.saveOrder();
  });

  it("User clicks the finish button", function () {
    batchOrder.clickFinishButton();
  });
});
