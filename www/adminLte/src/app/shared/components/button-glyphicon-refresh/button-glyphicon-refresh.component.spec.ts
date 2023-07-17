import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGlyphiconRefreshComponent } from './button-glyphicon-refresh.component';

describe('ButtonGlyphiconRefreshComponent', () => {
  let component: ButtonGlyphiconRefreshComponent;
  let fixture: ComponentFixture<ButtonGlyphiconRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonGlyphiconRefreshComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGlyphiconRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
