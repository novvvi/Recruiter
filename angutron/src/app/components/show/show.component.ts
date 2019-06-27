import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  editUser;
  errors;
  userId = "5d14ed8896c8491cda204863";
  constructor(
    private _httpService: DatabaseService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  ngOnInit() {
    // this._route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // })
    this.getUser(this.userId);
  }
  getUser(id) {
    let observable = this._httpService.getUser(id);
    observable.subscribe(data => {
      console.log("Got All Users", data)
      this.editUser = data['data']
      console.log(this.editUser.experience);
    })
  }
  updateUser(id, body){
    console.log(this.editUser)
    let observable = this._httpService.update(id, body);
    observable.subscribe(data => {
      console.log(this.editUser)
      if (data['message'] === "Success"){
        this._router.navigate(['/']);
      } else {
        console.log(data);
      }
    })
  }
  destroyUser(id) {
    let observable = this._httpService.destroyUser(id);
    observable.subscribe(data => {
      console.log(data);
    })
    this.getUser(this.userId);
  }
  
}
