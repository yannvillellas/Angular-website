import * as express from 'express';
import { Request, Response} from 'express';

const app = express();
const port = 3000;
app.use(express.json());

interface Question {
    question?: string,
    answer?: string,
    userKnowledgeLevel: 'low' | 'medium' | 'high';
}

interface LearningPackage {
    id?: number;
    title: string;
    description?: string;
    category?: string;
    targetAudience?: string;
    questions?: Question[];
}

let idGenerator = 1;

let test = 4;
function newId() {
    return idGenerator++;
}

//create default learning packages
let learningPackages: LearningPackage[] = [
    {
        id: newId(),
        title: 'Learn TypeScript',
        description: 'A comprehensive guide to learning TypeScript',
        category: 'Programming',
        targetAudience: 'Developers',
        questions: [
            {
                question: 'What is TypeScript?',
                answer: 'A programming language that is a superset of JavaScript',
                userKnowledgeLevel: 'medium'
            },
            {
                question: 'What is the command to compile a TypeScript file?',
                answer: 'tsc',
                userKnowledgeLevel: 'low'
            }
        ]
    },
    {
        id: newId(),
        title: 'Learn Angular',
        description: 'Learn the basics and advanced concepts of Angular',
        category: 'Web Development',
        targetAudience: 'Frontend Developers',
        questions: [
            {
                question: 'What is Angular?',
                answer: 'A platform and framework for building single-page client applications using HTML and TypeScript',
                userKnowledgeLevel: 'high',
            },
            {
                question: 'What command creates a new Angular component?',
                answer: 'ng generate component',
                userKnowledgeLevel: 'medium',
            }
        ]
    }
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


//delete a learning package
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

// modify User Knowledge level of a question
app.put('/api/learning-package/:packageId/question/:questionIndex', (req, res) => {
    const packageId = parseInt(req.params.packageId);
    const questionIndex = parseInt(req.params.questionIndex);
    const newKnowledgeLevel = req.body.userKnowledgeLevel;

    console.log(packageId);
    console.log(questionIndex);
    console.log(newKnowledgeLevel);

    const packageFound = learningPackages.find(pkg => pkg.id === packageId);
    if (!packageFound) {
        return res.status(404).send(`Learning package not found for id: ${packageId}`);
    }

    if (questionIndex >= 0 && questionIndex < packageFound.questions.length) {
        console.log(packageFound.questions[questionIndex].userKnowledgeLevel)
        packageFound.questions[questionIndex].userKnowledgeLevel = newKnowledgeLevel;
        console.log(packageFound.questions[questionIndex].userKnowledgeLevel)
        res.status(200).send(`Updated question at index ${questionIndex} in package ${packageId} to knowledge level ${newKnowledgeLevel}`);
    } else {
        res.status(404).send(`Question not found at index ${questionIndex} in package ${packageId}`);
    }
});

//update the list of question or the package title
app.put('/api/learning-package/:packageId', (req, res) => {
    const packageId = parseInt(req.params.packageId);
    const updatedTitle = req.body.title;
    const updatedQuestions = req.body.questions;

    const packageIndex = learningPackages.findIndex(pkg => pkg.id === packageId);
    if (packageIndex === -1) {
        return res.status(404).send(`Learning package not found for id: ${packageId}`);
    }

    // met a jour le titre si fourni dans le body
    if (updatedTitle) {
        learningPackages[packageIndex].title = updatedTitle;
    }

    // met a jour les questions si fournies dans le body
    if (updatedQuestions) {
        learningPackages[packageIndex].questions = updatedQuestions;
    }

    res.status(200).send(`Package ${packageId} updated successfully`);
});



// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
