import { TestBed } from '@angular/core/testing';

import { AcademyProgramService } from './academy-program.service';

describe('AcademyProgramService', () => {
  let service: AcademyProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademyProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
