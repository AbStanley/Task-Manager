// control.js
// Jeremy Campbell
// Controller middleware for the to-do form

function addItem(req, res) {
    if (!req.body.item){
        //TODO: Change this status?
        return res.sendStatus(400);
    }

    if (!req.session.items) {
        req.session.items = [];
    }

    let newItem = {
        title: req.body.item,
        done: false,
    }

    req.session.items.push(newItem);
    // MUST use a callback here or the redirect will cause a race condition
    req.session.save((err) => {
        res.redirect(303, "/todo");
    });
}

function moveItemsToSession(req) {
    for (let i = 0; i < req.session.numItems; ++i) {
        let item = req.body[`item${i}`];
        if (item === "done"){
            req.session.items[i].done = true;
        } else {
            req.session.items[i].done = false;
        }
    }
}

function saveSession(req, res) {
    moveItemsToSession(req);
    req.session.save(() => {
        res.redirect(303, "/todo");
    });
}

function removeDone(req, res) {
    moveItemsToSession(req);

    // https://love2dev.com/blog/javascript-remove-from-array/ 
    // Showed me how to use the filter method of an array
    req.session.items = req.session.items.filter((value, index, arr) => {
        return !value.done;
    });

    req.session.save(() => {
        res.redirect(303, "/todo");
    })
}

module.exports = { 
    addItem,
    moveItemsToSession,
    saveSession,
    removeDone
};