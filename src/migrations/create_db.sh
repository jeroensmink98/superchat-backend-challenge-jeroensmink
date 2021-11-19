#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
GRANT ALL PRIVILEGES ON DATABASE superchat TO postgres;

CREATE SEQUENCE contact_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE message_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS messages;

CREATE TABLE contacts(
    id bigint DEFAULT nextval('contact_id_seq'::regclass) NOT NULL PRIMARY KEY,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO contacts(username, email) VALUES ('jeroensmink98', 'jeroensmink98@gmail.com');
INSERT INTO contacts(username, email) VALUES ('NeilFootstrong', 'neil.footstrong@nasa.gov');
INSERT INTO contacts(username, email) VALUES ('MrTwoFace', 'mrtwo@face.com');

CREATE TABLE messages(
    id bigint DEFAULT nextval('message_id_seq'::regclass) NOT NULL PRIMARY KEY,
    content character varying(1024) NOT NULL,
    sender_id INT, 
    CONSTRAINT fk_sender_id 
        FOREIGN  KEY(sender_id) 
            REFERENCES contacts(id),
    receiver_id INT, 
    CONSTRAINT fk_receiver_id 
        FOREIGN  KEY(receiver_id) 
            REFERENCES contacts(id),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO messages(content, sender_id, receiver_id) VALUES ('Hello sir', 1, 2);
INSERT INTO messages(content, sender_id, receiver_id) VALUES ('Good day to you', 2, 1);
INSERT INTO messages(content, sender_id, receiver_id) VALUES ('What are you doing?', 1, 2);
INSERT INTO messages(content, sender_id, receiver_id) VALUES ('Good morning', 3, 1);
INSERT INTO messages(content, sender_id, receiver_id) VALUES ('Goof afternoon to you', 3, 2);




EOSQL