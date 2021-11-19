const express = require('express');
const contactsController = require('../controllers/contacts.controller.js');
const faker = require('faker');


const contact = function(){
    return new Promise((resolve, reject) => {
        var randomUsername = faker.internet.userName(); 
        var randomEmail = faker.internet.email();

        let contact = {
            username: randomUsername,
            email: randomEmail
        };

        contactsController.createContact(contact).then(() =>{
            'inserted new contact'
        })

    })
}

/**
 * Seed some contacts
 */
 for(let i =0; i < 10; i++){
    contact().then(() => {
        console.log('inserted new contact');
    })
}