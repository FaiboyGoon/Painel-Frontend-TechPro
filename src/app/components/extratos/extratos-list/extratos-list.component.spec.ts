import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratosListComponent } from './extratos-list.component';

describe('ExtratosListComponent', () => {
  let component: ExtratosListComponent;
  let fixture: ComponentFixture<ExtratosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtratosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtratosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
