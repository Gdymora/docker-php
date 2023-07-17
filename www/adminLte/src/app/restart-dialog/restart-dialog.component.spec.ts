import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RestartDialogComponent } from './restart-dialog.component';

describe('RestartDialogComponent', () => {
  let component: RestartDialogComponent;
  let fixture: ComponentFixture<RestartDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
