import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser, User } from 'src/app/shared';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store) {
    this.user$ = this.store.select(getUser);
  }

  ngOnInit(): void {}
}
