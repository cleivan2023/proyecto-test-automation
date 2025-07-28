class ProductoPage {

 abrirModuloProductos() {
  // Abre la sección de productos desde el sidebar
  cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click();
  cy.get('.pl-8 > :nth-child(3) > .flex > span').click();


  // Espera a que cargue la vista
  cy.contains('Artículo', { timeout: 10000 }).should('be.visible').click();

  //crear articulo
  cy.get('.inline-flex').click();

  // Espera a que el modal se abra (formulario de nuevo producto)
  //cy.get('form').should('be.visible');
}

//abre lisa de articulos y busca el articulo que necesito
 buscarModificarProducto() {
   cy.get(':nth-child(2) > :nth-child(1) > .cursor-pointer').click();
   cy.get('.pl-8 > :nth-child(3) > .flex > span').click(); //aca se mete a Articulos


    // Busca el producto por su nombre en la tabla y hace clic en Editar
    //cy.contains('td', GTO-666).parent().within(() => {
      //cy.contains('Editar').click();
    //});
  }


  crearProducto({ sku, nombre, stock, costo, venta, unidad }) {
    
    cy.get('.text-xl').should('be.visible'); // o cualquier otro selector visible del formulario

  cy.get('#sku').clear().type(sku);
  cy.get('#name').clear().type(nombre);
  cy.get('#stock_quantity').clear().type(stock);
  cy.get('#cost_price').clear().type(costo);
  cy.get('#sale_price').clear().type(venta);
  
  cy.get('#unit').select(unidad); // <-- cambia esto según el selector correcto del dropdown


  cy.contains('button', 'Guardar Cambios', { timeout: 10000 })
    .should('be.visible')
    .click();
}

}



export const productoPage = new ProductoPage();

