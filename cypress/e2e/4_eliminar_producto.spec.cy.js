const baseUrl = "https://test-adl.leonardojose.dev/login";
//const apiURL = "https://api-tester-adl.leonardojose.dev/";


describe("Consulta de productos", () => {

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("usuario registrado accede al sistema y realizar la consulta de productos", function () {
    cy.fixture('users').then((data) => {
      const usuario = data.usuarioExistente;

      cy.get('#email').type(usuario.email);
      cy.get('#password').type(usuario.password);
      cy.get(':nth-child(4) > .w-full').click();

      cy.url().should('include', '/dashboard');
      cy.contains('Bienvenido').should('exist');
   

    //dashboard
    cy.url().should('include', '/dashboard');

    // Interceptar POST
    cy.intercept('POST', '**/products').as('crearProducto');

    // Navegar a Artículos
    cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click();
    cy.get('.pl-8 > :nth-child(3) > .flex > span').click();

    //buscar el ariculo Iphone 16 Pro Max
    cy.get(':nth-child(3) > .space-y-2 > :nth-child(2) > .text-gray-600').should('contain.text', 'Iphone 16 Pro Max');

    //Eliminar producto
    cy.get(':nth-child(3) > .flex > .ml-4 > svg').click();

    //visualizacion del toas (mensaje emergente flotante)
    //cy.get('.Toastify__toast--info').should('contain.text', 'actualizado con éxito');




    });
  });
});

