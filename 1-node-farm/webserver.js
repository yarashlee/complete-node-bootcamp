//ECMAScript module -- build in module 
const fs = require('fs');
const http = require('http');
const url = require('url');


//SERVER
// Create a web-server capable of recieving request and sending responses
// Create server will accpt a callback function, which will be fired off each time a new request hits our server

// synchronous version
// top level code gets executes once, right in the beginning (once we start the program)
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// req = request variable ---- res= response variable 
// this gets executed each time that there is a new request
const server = http.createServer((req, res) => {
    //send back a response to the client
    console.log(req.url);
    
    const pathName = req.url;

    //basic routing
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello-it-worked' 
        });
        res.end('<h1> This is the OVERVIEW ! </h1>');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT !');
    } else if (pathName === '/api') {

        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

        // we dont want it reading the file each time a new request is made thats why we turn it into a sync 
        // fs.readFile(`${__dirname}/starter/dev-data/data.json`, 'utf-8', (err, data) => {
        //     // JSON.parse --> take the string an automatically turn it into JS object or array
        //     const productData = JSON.parse(data);
        //     //telling the browser we sending a json file
        //     res.writeHead(200, {
        //         'Content-type': 'application/json'
        //     });
        //     res.end(data);
        // });

    } else {
        res.writeHead(404, {
            // header piece of information about the response that wee are trying to send back
            // we can never send headers after the response content itself --> res.end
            'Content-Type': 'text/html',
            'my-own-header': 'hello-world' 
        });
        res.end('<h1> Page Not Found </h1?>');
    }
});

//listen to incoming request from the server
// '127.0.0.1' --> local API address (localhost)
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
});

