"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
const core_1 = require("@angular/core");
let HomeComponent = exports.HomeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HomeComponent = _classThis = class {
        constructor(learningPackageService) {
            this.learningPackageService = learningPackageService;
            this.learningPackages = [];
            this.showCorrectAnswer = false;
            this.showAnswerButton = true;
            this.showPreviousButton = false;
        }
        //get a random question from a package
        getPackageWithRandomQuestion(id) {
            this.learningPackageService.getLearningPackageById(id).subscribe(packageData => {
                if (packageData && packageData.questions) { // si il existe et a des questions
                    const selectedQuestion = this.selectRandomQuestion(packageData.questions); //on selectionne une q aleatoire
                    if (selectedQuestion) {
                        this.randomQuestion = selectedQuestion.question; //enonce
                        this.correctAnswer = selectedQuestion.answer; // reponse
                        this.showCorrectAnswer = false; //n affiche pas la reponse par defaut
                        this.selectedQuestionIndex = packageData.questions.indexOf(selectedQuestion); // get the index
                    }
                    else {
                        this.randomQuestion = null;
                    }
                }
                else {
                    this.randomQuestion = null;
                }
            });
            // reset les boutons
            this.showAnswerButton = true;
            this.showPreviousButton = false;
        }
        //select random question using the user knowledge
        selectRandomQuestion(questions) {
            const weightedQuestions = questions.map(question => {
                switch (question.userKnowledgeLevel) {
                    case 'low':
                        return Array(3).fill(question); // 3x more chances
                    case 'medium':
                        return Array(2).fill(question); // 2x more chances
                    case 'high':
                        return Array(1).fill(question);
                }
            }).reduce((acc, val) => acc.concat(val), []); // get all in one table
            console.log(weightedQuestions);
            if (weightedQuestions.length === 0)
                return null;
            const randomIndex = Math.floor(Math.random() * weightedQuestions.length); // get randomly from the table
            return weightedQuestions[randomIndex]; // return the question
        }
        validateAnswer() {
            this.showCorrectAnswer = true; // show the answer
            this.showAnswerButton = false;
            this.showPreviousButton = false;
        }
        //update the user knowledge of the question
        updateUserKnowledgeLevel(questionIndex, knowledgeLevel) {
            this.learningPackageService.updateQuestionKnowledgeLevel(this.selectedPackageId, questionIndex, knowledgeLevel).subscribe(response => {
                console.log('Knowledge level updated:', response);
                //save question to go back to previous
                this.previousRandomQuestion = this.randomQuestion;
                this.previousSelectedPackageId = this.selectedPackageId;
                this.previousCorrectAnswer = this.correctAnswer;
                this.previousSelectedQuestionIndex = this.selectedQuestionIndex;
                this.getPackageWithRandomQuestion(this.selectedPackageId);
                this.showPreviousButton = true;
            }, error => {
                console.error('Error updating knowledge level:', error);
            });
        }
        previousQuestion() {
            this.randomQuestion = this.previousRandomQuestion;
            this.selectedPackageId = this.previousSelectedPackageId;
            this.correctAnswer = this.previousCorrectAnswer;
            this.selectedQuestionIndex = this.previousSelectedQuestionIndex;
            this.showCorrectAnswer = true;
            // reset buttons
            this.showAnswerButton = false;
            this.showPreviousButton = false;
        }
        ngOnInit() {
            this.learningPackageService.getLearningPackages().subscribe(data => {
                console.log(data);
                this.learningPackages = data;
            });
        }
    };
    __setFunctionName(_classThis, "HomeComponent");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        HomeComponent = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomeComponent = _classThis;
})();
//# sourceMappingURL=home.component.js.map