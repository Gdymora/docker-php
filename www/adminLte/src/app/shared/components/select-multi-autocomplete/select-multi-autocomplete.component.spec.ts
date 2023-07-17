import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material.module';

import { SelectMultiAutocompleteComponent } from './select-multi-autocomplete.component';

describe('SelectMultiAutocompleteComponent', () => {
  let component: SelectMultiAutocompleteComponent;
  let fixture: ComponentFixture<SelectMultiAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMultiAutocompleteComponent ],
      imports: [
        RouterTestingModule,
        AppModule,
        MaterialModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultiAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
