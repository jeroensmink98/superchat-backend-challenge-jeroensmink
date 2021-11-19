const express = require('express');
const messageController = require('../controllers/messages.controller.js');
const faker = require('faker');

/**
 * Seed some messages
 */

async function seedMessages() {

}

for (let i = 0; i < 40; i++) {
    var randomSentence = faker.lorem.sentence(6, 2);


    let msg = {
        content: randomSentence,
        sender_id: faker.datatype.number(2, 8),
        receiver_id: faker.datatype.number(4, 10)
    }

    messageController.createMessage(msg).then(() => {
        console.log('new message inserted');
    });

}

function createMessage(){
    let msg = {
        content: randomSentence,
        sender_id: faker.datatype.number(2, 8),
        receiver_id: faker.datatype.number(4, 10)
    }
    return msg
}

async function seedMessage(iterations){
    for(let i = 0; i < iterations; i++){
        const newContact = await createMessage();
        messageController.createMessage(msg);
    }
}

seedMessage(5);