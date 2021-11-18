CREATE USER postgres;
CREATE DATABASE superchat;
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