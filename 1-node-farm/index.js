const fs = require('fs');


// FILES!

//blocking, synchronous way
const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync('./starter/txt/output.txt', textOut)

console.log('File written!');


//practice run 
fs.readFile('./starter/txt/input.txt', 'utf-8', (err, data1) => {
    fs.readFile('./starter/txt/avocado.txt', 'utf-8', (err, data2) => {
        fs.readFile(`./starter/txt/${data2}.txt`, 'utf-8', (err, data3) => {
            fs.readFile('./starter/txt/output.txt', 'utf-8', (err, data4) => {
                fs.writeFile('./starter/txt/testcallback.txt', `${data1} \n${data2} \n${data3} \n${data4}`, 'utf-8', (err) => {
                    if(err) throw err;
                    console.log('Your file has been saved ! It worked.');
                    console.log('data 2: ' + data2);
                    console.log('data 3: ' + data3);
                })
            })
        })
    })
})


// Non-blocking, asynchronous way 
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('ERROR! No file !');
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./starter/txt/final2.txt', `${data1} \n${data2} \n${data3}`, 'utf-8', (err) => {
                if(err) throw err;
                console.log('Your file has been saved ! Nice !')
            })
        });
    });
});
console.log('Will read file!');