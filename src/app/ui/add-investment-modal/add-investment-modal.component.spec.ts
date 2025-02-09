import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestmentModalComponent } from './add-investment-modal.component';

describe('AddInvestmentModalComponent', () => {
  let component: AddInvestmentModalComponent;
  let fixture: ComponentFixture<AddInvestmentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInvestmentModalComponent]
    });
    fixture = TestBed.createComponent(AddInvestmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
