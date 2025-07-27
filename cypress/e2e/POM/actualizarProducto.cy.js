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

    cy.contains('GTO-666-6GTO-666-6-666').should('exist');
    cy.get(':nth-child(1) > .space-y-2 > :nth-child(1) > .text-gray-600').click();

    //editar
    cy.get('.pb-4 > .flex > .text-white').click();


    cy.fixture('products').then((productos) => {
      const productoOriginal = productos.find(p => p["Código"] === "GTO-666-6GTO-666-6-666");
      const productoActualizado = productos.find(p => p["Código"] === "GTO-666");

  // Abrir módulo de productos
  productoPage.abrirModuloProductos();



  // Usar los datos del fixture para rellenar el formulario con los nuevos datos
  productoPage.crearProducto({
    sku: productoActualizado["Código"],
    nombre: productoActualizado["Descripción"],
    stock: productoActualizado["Stock Actual"].toString(),
    costo: productoActualizado["Costo"].toString(),
    venta: productoActualizado["Precio venta"].toString(),
    unidad: productoActualizado["Unidad de Medida"]

 });
    //visualizacion del toas (mensaje emergente flotante)
    cy.get('.Toastify__toast--info').should('contain.text', 'actualizado con éxito');


     
    });  


    });

  });