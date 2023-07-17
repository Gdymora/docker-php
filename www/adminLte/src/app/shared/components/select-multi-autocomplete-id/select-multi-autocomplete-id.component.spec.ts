import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material.module';

import { SelectMultiAutocompleteIdComponent } from './select-multi-autocomplete-id.component';

describe(' SelectMultiAutocompleteIdComponent', () => {
  let component:  SelectMultiAutocompleteIdComponent;
  let fixture: ComponentFixture< SelectMultiAutocompleteIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  SelectMultiAutocompleteIdComponent ],
      imports: [
        RouterTestingModule,
        AppModule,
        MaterialModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( SelectMultiAutocompleteIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
