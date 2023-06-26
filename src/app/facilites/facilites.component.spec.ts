import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitesComponent } from './facilites.component';

describe('FacilitesComponent', () => {
  let component: FacilitesComponent;
  let fixture: ComponentFixture<FacilitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilitesComponent]
    });
    fixture = TestBed.createComponent(FacilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
