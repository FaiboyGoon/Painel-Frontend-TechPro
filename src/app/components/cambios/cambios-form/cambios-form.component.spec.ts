import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosFormComponent } from './cambios-form.component';

describe('CambiosFormComponent', () => {
  let component: CambiosFormComponent;
  let fixture: ComponentFixture<CambiosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
