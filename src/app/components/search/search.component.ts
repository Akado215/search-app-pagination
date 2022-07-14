import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() readonly placeholder: string = '';
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  private _searchSubject: Subject<string> = new Subject();

  constructor() {
    this._setSearchSubscription();
  }

  public updateSearch(searchTextValue: string) {
    this._searchSubject.next(searchTextValue);
  }

  private _setSearchSubscription() {
    this._searchSubject.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) => {
      this.setValue.emit(searchValue);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._searchSubject.unsubscribe();
  }
}
