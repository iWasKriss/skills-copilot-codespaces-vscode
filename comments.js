// Create web server

// const express = require('express');
// const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');
const port = 3000;

// const app = express();
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const filePath = path.join(__dirname, pathname);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not Found');
            return;
        }

        if (stats.isDirectory()) {
            fs.readdir(filePath, (err, files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write('<ul>');
                files.forEach(file => {
                    const link = path.join(pathname, file);
                    res.write(`<li><a href="${link}">${file}</a></li>`);
                });
                res.end('</ul>');
            });
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', mime.getType(filePath));
            fs.createReadStream(filePath).pipe(res);
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});