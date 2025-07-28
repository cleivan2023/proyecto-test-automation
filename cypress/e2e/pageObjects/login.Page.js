class login {

    //Propiedades o elementos
    elements = {
        inputEmail: () => cy.get('#email'),
        inputPassword: () => cy.get('#password'),
        botonLogin: () => cy.get(':nth-child(4) > .w-full'),
        mensajeError: () => cy.get('.Toastify__toast--error', { timeout: 6000 }),
       

    };

    //métodos o comportamientos (Funciones)
    typeEmail(email) { //parametros
        this.elements.inputEmail().type(email);

    };

    typePassword(password) {
        this.elements.inputPassword().type(password);

    };

    clickLogin() {
        this.elements.botonLogin().click();

    };


    login(email,password) {
        this.typeEmail(email);
        this.typePassword(password);
        this.clickLogin();
    };
}

export const loginPage = new login(); //se exporta la clase login
