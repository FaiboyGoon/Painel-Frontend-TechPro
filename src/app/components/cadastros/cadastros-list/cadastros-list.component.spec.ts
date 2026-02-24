import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosListComponent } from './cadastros-list.component';

describe('CadastrosListComponent', () => {
  let component: CadastrosListComponent;
  let fixture: ComponentFixture<CadastrosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
