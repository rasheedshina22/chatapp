## whatsapp-v2

## Project description
    This is assignment as part of my george brown college<br>
    full stack course work. This is an instant messaging<br>
    application built on the MERN stack.<br>
    - <code>MongoDB</code>
    - <code>Express.js</code>
    - <code>React.js</code>
    - <code>Node.js</code>

    The application uses socket.io to allow for instant messaging.

### Features
    - users have the option to join different rooms
    - messages are available even after closing application
    - system logs are also saved within database

### End Points
- system currently has two end points

1. api/history - returns users history 
2. api/roomname - returns activity for specified room name which is sent in the body as a **post**

### How to start the project
within the root directory run <code>npm i</code> this will install the package dependancies needed to run the application.
The project can then be started using the command "npm start" which starts the server using nodemon on localhost:3000.

### Hosting
application being hosted on [whatsapp-v2.herokuapp.com](whatsapp-v2.herokuapp.com/api)

## Authors
- Fortune Creig [Phiri](https://www.github.com/creigPhiri)....................student number->101087294