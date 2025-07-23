//Muestra error POST 401

const baseUrl = "https://test-adl.leonardojose.dev/login";
const apiURL = "https://api-tester-adl.leonardojose.dev/";


describe("Consulta de productos", () => {

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("usuario registrado accede al sistema y realizar la consulta de productos", function () {
    cy.fixture('users').then((data) => {
      const usuario = data.usuarioNoRegistrado;

      cy.get('#email').type(usuario.email);
      cy.get('#password').type(usuario.password);
      cy.get(':nth-child(4) > .w-full').click();

    //visualizacion del toas (mensaje emergente flotante)
    cy.get('.Toastify__toast--info', { timeout: 6000 }) // espera hasta 6s a que aparezca
  .should('contain.text', 'Las credenciales proporcionadas son incorrectas');

    //cy.wait(3000);
    //cy.get('.Toastify__toast--info').should('contain.text', 'Las credenciales proporcionadas son incorrectas');

    
    //Las credenciales proporcionadas son incorrectas

       });
  });
});

