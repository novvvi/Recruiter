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
  experience;
  userId = "5d14ed8896c8491cda204863";
  constructor(
    private _httpService: DatabaseService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  ngOnInit() {
    // this.getAll(); comment this and getAll on bottom out if you have nothing in your db

    this.getUser(this.userId);
    this.experience = {
      type: '',
      name: '',
      title: '',
      specialty: '',
      details: '',
      start: '',
      end: ''
    }
        // this._route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    // })
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
    this.editUser.experience.push(this.experience)
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
  onSubmit(id:any, pet:any){
    this.errors = [];
    let observable = this._httpService.update(this.userId, this.editUser);
    observable.subscribe(data=> {
      if(data['message'] === "Success"){
        this._router.navigate(['/']);
      } else {
        this.errors.push(data['error']['errors']['name']['message'])
        this.errors.push(data['error']['errors']['type']['message'])
        this.errors.push(data['error']['errors']['description']['message'])
      }
    })
  }
  // getAll(){
  //   this._httpService.getAll().subscribe(data => {
  //     console.log('got user!', data);
  //     this.editUser = data['data'];
  //   })
  // }
  
}

