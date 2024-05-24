import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormCreationComponent } from './user-form-creation.component';

describe('UserFormCreationComponent', () => {
  let component: UserFormCreationComponent;
  let fixture: ComponentFixture<UserFormCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFormCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
