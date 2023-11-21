"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let idGenerator = 1;
function newId() {
    return idGenerator++;
}
let learningPackages = [
    { id: newId(), title: 'Learn TypeScript' },
    { id: newId(), title: 'Learn Angular' },
    { id: newId(), title: 'Learn NodeJs' },
    { id: newId(), title: 'Learn Express' },
];
// Route for "/api/liveness"
app.get('/api/liveness', (req, res) => {
    res.status(200).send('OK');
});
// Route for "/api/package" to query LearningPackages
app.get('/api/learning-package', (req, res) => {
    // Return the hard-coded array as JSON
    res.json(learningPackages);
});
// Route for "/api/package/:id" to query a specific LearningPackage by ID
app.get('/api/learning-package/:id', (req, res) => {
    const id = parseInt(req.params.id); //extrait l'id de l'url
    const packageFound = learningPackages.find((pkg) => pkg.id === id); //cherche un package avec l'id correspondant
    if (packageFound) {
        res.status(200).json(packageFound);
    }
    else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});
app.post('/api/learning-package', (req, res) => {
    let item = req.body;
    console.log('handle http POST /api/learning-package', item);
    item.id = newId();
    learningPackages.push(item);
    res.send(item);
});
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map