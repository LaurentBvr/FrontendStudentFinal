import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormCreationComponent } from './course-form-creation.component';

describe('CourseFormCreationComponent', () => {
  let component: CourseFormCreationComponent;
  let fixture: ComponentFixture<CourseFormCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFormCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseFormCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
