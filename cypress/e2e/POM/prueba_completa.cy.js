import { loginPage } from './login.Page.js';
import { productoPage } from './limpiar.page.js';

describe('Registrar nuevo producto', () => {

  beforeEach(() => {
    cy.visit('/login'); // baseUrl ya está configurado en cypress.config.js
  });

  it('usuario registrado accede al sistema y realizar la consulta de productos', () => {
    const email = Cypress.env('Email');
    const password = Cypress.env('Clave');

    loginPage.login(email, password);

    // Validación post-login
    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido', { timeout: 7000 }).should('exist');
  });


  it('Registrar un nuevo producto con nombre: Iphone 16 ', () => {
  const email = Cypress.env('Email');
  const password = Cypress.env('Clave');

  loginPage.login(email, password);

  // Validar login
  cy.url().should('include', '/dashboard');
  cy.contains('Bienvenido', { timeout: 7000 }).should('exist');

  // Interceptar GET con error 500 antes de abrir el módulo productos
  //  Elimina temporalmente el intercept con error 500
  cy.intercept('GET', '**/products*').as('getProductos');

  // Interceptar POST
  cy.intercept('POST', '**/products').as('crearProducto');// se repite

  // Ahora se abre el módulo productos (esto dispara el GET interceptado)
  productoPage.abrirModuloProductos();

  // Espera a que el GET con error se haya ejecutado
  cy.wait('@getAPIError');

  productoPage.crearProducto({
    sku: 'GTO-02',
    nombre: 'Iphone 16',
    stock: '25',
    costo: '700000',
    venta: '800000',
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
 it('actualizar el producto con nombre: Iphone 16 para Iphone 16 Pro Max  ', () => {
  const email = Cypress.env('Email');
  const password = Cypress.env('Clave');

  loginPage.login(email, password);

});


  it('usuario registrado accede al sistema y realizar la consulta de productos', () => {
    loginPage.login("userxxx@test.com", Cypress.env('Clave'));

    loginPage.elements.mensajeError()
      .should("be.visible")
      .and("contain.text", "Las credenciales proporcionadas son incorrectas");

    });
});


