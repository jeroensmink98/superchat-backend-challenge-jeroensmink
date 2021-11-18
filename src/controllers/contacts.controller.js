const db = require('./db');
const config = require('../config');
const helper = require('./db.helper');

/**
 * getContacts
 * @returns all contacts in the database
 */
async function getContacts(){
    const rows = await db.query(
        'SELECT * FROM contacts'
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * getContact
 * @param {number} id 
 * @returns a single contact based on the id
 */
async function getContact(id){
    const rows = await db.query(
        'SELECT * FROM contacts WHERE id = $1', [id]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * getContactByUsername
 * @param {string} username 
 * @returns a contact based on the username
 */
async function getContactByUsername(username){
    const rows = await db.query(
        'SELECT * FROM contacts WHERE username = $1', [username]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

/**
 * createContact
 * @param {object} contact 
 * @returns a message when a new contact has been created
 */
async function createContact(contact){
    const rows = await db.query(
        'INSERT INTO contacts(username, email) VALUES ($1, $2) RETURNING * ', [contact.username, contact.email]
    );
    let message = 'Error in creating contact';

    // Rows has length if insert is successfully
    if(rows.length){
        message = 'Contact created successfully';
    }

    return {message}

}

module.exports = {
    getContacts,
    getContact,
    createContact,
    getContactByUsername
}