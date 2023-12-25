// learning-package.model.ts

import { Question } from './question.model';

export interface LearningPackage {
    id?: number;
    title: string;
    description?: string;
    category?: string;
    targetAudience?: string;
    questions?: Question[];
}
