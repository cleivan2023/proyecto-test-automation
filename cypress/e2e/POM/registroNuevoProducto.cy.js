import { loginPage } from '../POM/login.Page.js';
import { productoPage } from '../POM/producto.page.js';


describe('Registrar nuevo producto', () => {

  beforeEach(() => {
    cy.visit('/articulos'); // baseUrl ya está configurado en cypress.config.js

  });

  it('registrar un nuevo producto Iphone 16', () => {
    const email = Cypress.env('Email');
    const password = Cypress.env('Clave');

    loginPage.login(email, password);

    // Validación post-login
    cy.url().should('include', '/dashboard');

    cy.intercept('POST', '**/products').as('crearProducto');

       productoPage.abrirModuloProductos(); // Asegúrate de que este método exista en producto.page.js

    productoPage.crearProducto({
      sku: 'GTO-666',
      nombre: 'Iphone 16',
      stock: '25',
      costo: '700000',
      venta: '800000',
      unidad: 'Unidad'
    });

    cy.wait('@crearProducto').its('response.statusCode').should('eq', 500);

    cy.contains('button', 'Guardar Cambios', { timeout: 10000 })
      .should('be.visible')
      .click(); 

    
/*
   // Navegar a Artículos
    cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click();
    cy.get('.pl-8 > :nth-child(3) > .flex > span').click();

    // Ahora se abre el módulo productos (esto dispara el GET interceptado)
  productoPage.abrirModuloProductos();

  // Espera a que el GET con error se haya ejecutado
  //cy.wait('@getAPIError');

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
  .click();   */

 });




});  
