import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationWarningComponent } from './expiration-warning.component';

describe('ExpirationWarningComponent', () => {
  let component: ExpirationWarningComponent;
  let fixture: ComponentFixture<ExpirationWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirationWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirationWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
