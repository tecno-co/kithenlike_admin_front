import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesFormComponent } from './themes-form.component';

describe('ThemesFormComponent', () => {
  let component: ThemesFormComponent;
  let fixture: ComponentFixture<ThemesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
