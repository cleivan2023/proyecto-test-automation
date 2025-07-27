import { loginPage } from '../POM/login.Page.js';
import { productoPage } from '../POM/producto.page.js';

describe('Registrar nuevo producto', () => {

  beforeEach(() => {
    cy.visit('/login'); // baseUrl ya está configurado en cypress.config.js
  });

  it('Login exitoso y validación de dashboard', () => {
    const email = Cypress.env('Email');
    const password = Cypress.env('Clave');

    loginPage.login(email, password);

    // Validación post-login
    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido', { timeout: 7000 }).should('exist');
  });


  it('Registrar un nuevo producto con error simulado del servidor', () => {
  const email = Cypress.env('Email');
  const password = Cypress.env('Clave');

  loginPage.login(email, password);

  // Validar login
  cy.url().should('include', '/dashboard');
  cy.contains('Bienvenido', { timeout: 7000 }).should('exist');

  // Interceptar GET con error 500 antes de abrir el módulo productos
  //  Elimina temporalmente el intercept con error 500
cy.intercept('GET', '**/products*').as('getProductos');

  //cy.intercept('GET', '**/products*', {
   // statusCode: 500,
    //body: { error: "error simulado" } // Puedes dejarlo vacío si el frontend espera un array
  //}).as('getAPIError');

  // Interceptar POST
  cy.intercept('POST', '**/products').as('crearProducto');

  // Ahora se abre el módulo productos (esto dispara el GET interceptado)
  productoPage.abrirModuloProductos();

  // Espera a que el GET con error se haya ejecutado
  cy.wait('@getAPIError');

  productoPage.crearProducto({
    sku: 'Gatito siamés',
    nombre: 'Gatito muy simpático y regalón',
    stock: '1',
    costo: '20',
    venta: '1000000',
    unidad: 'Unidad'
  });

  // Validar que el POST falló con código 500
  cy.wait('@crearProducto').its('response.statusCode').should('eq', 500);

  // Validar mensaje de error del frontend
  //cy.contains('Error al cargar los artículos.').should('be.visible');
  cy.contains('button', 'Guardar Cambios', { timeout: 10000 })
  .should('be.visible')
  .click();

});


  it('Muestra mensaje de error con usuario inválido -5', () => {
    loginPage.login("userxxx@test.com", Cypress.env('Clave'));

    loginPage.elements.mensajeError()
      .should("be.visible")
      .and("contain.text", "Las credenciales proporcionadas son incorrectas");

    });
});


