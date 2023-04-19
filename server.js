const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    let filePath;

    //retrieves index.html path
    if (req.url === '/') {
        filePath = './index.html';
    } else {
        //retrieves additional file paths
        filePath = `.${req.url}`;
    }

    //determines file extension
    const extname = String(path.extname(filePath)).toLowerCase();

    //mime type object
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
    };

    //assign content type based on extname key
    const contentType = mimeTypes[extname];

    //reads appropriate file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            //if reading error occurs, respond with file error
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404: File Not Found');

                //if server error occurs, respond with the error
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${error.code}`);
            }

            //serve content if no errors
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

//sets listener on defined port and hostname
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
