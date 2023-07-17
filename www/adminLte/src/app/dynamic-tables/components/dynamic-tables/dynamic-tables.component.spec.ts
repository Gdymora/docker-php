import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DictRegionsService } from 'src/app/api/dict-regions.service';
import { MockDictRegionsService } from 'src/app/api/serviceMock/dict-regions.service.mock';

import { DictRegionsComponent } from './dynamic-tables.component';

describe('DictRegionsComponent', () => {
  let component: DictRegionsComponent;
  let fixture: ComponentFixture<DictRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictRegionsComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: DictRegionsService,
          useClass: MockDictRegionsService
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
