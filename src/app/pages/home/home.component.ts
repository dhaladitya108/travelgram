import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users = [];
  posts = [];

  isLoading: boolean = false;
  constructor(private db: AngularFireDatabase, private toastr: ToastrService) {
    this.isLoading = true;

    db.object('/users')
      .valueChanges()
      .subscribe((obj) => {
        if (obj) {
          this.users = Object.values(obj);
          this.isLoading = false;
        } else {
          toastr.error('no user found');
          this.users = [];
          this.isLoading = false;
        }
      });

    db.object('/posts')
      .valueChanges()
      .subscribe((obj) => {
        if(obj){
        this.posts = Object.values(obj);
        this.isLoading = false;} else {
          toastr.error("no post found");
          this.posts = [];
          this.isLoading = false;
        }
      });
  }

  ngOnInit(): void {}
}
