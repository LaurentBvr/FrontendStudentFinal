import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentFormCreationComponent } from './assignment-form-creation.component';

describe('AssignmentFormCreationComponent', () => {
  let component: AssignmentFormCreationComponent;
  let fixture: ComponentFixture<AssignmentFormCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentFormCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentFormCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
