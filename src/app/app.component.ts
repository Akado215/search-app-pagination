import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadUsersService } from './services/load-users.service';
import { ConstValues } from '../environments/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public users;
  public storedUsers;
  public totalUsersAmount: number = 0;
  public page;
  private _currentPage: number = 1;
  private _currentSearchValue: string = '';
  public isLoaded: boolean = true;
  public minSearchValue = ConstValues.MIN_SEARCH_CHARS;
  public itemsPerPage = ConstValues.ITEM_PER_PAGE;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private loadUserService: LoadUsersService
  ) { }

  ngOnInit() {
    this._loadUsers(
      this._currentPage,
      this._currentSearchValue
    );

    this.goToPage(this.page);
  }

  public filterList(searchParam: string): void {
    this._currentSearchValue = searchParam;
    if (this.storedUsers && this.users) {
      if ((this._currentSearchValue.split('').length < this.minSearchValue && this.storedUsers.length !== this.users.length) ||
        (this._currentSearchValue.split('').length >= this.minSearchValue)) {
        this._currentPage = 1;
        this._loadUsers(
          this._currentPage,
          this._currentSearchValue
        );
      }
    }
  }

  public goToPage(page: number): void {
    this._currentPage = page;
    this._loadUsers(
      this._currentPage,
      this._currentSearchValue
    );
    this.storedUsers = this.users;
  }

  private _loadUsers(
    page: number = 1, searchParam: string = ''
  ) {
    this.isLoaded = true;
    this.loadUserService.getUsers(page, searchParam).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response) {
        this.page = page;
        this.totalUsersAmount = response.count;
        this.users = response.results;
        this.isLoaded = false;

        if (!this.storedUsers || !this.storedUsers.length) {
          this.storedUsers = response.results;
        }
      } else {
        console.log("Error getting list of users");
      }
    }, (error) => console.error(error));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
