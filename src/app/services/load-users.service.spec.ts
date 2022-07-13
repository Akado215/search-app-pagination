import { TestBed } from '@angular/core/testing';

import { LoadUsersService } from './load-users.service';

describe('LoadUsersService', () => {
  let service: LoadUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
