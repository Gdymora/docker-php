import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDaterangepickerComponent } from './material-daterangepicker.component';

describe('MaterialDaterangepickerComponent', () => {
  let component: MaterialDaterangepickerComponent;
  let fixture: ComponentFixture<MaterialDaterangepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialDaterangepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDaterangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
