import { loginPage } from '../POM/login.Page.js';
import { productoPage } from '../POM/producto.page.js';

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

    cy.contains('GTO-666').should('exist');
    //cy.get(':nth-child(1) > .space-y-2 > :nth-child(1) > .text-gray-600').click();

     //Eliminar producto
    cy.get(':nth-child(1) > .flex > .ml-4 > svg').click();
    //cy.get('*[@id="root"]/div/div/main/div/div[2]/div[1]/div/table/tbody/tr[1]/td[7]/button[2]/svg').click();
    //visualizacion del toas (mensaje emergente flotante)
    //cy.get('.Toastify__toast--info').should('contain.text', 'actualizado con éxito');

    
    });  

});

