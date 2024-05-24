import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCoursesComponent } from './catalog-courses.component';

describe('CatalogCoursesComponent', () => {
  let component: CatalogCoursesComponent;
  let fixture: ComponentFixture<CatalogCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
