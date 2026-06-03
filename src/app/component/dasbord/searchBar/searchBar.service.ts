import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchBarService {
  private querySubject = new BehaviorSubject<string>('');
  query$ = this.querySubject.asObservable();

  setQuery(q: string) {
    this.querySubject.next(q);
  }

  clearQuery() {
    this.querySubject.next('');
  }
}
