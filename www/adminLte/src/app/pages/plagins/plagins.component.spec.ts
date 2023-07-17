import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaginsComponent } from './plagins.component';

describe('PlaginsComponent', () => {
  let component: PlaginsComponent;
  let fixture: ComponentFixture<PlaginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaginsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
