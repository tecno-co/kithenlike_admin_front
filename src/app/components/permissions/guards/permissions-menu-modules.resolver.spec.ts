import { TestBed } from '@angular/core/testing';

import { PermissionsMenuModulesResolver } from './permissions-menu-modules.resolver';

describe('PermissionsMenuModulesResolver', () => {
  let resolver: PermissionsMenuModulesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PermissionsMenuModulesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
