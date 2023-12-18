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
exports.LessonsComponent = void 0;
const core_1 = require("@angular/core");
let LessonsComponent = exports.LessonsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-lessons',
            templateUrl: './lessons.component.html',
            styleUrls: ['./lessons.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LessonsComponent = _classThis = class {
        constructor(learningPackageService) {
            this.learningPackageService = learningPackageService;
            this.title = 'angular-website';
            this.learningPackages = [];
            this.userAnswer = '';
            this.showCorrectAnswer = false;
        }
        addNewLearningPackage(packageTitle) {
            const newPackage = { title: packageTitle }; // Créez l'objet package avec le titre
            this.learningPackageService.addLearningPackage(newPackage).subscribe(data => {
                console.log('Package added:', data);
                this.learningPackages.push(data); // Ajoutez le nouveau package à la liste
            }, error => console.error('Error adding package:', error));
        }
        getPackageWithRandomQuestion(id) {
            this.learningPackageService.getLearningPackageById(id).subscribe(packageData => {
                if (packageData && packageData.questions) {
                    const question = this.selectRandomQuestion(packageData.questions);
                    this.randomQuestion = question;
                    this.correctAnswer = packageData.questions[question];
                    this.showCorrectAnswer = false; // Cache la réponse correcte initialement
                }
                else {
                    this.randomQuestion = null;
                }
            });
        }
        validateAnswer() {
            this.showCorrectAnswer = true; // Affiche la réponse correcte
        }
        selectRandomQuestion(questions) {
            const questionKeys = Object.keys(questions);
            if (questionKeys.length === 0)
                return null;
            const randomKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
            return randomKey;
        }
        ngOnInit() {
            this.learningPackageService.getLearningPackages().subscribe(data => {
                console.log(data);
                this.learningPackages = data;
            });
        }
    };
    __setFunctionName(_classThis, "LessonsComponent");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        LessonsComponent = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LessonsComponent = _classThis;
})();
//# sourceMappingURL=lessons.component.js.map