import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionExpansionListComponent } from './accordion-expansion-list.component';

describe('AccordionExpansionListComponent', () => {
  let component: AccordionExpansionListComponent;
  let fixture: ComponentFixture<AccordionExpansionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionExpansionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionExpansionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
