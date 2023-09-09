Installation and setup of backend with route structure completed
installation packages are as below
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.0.0",
    "mongoose": "^7.5.0",
    "morgan": "^1.10.0",
    "nodemon": "^3.0.1"

    Here's a brief explanation of why each of these packages is commonly used:
    body-parser: This middleware is used to parse the request body in HTTP requests. It's essential for handling POST and PUT 
    requests when you need to extract data from forms or JSON payloads.

    cors (Cross-Origin Resource Sharing): CORS is used to enable cross-origin requests 
    from a web page to a different domain. It's necessary when your frontend (React, for example) 
    is hosted on a different domain than your backend API.

    dotenv: dotenv allows you to load environment variables from a .env file into your application. 
    This is useful for storing sensitive information like API keys or database credentials securely without hardcoding them in your codebase.

    express: Express is a popular web application framework for Node.js. It simplifies routing, middleware management,
    and handling HTTP requests and responses. It's the core component for building the backend of your MERN application.

    helmet: Helmet is a middleware for securing Express applications by setting various HTTP headers to protect against 
    common web vulnerabilities, such as Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).

    mongoose: Mongoose is an Object Data Modeling (ODM) library for MongoDB. It simplifies interactions with the MongoDB 
    database by providing a schema-based modeling approach, validation, and middleware support.

    morgan: Morgan is a middleware for logging HTTP requests in your Node.js application. It helps you monitor and debug the 
    incoming requests and responses.

    nodemon: Nodemon is a development utility that monitors your server files for changes and automatically restarts your Node.js server
    when changes are detected. This is extremely useful during the development phase, as you don't have to manually restart the server after each code change.