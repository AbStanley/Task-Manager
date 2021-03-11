// common.js
// Some common functions

const entity = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
};
 
function escapeHtml(text) {
    return text.replace(/[<>&"]/g, t => entity[t]);
}

function defaultNotFound(req, res) {
    res.status(404);
    res.type("text/html");
    res.send(`<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Not Found</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
            <link rel ="stylesheet" href="/styles/todo.css"> 
        </head>
        <body>
            <div class="body">
                <h1 class = "title is-1">Not Found</h1>
                <p>
                    The requested URL <code style="color: red;">${req.path}</code> could not be found
                </p>
            </div>
        </body>
    </html>`);
}

function internalError(err, req, res, next) {
    res.status(500);
    res.type("text/html");
    res.send(`<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Server Error</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
            <link rel ="stylesheet" href="/styles/todo.css"> 
        </head>
        <body>
            <div class="body">
                <h1 class = "title is-1">Internal Server Error</h1>
                <p>
                    An unexpected error has occuring while processing your request 
                </p>
            </div>
        </body>
    </html>`);
}

module.exports = {
    escapeHtml, 
    defaultNotFound,
};