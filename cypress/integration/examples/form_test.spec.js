describe('Form test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsBox = () => cy.get('input[name=terms]')
    
    const submitButton = () => cy.get('button')

    const nameError = () => cy.contains('Name is required')
    const emailError = () => cy.contains('Email is required')
    const passwordError = () => cy.contains('Password is required')
    const termsError = () => cy.contains('You must accept the Terms of Service')

    const formInitialState = () => {
        nameInput().should('have.value', '')
        emailInput().should('have.value', '')
        passwordInput().should('have.value', '')
        termsBox().should('not.be.checked')
        submitButton().should('be.disabled')

        nameError().should('not.exist')
        emailError().should('not.exist')
        passwordError().should('not.exist')
        termsError().should('not.exist')
    }


    it('elements are showing', () => {
        nameInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
        termsBox().should('exist')
        submitButton().should('exist')
    })

    
    it('inputs are empty and submit button is disabled', () => {
        formInitialState()
    })

    it('inputs can be filled and submitted', () => {
        nameInput()
            .type('Luke Skywalker')
            .should('have.value', 'Luke Skywalker')

        emailInput()
            .type('luke@email.com')
            .should('have.value', 'luke@email.com')
        
        passwordInput()
            .type('password')
            .should('have.value', 'password')
        
        termsBox()
            .click()
            .should('be.checked')
        
        submitButton()
            .should('not.be.disabled')
            .click()

        cy.contains('Luke Skywalker').should('exist')
        cy.contains('luke@email.com').should('exist')
    })

    it('inputs are empty and submit is disabled again', () => {
        formInitialState()
    })

    it('form validation error message for invalid email appears', () => {
        emailInput()
            .type('email')
            .should('have.value', 'email')
        
        cy.contains('Must be a valid email address').should('exist')

        emailInput().clear()
        
        cy.contains('Must be a valid email address').should('not.exist')
    })

    it('form validation error messages for empty fields appear', () => {
        nameInput()
            .type('Leia Organa')
            .should('have.value', 'Leia Organa')
            .clear()
        nameError().should('exist')

        emailInput()
            .type('leia@email.com')
            .should('have.value', 'leia@email.com')
            .clear()
        emailError().should('exist')

        passwordInput()
            .type('password')
            .should('have.value', 'password')
            .clear()
        passwordError().should('exist')

        termsBox()
            .click()
            .should('be.checked')
            .click()
            .should('not.be.checked')
        termsError().should('exist')
    })

    it('error messages disappear on field filling, second submit works', () => {
        nameInput()
            .type('Leia Organa')
            .should('have.value', 'Leia Organa')
        nameError().should('not.exist')

        emailInput()
            .type('leia@email.com')
            .should('have.value', 'leia@email.com')
        emailError().should('not.exist')

        passwordInput()
            .type('password')
            .should('have.value', 'password')
        passwordError().should('not.exist')

        termsBox()
            .click()
            .should('be.checked')
        termsError().should('not.exist')

        submitButton()
            .should('not.be.disabled')
            .click()

        cy.contains('Leia Organa').should('exist')
        cy.contains('leia@email.com').should('exist')

        formInitialState()
    })
})