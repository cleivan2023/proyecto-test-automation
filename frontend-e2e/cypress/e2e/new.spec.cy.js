const baseUrl = "https://test-adl.leonardojose.dev/login";
const apiURL = "https://api-tester-adl.leonardojose.dev/";

describe('Registar nuevo producto', () => {


    it('Debería mostrar productos mockeados correctamente en la UI', () => {
        cy.intercept('GET', "apiURL", (req) => {
            //Cypress.log({ name: 'Intercept', message: 'Interceptando consulta' });
            req.reply({ fixture: 'products.json' });
        }).as('getProducts');

        cy.visit(baseUrl);

        cy.wait('@getProducts')

 });
});

//const baseUrl = "https://test-adl.leonardojose.dev/login";
//const apiURL = "https://api-tester-adl.leonardojose.dev/";




// beforeEach(() => {
//   cy.visit(baseUrl);
//  });

//  it("Registrar un nuevo producto con nombre: Iphone 16 ", function () {
//    cy.fixture('users').then((data) => {
//      const usuario = data.usuarioExistente;