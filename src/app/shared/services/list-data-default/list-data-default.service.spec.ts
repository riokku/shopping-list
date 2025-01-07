import { TestBed } from '@angular/core/testing';

import { ListDataDefaultService } from './list-data-default.service';

describe('ListDataDefaultService', () => {
  let service: ListDataDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDataDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
