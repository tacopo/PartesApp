import { TestBed } from '@angular/core/testing';

import { ConexiónDBService } from './conexión-db.service';

describe('ConexiónDBService', () => {
  let service: ConexiónDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexiónDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
