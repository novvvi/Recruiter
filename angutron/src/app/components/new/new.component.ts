import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  // user = {
  //   fn: '',
  //   ln: '',
  //   phone: '',
  //   email: '',
  //   address: '',
  //   skills: [],
  // }
  user = {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    experience: [],
  }
  experience = {
    type: '',
    name: '',
    title: '',
    specialty: '',
    details: '',
  }
  errors = [];

  constructor(
    private _httpService: DatabaseService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(author:any){
    this.errors = [];
    let observable = this._httpService.create(this.user);
    observable.subscribe(data => {
      if(data['message'] === "Success"){
      console.log("created author", data);
      // this.user.fn = '';
      // this.user.ln = '';
      // this.user.phone = '';
      // this.user.email = '';
      // this.user.address = '';
      // this.user.skills = [];
      this._router.navigate(['/']);
    } else {
      this.errors.push(data['error']['errors']['name']['message'])
    }
    })
  }

  addSkill(){
    var add = "<label for='inputPassword' class='col-sm-2 col-form-label'>Skill:</label><div class='col-sm-10'><input type='text' class='form-control' placeholder='Skills' [(ngModel)]='user.skills' name='user.skills'><br>"
    document.getElementById('skill').innerHTML += add;
  }

}
