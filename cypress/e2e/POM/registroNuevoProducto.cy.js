import { loginPage } from '../pageObjects/login.Page.js';
import { productoPage } from '../pageObjects/producto.page.js';


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

       productoPage.abrirModuloProductos(); 

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

    

   

 });


});  
