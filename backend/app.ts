import * as express from 'express';
import { Request, Response} from 'express';

const app = express();
const port = 3000;
app.use(express.json());

interface LearningPackage {
    id?: number;
    title: string;
    description?: string;
    category?: string;
    targetAudience?: string;
    difficultyLevel?: number;
    questions?: Record<string, string>;
}

let idGenerator = 1;

let test = 4;
function newId() {
    return idGenerator++;
}

let learningPackages : LearningPackage[] = [
    {
        id: newId(),
        title: 'Learn test12',
        description: 'A comprehensive guide to learning TypeScript',
        category: 'Programming',
        targetAudience: 'Developers',
        difficultyLevel: 3,
        questions: {
            'What is TypeScript?': 'A programming language',
            'What is the command to compile a TypeScript file?': 'tsc',
            // Plus de paires question-réponse...
        }
    },
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
    } else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});

app.post('/api/learning-package', (req: Request, res: Response) => {
    let item = <LearningPackage> req.body;
    console.log('handle http POST /api/learning-package', item);
    item.id = newId();
    learningPackages.push(item);
    res.send(item);
});


app.delete('/api/learning-package/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`Attempting to delete package with ID: ${id}`);

    const index = learningPackages.findIndex(pkg => pkg.id === id);
    console.log(`Found package at index: ${index}`);

    if (index !== -1) {
        learningPackages.splice(index, 1);
        res.status(200).send(`Learning package with id: ${id} has been deleted`);
        console.log('Package deleted')
    } else {
        res.status(404).send(`Learning package not found for id: ${id}`);
        console.log('Package not found')
    }
});


// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
