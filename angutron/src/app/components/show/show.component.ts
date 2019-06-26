import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  allUsers;
  constructor(
    private _httpService: DatabaseService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers(){
    let observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log("Got All Users", data)
      console.log(data['data'])
      this.allUsers = data['data']
    })
  }

}
