describe("Navigate between pages", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has the correct site title", () => {
    cy.contains("h1", process.env.SITE_TITLE);
  });

  it("navigates to /explore", () => {
    cy.get("[data-cy=explore]").click().url().should("include", "/explore");
  });

  it("navigates to /announcement", () => {
    cy.get("[data-cy=announcement]").click().url().should("include", "/announcement");
  });

  it("navigates to novel pages", () => {
    cy.get("[data-cy=yashura]").click().get("h1").should("have.text", "Yashura Legacy");
  });

  it("loads a chapter correctly", () => {
    cy.get("[data-cy=yashura]")
      .click()
      .get("[data-cy=read-now]")
      .click()
      .get("[data-cy=chapter-number]")
      .should("have.text", "CHAPTER 1");
  });
});
