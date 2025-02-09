import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisasModalComponent } from './divisas-modal.component';

describe('DivisasModalComponent', () => {
  let component: DivisasModalComponent;
  let fixture: ComponentFixture<DivisasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivisasModalComponent]
    });
    fixture = TestBed.createComponent(DivisasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
