import { TestBed } from '@angular/core/testing';

import { MessagesServicesService } from './messages.service';

describe('MessagesServicesService', () => {
  let service: MessagesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
