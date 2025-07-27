class LimpiarPage {
  
  abrirModuloProductos() {
    cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click(); // menú lateral
    cy.get('.pl-8 > :nth-child(3) > .flex > span').click(); // sección Artículos
    cy.contains('Listado de Artículos').should('be.visible');
  }

  actualizarProducto({ sku, nombre, stock, costo, venta, unidad }) {
    // Asegurarse que el formulario esté visible
    // cy.get('form', { timeout: 10000 }).should('be.visible');
    cy.get('GTO-666').should('be.visible');

// Limpiar y escribir nuevos valores
    cy.get('#sku').clear().type(sku);
    cy.get('#name').clear().type(nombre);
    cy.get('#stock_quantity').clear().type(stock);
    cy.get('#cost_price').clear().type(costo);
    cy.get('#sale_price').clear().type(venta);
    cy.get('#unit').select(unidad);

       // Guardar los cambios
    cy.contains('button', 'Guardar Cambios', { timeout: 10000 }).should('be.visible').click();
  }

}

export const limpiarPage = new LimpiarPage();
