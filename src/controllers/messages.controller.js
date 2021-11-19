const db = require('./db');
const config = require('../config');
const helper = require('./db.helper');
const btcController = require('./btc.controller');
const contactsController = require('./contacts.controller');

const placeHolders = {
    btc: '{btc}',
    receiver_id: '{receiver_id}'
};

/**
 * getMessageById
 * @param {number} id 
 * @returns a message given the ID
 */
async function getMessageById(id) {
    console.log(id);
    const rows = await db.query(
        'SELECT * FROM messages WHERE id = $1', [id]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * getMessages
 * @returns all messages in the database
 */
async function getMessages() {
    const rows = await db.query(
        'SELECT * FROM messages'
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * getConversation
 * @param {number} sender_id 
 * @param {number} receiver_id 
 * @returns Retrieve all messages send by a contact to another contact based on their ID
 */
async function getConversation(sender_id, receiver_id) {
    const rows = await db.query(
        'SELECT * FROM messages WHERE sender_id = $1 AND receiver_id = $2 ORDER BY id ASC',
        [sender_id, receiver_id]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * getMessagesBySender
 * @param {number} sender_id 
 * @returns all messages based on the sender_id
 */
async function getMessagesBySender(sender_id) {
    const rows = await db.query(
        'SELECT * FROM messages WHERE sender_id = $1 ORDER BY id ASC',
        [sender_id]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * getMessagesByReceiver
 * @param {number} receiver_id 
 * @returns all messages based on the receiver_id
 */
async function getMessagesByReceiver(receiver_id) {
    const rows = await db.query(
        'SELECT * FROM messages WHERE receiver_id = $1 ORDER BY id ASC',
        [receiver_id]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * createMessage
 * @param {object} msg 
 * @returns message when insert is successfull
 */
async function createMessage(msg) {
    // Check if the message contains placeHolders
    await containtsPlaceHolder(msg)
    const rows = await db.query(
        'INSERT INTO messages(content, sender_id, receiver_id) VALUES ($1, $2, $3) RETURNING * ',
        [msg.content, msg.sender_id, msg.receiver_id]
    );
    let message = 'Error in creating message';

    // Rows has length if insert is successfully
    if (rows.length) {
        message = 'Message created successfully';
    }
    return { message, msg }


}


async function containtsPlaceHolder(msg) {
    if (msg.content.includes(placeHolders.receiver_id)) {
        await setUsernameInContent(msg);
    }
    if (msg.content.includes(placeHolders.btc)) {
        await setBtcPrice(msg);
    }
}

async function setUsernameInContent(msg) {
    return new Promise((resolve) => {
        contactsController.getContact(msg.receiver_id).then((response) => {
            // Replace content placeholder for the receiver ID
            msg.content = msg.content.replace(placeHolders.receiver_id, response[0].username);
            resolve(msg);
        });
    });
}

async function setBtcPrice(msg) {
    return new Promise((resolve) => {
        btcController.currentBtcPrice().then((res) => {
            msg.content = msg.content.replace(placeHolders.btc, res.data.amount);
            resolve(msg);
        });
    });
}

module.exports = {
    createMessage,
    getMessages,
    getMessageById,
    getConversation,
    getMessagesBySender,
    getMessagesByReceiver
}