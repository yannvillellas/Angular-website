export interface Question {
    question?: string;
    answer?: string;
    userKnowledgeLevel: 'low' | 'medium' | 'high';
}
