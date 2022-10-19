/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EduService } from './edu.service';

describe('Service: Edu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EduService]
    });
  });

  it('should ...', inject([EduService], (service: EduService) => {
    expect(service).toBeTruthy();
  }));
});
