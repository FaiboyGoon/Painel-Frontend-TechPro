import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosListComponent } from './cambios-list.component';

describe('CambiosListComponent', () => {
  let component: CambiosListComponent;
  let fixture: ComponentFixture<CambiosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
