import { loginPage } from './login.Page.js';
//import { productoPage } from '../POM/producto.page.js';

describe('Registrar nuevo producto', () => {

  beforeEach(() => {
    cy.visit('/articulos'); // baseUrl ya está configurado en cypress.config.js

  });

  it('actualizar el producto con nombre: Iphone 16 para Iphone 16 Pro Max  ', () => {
    const email = Cypress.env('Email');
    const password = Cypress.env('Clave');

    loginPage.login(email, password);

    // Validación post-login
    cy.url().should('include', '/dashboard');

    cy.intercept('POST', '**/products').as('crearProducto');

    // Navegar a Artículos
    cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click();
    cy.get('.pl-8 > :nth-child(3) > .flex > span').click();

    //Mostrar "Lista de Artículos"
    cy.contains('Listado de Artículos').should('be.visible');

     
    });  


    });

