import { TestBed } from '@angular/core/testing';

import { DesignsResolver } from './designs.resolver';

describe('DesignsResolver', () => {
  let resolver: DesignsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DesignsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
