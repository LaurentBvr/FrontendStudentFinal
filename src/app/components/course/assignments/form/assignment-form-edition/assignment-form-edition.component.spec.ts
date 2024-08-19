import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentFormEditionComponent } from './assignment-form-edition.component';

describe('AssignmentFormEditionComponent', () => {
  let component: AssignmentFormEditionComponent;
  let fixture: ComponentFixture<AssignmentFormEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentFormEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentFormEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
