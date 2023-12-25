"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const lessons_component_1 = require("./lessons.component");
describe('LessonsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [lessons_component_1.LessonsComponent]
        });
        fixture = testing_1.TestBed.createComponent(lessons_component_1.LessonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lessons.component.spec.js.map