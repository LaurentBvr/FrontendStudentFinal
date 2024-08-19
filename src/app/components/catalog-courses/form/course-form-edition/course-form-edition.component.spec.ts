import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormEditionComponent } from './course-form-edition.component';

describe('CourseFormEditionComponent', () => {
  let component: CourseFormEditionComponent;
  let fixture: ComponentFixture<CourseFormEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFormEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseFormEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
