class AdminPage {
  visit() {
    cy.visit("/admin");
  }

  getHeader() {
    return cy.get("h1");
  }

  // Add more methods to interact with elements on the admin page as needed
  clickSomeAdminButton() {
    return cy.get("#someAdminButton").click();
  }

  // Example method to verify an element on the admin page
  verifyAdminElement() {
    return cy.get("#adminElement").should("be.visible");
  }
  goToAdminPage() {
    this.openNavigationMenu();
    cy.get("#menu_admin").click();
    cy.get("#menu_admin_nav").click();
    return new AdminPage();
  }
}

export default AdminPage;
