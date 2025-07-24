const baseUrl = "https://test-adl.leonardojose.dev/login";
//const apiURL = "https://api-tester-adl.leonardojose.dev/";


describe("Actualizar el producto", () => {

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

    
    //dashboard
    cy.url().should('include', '/dashboard');

    // Interceptar POST
    cy.intercept('POST', '**/products').as('crearProducto');

    // Navegar a Artículos
    cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click();
    cy.get('.pl-8 > :nth-child(3) > .flex > span').click();

    //buscar el ariculo Iphone 16
    cy.get(':nth-child(8) > .space-y-2 > :nth-child(2) > .text-gray-600').click();

    //click Editar
    cy.get('.pb-4 > .flex > .text-white').click();

    //Editar Artículos
    //CONSULTA: se tienen que agregar otros datos complementarios? y como cuales?
      cy.get('#name').type('Iphone 16 Pro Max');

    //CLICK guardar cambios
    cy.get('.ml-3').click();

    //visualizacion que la prueba se ha pasado correctamente: 
    //cy.get('#\31 ')// es fragil no recomendado

    //cy.contains('actualizado con éxito').should('be.visible');

    //visualizacion del toas (mensaje emergente flotante)
    cy.get('.Toastify__toast--info').should('contain.text', 'actualizado con éxito');

      });
    });
});