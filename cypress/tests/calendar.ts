import {Given, When, Then, DataTable} from '@badeball/cypress-cucumber-preprocessor';

Given('the user navigates to the calendar page', () => {
  cy.visit('/');
  cy.get('app-calendar').should('be.visible');

});
Given("Today's date should be", (table: DataTable) => {
  const tableRow = table.rows()[0] as number[];
  cy.clock(Date.UTC(tableRow[0], tableRow[1], tableRow[2]), ['Date']);
});

Then("the user should see {string} as label of calendar", (label: string) => {
  cy.get('[data-cy="calendar-label"]').contains(label);
})

Then("the {int} should be highlighted as today", (day: number) => {
  cy.get('.calendar-today').should('contain', day);
})

Given("the user should see these calender types", (table: DataTable) => {
  cy.get('[data-cy="calendar-type-dropdown"]').click();
  cy.get('mat-option').should('contain', table.rows()[0]);
  cy.get('mat-option').should('contain', table.rows()[1]);
});

When("the user clicks on the next button", () => {
  cy.get('[data-cy="calendar-next"]').click();
});
When("the user clicks on the previous button", () => {
  cy.get('[data-cy="calendar-previous"]').click();
});

When("the user selects {string} calender type", (calendarType: string) => {
  cy.get('[data-cy="calendar-type-dropdown"]').click();
  cy.get('mat-option').contains(calendarType).click();
})

Then("the user should see these data as a week names", (table: DataTable) => {
  for (let tableItem of table.rows()[0]) {
    cy.get(".calendar-week-name").should('contain', tableItem);
  }
});
