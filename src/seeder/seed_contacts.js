const express = require('express');
const contactsController = require('../controllers/contacts.controller.js');
const faker = require('faker');


function createContact(){
    var randomUsername = faker.internet.userName(); 
    var randomEmail = faker.internet.email();

    let contact = {
        username: randomUsername,
        email: randomEmail
    };
    return contact
}

async function seedContact(iterations){
    for(let i = 0; i < iterations; i++){
        const newContact = await createContact();
        contactsController.createContact(newContact);
    }
}

seedContact(5);