import { loginPage } from '../POM/login.Page.js';
import { limpiarPage } from '../POM/limpiar.page.js';

describe('Actualizar producto', () => {

  beforeEach(() => {
    cy.visit('/login'); // baseUrl configurado en cypress.config.js
  });

  it('Actualizar producto Iphone 16 a Iphone 16 Pro Max', () => {
    const email = Cypress.env('Email');
    const password = Cypress.env('Clave');

    // Login
    loginPage.login(email, password);
    cy.url().should('include', '/dashboard');

    // Abrir módulo de productos
    limpiarPage.abrirModuloProductos();

    // Buscar el producto original en el fixture y actualizar con el nuevo
    cy.fixture('products').then((productos) => {
      const productoOriginal = productos.find(p => p["Código"] === "GTO-666");
      const productoActualizado = productos.find(p => p["Código"] === "GTO-666-6");

      // Buscar producto por SKU (GTO-666) y hacer clic en editar
      cy.contains(productoOriginal["Código"])
        .parentsUntil('.space-y-2')
        .last()
        .find('svg')
        .eq(0)
        .click({ force: true });

      // Esperar formulario y actualizar con datos nuevos
      limpiarPage.actualizarProducto({
        sku: productoActualizado["Código"],
        nombre: productoActualizado["Descripción"],
        stock: productoActualizado["Stock Actual"].toString(),
        costo: productoActualizado["Costo"].toString(),
        venta: productoActualizado["Precio venta"].toString(),
        unidad: productoActualizado["Unidad de Medida"]
      });

      // Verificar que el mensaje emergente aparece
      cy.get('.Toastify__toast--info', { timeout: 10000 })
        .should('contain.text', 'actualizado con éxito');
    });
  });
});
