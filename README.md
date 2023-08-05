# Employee-Tracker-App

## Technology used
| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| Deployed Heroku App  | [https://note-taker-app-shirvanyank-f32586d10362.herokuapp.com/](https://note-taker-app-shirvanyank-f32586d10362.herokuapp.com/) |
| My Repository      | [https://github.com/ShirvanyanKaren/notetaker-application](https://github.com/ShirvanyanKaren/notetaker-application) |
| Node JS          | [https://nodejs.org/it/docs](https://nodejs.org/it/docs) |
| Express JS    | [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html) |
| Git | [https://git-scm.com/](https://git-scm.com/)     | 



# Description

The purpose of this application is to allow the user to add notes and save them to a list. The list is present in a column on the left-hand side of the page, making each saved note accessible to the user. 

The application had to meet the following acceptance criteria:

```md
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

Here is an example of how the application runs:

![Notetaker-App](./Assets/notetaker%20application,%202023%206_20%20PM.gif)


## Table of Contents
* [Express JS Routing](#express-js-routing)
* [Usage](#usage)
* [Contributions](#contributions)
* [License](#license)
* [Questions](#questions) 


## Express JS Routing

The note taker application was developed with preset code of fetch requests with get, post and delete methods for obtaining information on the client side. The input data is then stored on the back-end database JSON file using corresponding express js routing methods made accessible to the home page and the notes page.


### Server file 

The server.js file served as the medium to deliver the routes to the user. This was done through the importing the methods express, path, and index routes that provided all the preset routing methods for the notes page.

```js
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// request and response leading to each page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
```
The middleware present with the app.use methods sets an intermediary for the programs request, response cycle. The lines of middleware code respectively parse incoming json data, parses incoming URL-encoded data, mounts the exported api router onto the '/api' path, and allows client side access to the files stored in the public directory (the home and notes html pages).

### Notes route

The routes files provide routing methods for the get, post, and delete methods respective to the database where we store client provided information.

```js
notes.get('/', (req, res) => {
    
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
    console.log(`${req.method} request received to add a note`);

    const { text, title } = req.body;

    if (text && title) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.status(400).json({ error: 'Bad Request. Could not add note' });
    
    }
});
```

The express routing methods for these requests follow a similar pattern to the javascript fetch methods, however instead of storing these items in local storage, we parse them and store them in the database. The functions readFromFile and readAndAppend are defined functions from the fsUtil helper extension. The readFromFile is a function that promisifies the fs.readFile function essentially making it into an asynchronous function that takes the database file path as an argument and returns the content only once it has been read. 

The readAndAppend function works similarly but instead uses both the fs.writeToFile and fs.readFile methods. It reads the content of the file then parses the existing JSON data in the file, appends the new content to it, and then writes the updated JSON data back to the same file using the writeToFile function.

Essentially, these methods obtain information from the database to append on the page while also allowing the user to update the database given their note includes text and title. This is all done in the notes route and exported to be used in the index-routes.


### Index route

Finally, I utilized the index route file to make the notes route applicable to the server.

```js
const app = require('express').Router();

const noteRouter = require('./notes');

app.use('/notes', noteRouter);

module.exports = app;
```
This file serves the purpose of providing an endpoint, /api, with the value of notesRouter linking back to the exported notes route. This makes the client side get, post, and delete fetch methods applicable to the database once imported and applied to the server file. 


## Usage 

This application can be used to plan out your day, take notes, or store information that can be deleted and saved. Through the utilization of expess routing and a JSON database, the information is stored and accessible from anywhere and on any computer. 

        
## Credits
Credits to Philip Loy from the Central Tutor Center for helping with review the application and making sure I met the acceptance criteria.

        
## License 
     
MIT licensing with permisions such as commercial use, modification, distribution and private use. Limitations include liability and warranty.

## Questions 

* Check out my other projects on my [my Github](https://github.com/ShirvanyanKaren)
* For any additional questions or concerns, please email me at kshirvanyan2000@gmail.com