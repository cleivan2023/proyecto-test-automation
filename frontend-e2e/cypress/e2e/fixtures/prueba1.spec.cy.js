const baseUrl = "https://test-adl.leonardojose.dev/login";
const apiURL = "https://api-tester-adl.leonardojose.dev/";

//solo como prueba 
describe("Login exitoso - usuario registrado", () => {

    it('Emty array', () => {

         cy.intercept('GET', '/products', {
             fixture: 'empty.products.json'
        }).as('emptyProducts');

        cy.visit(baseUrl);
       
        cy.wait('@emptyProducts').its('response.body').should('have.length', 0);

        // Pausar para inspección
        cy.wait(2000);

        cy.contains('Ningún producto disponible.');
     //toddo va a depender de lo que se pide en la historia de usuario y no lo que el desarrollador pide 
    
    })

});