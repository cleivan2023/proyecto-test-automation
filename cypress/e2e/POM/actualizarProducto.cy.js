import { limpiarPage } from '../pageObjects/limpiar.page.js';
import { loginPage } from '../pageObjects/login.Page.js';
import { productoPage } from '../pageObjects/producto.page.js';


describe('Actualizar producto', () => {

beforeEach(function () {
  // Interceptar la carga de productos ANTES del visit
  cy.intercept('GET', '**/api/products*').as('getProducts');

  // Visitar login y hacer login
  cy.visit('/login');
  const email = Cypress.env('Email');
  const password = Cypress.env('Clave');

  loginPage.login(email, password);

   // Confirmar que estamos logueados correctamente
 cy.url().should('include', '/dashboard');


});

it('Debe actualizar el producto Iphone 16 a Iphone 16 Pro Max', function () {
  
 cy.visit('/articulos');

  //Ir a módulo productos y buscar entidades
  productoPage.buscarModificarProducto(); 

// Esperar que se carguen los productos
    cy.wait('@getProducts');

 // Buscar el producto por código
  cy.contains('td', 'GTO-666', { timeout: 30000 }).scrollIntoView().should('exist');

  //click en el lapiz
 //cy.get('.flex > .text-indigo-600 > svg').click();

 //ME FALTO COMPLETAR ESTA PARTE, Disculpe Profe, no logre este objetivo.
 

// Leer los datos desde fixtures
    cy.fixture('products').then((producto) => {
      limpiarPage.actualizarProducto({
        sku: producto['GTO-666-6'],
        nombre: producto['Iphone 16 Pro Max'],
        stock: producto[20],
        costo: producto[809990],
        venta: producto[1000000],
        unidad: producto['Unidad de Medida']
  });

  cy.contains('td', nuevoProducto['Descripción']).should('exist'); 
});

 });
 });



 //Código:GTO-666


