import { TestBed } from '@angular/core/testing';

import { SentimentHistoryService } from './sentiment-history.service';

describe('SentimentHistoryService', () => {
  let service: SentimentHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
