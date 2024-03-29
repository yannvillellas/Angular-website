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
exports.QuestionsComponent = void 0;
const core_1 = require("@angular/core");
let QuestionsComponent = exports.QuestionsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-questions',
            templateUrl: './questions.component.html',
            styleUrls: ['./questions.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var QuestionsComponent = _classThis = class {
        constructor(route, router, learningPackageService) {
            this.route = route;
            this.router = router;
            this.learningPackageService = learningPackageService;
            this.updateSuccess = false;
        }
        //update the list of questions/answers
        updateQuestions() {
            this.learningPackageService.updateLearningPackageQuestions(this.learningPackage.id, this.learningPackage.questions) //envoie au backend la nouvelle liste de questions
                .subscribe(response => {
                console.log('Questions updated:', response);
                this.updateSuccess = true;
            }, error => {
                console.error('Error updating questions:', error);
            });
        }
        // add a new question to the list
        addNewQuestion() {
            const newQuestion = {
                question: '',
                answer: '',
                userKnowledgeLevel: 'low' //new question had bad knowledge
            };
            this.learningPackage.questions.push(newQuestion);
        }
        // delete a question
        deleteQuestion(index) {
            this.learningPackage.questions.splice(index, 1);
        }
        ngOnInit() {
            // Subscribe to the route parameter changes
            this.route.params.subscribe(params => {
                this.packageId = +params['id']; // Convert id to a number
                // Check if the packageId exists in the learningPackages array
                if (!this.learningPackageService.packageExists(this.packageId)) {
                    // If the packageId does not exist redirect to a default page
                    this.router.navigate(['/not-found'], { skipLocationChange: true }); // Redirect to a not-found page
                }
                else {
                    // If the packageId exists, fetch the learning package
                    this.learningPackageService.getLearningPackageById(this.packageId).subscribe(data => {
                        console.log(data);
                        this.learningPackage = data; //init the learning package choose by the user
                    }, error => {
                        console.error('Error fetching package:', error);
                        // redirect to a default page
                        this.router.navigate(['/not-found'], { skipLocationChange: true });
                    });
                }
            });
        }
    };
    __setFunctionName(_classThis, "QuestionsComponent");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        QuestionsComponent = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QuestionsComponent = _classThis;
})();
//# sourceMappingURL=questions.component.js.map