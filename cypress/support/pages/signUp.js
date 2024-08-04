let data
let detail
let emailAddress
let inboxId
// import { faker } from '@faker-js/faker'
const {faker} = require('@faker-js/faker')
before(() => {

    cy.fixture('example').then((ele) => {
        data = ele
    })

    cy.fixture('login').then((sel) => {
        detail = sel
    })
})


Cypress.Commands.add('insertDetail', (field)=>{
    switch(field){
        case 'full name':
            cy.insertAValue(data.fullnameField, faker.person.fullName())
            break
        case 'business name':
            cy.insertAValue(data.busBizNameField, faker.company.buzzVerb())
            break
        case 'password':
            cy.insertAValue(data.passwordField, 'Test@1234')
            break
        case 'business email':
            cy.insertEmail()
            break
        case 'business registeration number':
            cy.insertAValue(data.busRegNumField, 'RC-7898')
            break
        case 'business phone number':
            cy.insertAValue(data.busPhoneNUmberField, faker.phone.number('+23480########'))
            break
        case 'email':
            cy.insertAValue(data.emailField, detail.email )


    }
})

Cypress.Commands.add('insertBusinessDetails', () => {
    cy.insertAValue(data.fullnameField, faker.person.fullName() )
    cy.insertAValue(data.busBizNameField, faker.company.buzzVerb())
    cy.insertEmail()
    cy.insertAValue(data.busPhoneNUmberField, faker.phone.number('+23480########'))
    cy.insertAValue(data.busRegNumField, 'RC-7898')
})

Cypress.Commands.add('clickNextButton', (text) => {
    cy.get('button').contains(text).should('be.visible').click()
})

Cypress.Commands.add('insertMultipleData', (element, content) => {
    cy.get(element).each(($el, index) => {
        cy.wrap($el).type(content[index])
    })
})

Cypress.Commands.add('insertAdditionalDetails', (text) => {
    cy.clickAnElement(data.howYouHeard)
    cy.get(data.infoOption).contains(text).click()
})

Cypress.Commands.add('insertEmail', ()=>{
    cy.mailslurp().then(mailCreate=>mailCreate.createInbox().then(inbox=>{
        emailAddress = inbox.emailAddress
        inboxId = inbox.id
        const deetz = `
        {
        "email": "${emailAddress}"
        }
        `
        cy.writeFile('cypress/fixtures/login.json', deetz, 'utf-8')
        cy.insertAValue(data.busEmailField, emailAddress)
    }))
})

Cypress.Commands.add('extractOTP', ()=>{
    cy.mailslurp().then(mailRetrieve=>mailRetrieve.waitForLatestEmail(inboxId, 30000, true).then(email=>{
        const emailBody = email.body
        const parser = new DOMParser()
        const doc = parser.parseFromString(emailBody, 'text/html')
        const code = doc.querySelector('.main>tbody>tr:nth-child(2) p:nth-child(3)').textContent
        const OTP = code.trim()
        cy.insertMultipleData(data.inputField, OTP)
    }))
})