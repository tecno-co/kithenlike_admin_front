import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBComponent } from './menu-b.component';

describe('MenuBComponent', () => {
  let component: MenuBComponent;
  let fixture: ComponentFixture<MenuBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
