
// Interface LearningPackage
interface LearningPackage {
    id: number;
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    difficultyLevel: number;
    questions: Record<string, string>;
}


const learningPackageExample: LearningPackage = {
    id: 1,
    title: 'Learn TypeScript',
    description: 'A comprehensive guide to learning TypeScript',
    category: 'Programming',
    targetAudience: 'Developers',
    difficultyLevel: 3,
    questions: {
        'What is TypeScript?': 'A programming language',
        'What is the command to compile a TypeScript file?': 'tsc',
        // Plus de paires question-réponse...
    }
};

