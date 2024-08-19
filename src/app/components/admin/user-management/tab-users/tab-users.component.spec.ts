import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUsersComponent } from './tab-users.component';

describe('TabUsersComponent', () => {
  let component: TabUsersComponent;
  let fixture: ComponentFixture<TabUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
