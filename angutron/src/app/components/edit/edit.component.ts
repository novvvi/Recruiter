import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user = {
    fullName: '',
    phone: '',
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
      this.user.fullName = '';
      this.user.phone = '';
      this.user.email = '';
      this.user.address = '';
      this.user.experience = [];
      this._router.navigate(['/']);
    } else {
      this.errors.push(data['error']['errors']['name']['message'])
    }
    })
  }

  addSkill(){
    var add = "<div class='border rounded shadow experiance-info'><div style='height: 35px;width: 910px;margin-top: 10px;margin-left: 20px;'><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187);'>Type</label><select class='form-control d-inline-block float-left' style='height: 35px;width: 212px;'><optgroup label='Pick Type'><option value='company' selected=''>Company</option><option value='school'>School</option></optgroup></select><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187); margin-left: 29px;width: 101px;'>Name</label><input class='form-control d-inline-block float-left' type='text' style='height: 35px;width: 461px;'></div><div class='d-inline-block float-left' style='height: 44px;width: 910px;margin-top: 10px;margin-left: 20px;'><label style='color: rgb(175,178,187);' class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel'>Title</label><input class='form-control d-inline-block float-left' type='text' style='height: 35px;width: 296px;'><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187); margin-left: 22px;width: 60px;'>Start</label><input class='form-control d-inline-block float-left' type='date' style='width: 168px;'><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187); margin-left: 22px;width: 68px;'>End</label><input class='form-control d-inline-block float-left' type='date' style='width: 168px;'></div><div class='d-inline-block float-left' style='height: 35px;width: 910px;margin-top: 10px;margin-left: 20px;'><label style='color: rgb(175,178,187);' class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel'>Specialty</label><input class='form-control' type='text' style='height: 35px;width: 804px;'></div><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='display: block; color: rgb(175,178,187); margin-left: 30px;'>Detail</label><textarea class='form-control' style='margin-right: 28px;width: 910px;margin-left: 19px;height: 155px;'></textarea></div>"
    document.getElementById('skill').innerHTML += add;
  }



}
