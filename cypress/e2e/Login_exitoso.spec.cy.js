const baseUrl = "https://test-adl.leonardojose.dev/login";
//const apiURL = "https://api-tester-adl.leonardojose.dev/";

//solo como prueba 

describe("Login de usuario con fixture", () => {

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("Login exitoso con usuario existente", function () {
    cy.fixture('users').then((data) => {
      const usuario = data.usuarioExistente;

      cy.get('#email').type(usuario.email);
      cy.get('#password').type(usuario.password);
      cy.get(':nth-child(4) > .w-full').click();

      cy.url().should('include', '/dashboard');
      cy.contains('Bienvenido').should('exist');
    });
  });

  //tiene un ERROR EN LA API
  it("Registrar un nuevo producto: iPhone 16", function () {
  cy.fixture('users').then((data) => {
    const usuario = data.usuarioExistente;

    // Login
    cy.get('#email').type(usuario.email);
    cy.get('#password').type(usuario.password);
    cy.get(':nth-child(4) > .w-full').click();

    cy.url().should('include', '/dashboard');

    // Interceptar POST
    cy.intercept('POST', '**/products').as('crearProducto');

    // Navegar a Artículos
    cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click();
    cy.get('.pl-8 > :nth-child(3) > .flex > span').click();

    // Botón crear artículo
    cy.get('.inline-flex').click();

    // Llenar formulario
      cy.get('#sku').type('iPhone 16');
      cy.get('#name').type('Último modelo Apple 2025');
      cy.get('#stock_quantity').type('25');
      cy.get('#cost_price').type('829000');
      cy.get('#sale_price').type('1000000');
      cy.get('#unit').select('Unidad');

    // Enviar
    //cy.get('.ml-3').click();
    cy.get('button[type="submit"].ml-3').click();


 
    });
  });
});




