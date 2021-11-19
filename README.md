# superchat-backend-challenge-jeroensmink
Coding Challenge repo for superchat done by Jeroen Smink 2021

# How to run
Make sure you have Docker installed, then from the root of the project run `docker compose build` to build the Node.JS API. When that's finished run `docker compose up --force-recreate`. Docker will create the environment. Postgres has a special mount where I made sure a script is run to create and fill the database used in this project.

# Test the API
In the root of the project you will find a `Superchat Demo.postman_collection.json` import this file into Postman so you can test the API yourself with predefined HTTP requests.

![Import postman collection](demo/import_postman.gif)

# Place holder in text
The API allows for use of special text in the content body of the request, the user can use **{btc}** to get the current BTC price in USD or **{receiver_id}** to get the username of the person who will receive the message

![placeholder](demo/placeholder_in_text.gif)