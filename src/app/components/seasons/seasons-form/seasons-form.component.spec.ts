import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsFormComponent } from './seasons-form.component';

describe('SeasonsFormComponent', () => {
  let component: SeasonsFormComponent;
  let fixture: ComponentFixture<SeasonsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
