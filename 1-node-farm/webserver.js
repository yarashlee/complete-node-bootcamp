//ECMAScript module -- build in module 
const fs = require('fs');
const http = require('http');
const url = require('url');


//SERVER
// Create a web-server capable of recieving request and sending responses
// Create server will accpt a callback function, which will be fired off each time a new request hits our server

// synchronous version
// top level code gets executes once, right in the beginning (once we start the program)
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct= fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// req = request variable ---- res= response variable 
// this gets executed each time that there is a new request
const server = http.createServer((req, res) => {
    //send back a response to the client

    const { query, pathname } = url.parse(req.url, true);

    //basic routing
    // Overview Page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);

    // Product Page 
    } else if (pathname === '/product') {
        console.log(query);

        res.writeHead(200, {'Content-Type': 'text/html'});
        
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

    // API
    } else if (pathname === '/api') {

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

    // Not Found
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

