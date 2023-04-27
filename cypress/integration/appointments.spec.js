describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {
    
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones", 150);

    cy.get(".interviewers__item")
      .first()
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones", "Sylvia Palmer");

  })

  it("should edit an interview", () => {

    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save")
    .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones", "Tori Malcolm");
    
  })

  it("should cancel an interview", () => {

    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    cy.contains("Confirm")
      .click();

    cy.contains(/Deleting/i)
      .should("exist");

    cy.contains(/Deleting/i)
      .should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })

});