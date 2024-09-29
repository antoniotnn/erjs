/// <reference types="Cypress" />
/* eslint-disable */
// @ts-ignore

describe("My first test", () => {
    it("compares value with true", () => {
        const value = true;
        expect(value).to.equal(true);
    });

    it('searches for "teste automatizado com cypress" in google', () => {
        cy.visit("https://google.com.br");

        cy.get('input[type="text"]').type("teste automatizado com cypress");
        cy.contains("Pesquisa Google").click();
    });

});