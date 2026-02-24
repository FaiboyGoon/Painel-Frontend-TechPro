import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosFormComponent } from './cadastros-form.component';

describe('CadastrosFormComponent', () => {
  let component: CadastrosFormComponent;
  let fixture: ComponentFixture<CadastrosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
