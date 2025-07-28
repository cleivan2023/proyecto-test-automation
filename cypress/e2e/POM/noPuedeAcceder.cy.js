import { loginPage } from '../pageObjects/login.Page.js';
//import { productoPage } from '../POM/producto.page.js';

describe('No permitir acceso a usuarios no registrados', () => {

  beforeEach(() => {
    cy.visit('/login'); // baseUrl ya está configurado en cypress.config.js

  });

  it('No debería permitir acceso con credenciales incorrectas  ', () => {
     const emailIncorrecto = Cypress.env('Incorrecto');
    const passwordIncorrecta = 'ClaveFalsa123'; // Simulamos un intento inválido

   loginPage.login(emailIncorrecto, passwordIncorrecta);

    // Validación: no debe ingresar al dashboard
    cy.url().should('not.include', '/dashboard');

    
    // Validación adicional: debe aparecer un mensaje de error
    cy.contains('Las credenciales proporcionadas son incorrectas.').should('exist'); 

     });  

});