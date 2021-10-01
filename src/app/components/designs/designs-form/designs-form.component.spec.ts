import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignsFormComponent } from './designs-form.component';

describe('DesignsFormComponent', () => {
  let component: DesignsFormComponent;
  let fixture: ComponentFixture<DesignsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
