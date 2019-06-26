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
    this.user.experience.push(this.experience)
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
    var add = "<div class='border rounded shadow experiance-info'><div style='height: 35px;width: 910px;margin-top: 10px; margin-left: 50px;'><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187);margin-right: 55px;'>Type</label><select [(ngModel)]='experience.type' class='form-control d-inline-block float-left' style='height: 35px;width: 212px;'><optgroup label='Pick Type'><option name='experience.type' value='company' selected=''>Company</option><option name='experience.type' value='school'>School</option></optgroup></select><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187); margin-left: 29px;width: 101px;'>Name</label><input [(ngModel)]='experience.name' name='experience.name' class='form-control d-inline-block float-left' type='text' style='height: 35px;width: 461px;'></div><div class='d-inline-block float-left' style='height: 44px;width: 910px;margin-top: 10px;margin-left: 50px;'><label style='color: rgb(175,178,187); margin-right: 60px;' class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel'>Title</label><input [(ngModel)]='experience.title' name='experience.title' class='form-control d-inline-block float-left' type='text' style='height: 35px;width: 296px;'><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187); margin-left: 22px;width: 60px;'>Start</label><input [(ngModel)]='experience.start' name='experience.start' class='form-control d-inline-block float-left' type='date' style='width: 168px;'><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='color: rgb(175,178,187); margin-left: 22px;width: 68px;'>End</label><input [(ngModel)]='experience.end' name='experience.end' class='form-control d-inline-block float-left' type='date' style='width: 168px;'></div><div class='d-inline-block float-left' style='height: 35px;width: 910px;margin-top: 10px;margin-left: 50px;'><label style='color: rgb(175,178,187); margin-right: 20px;' class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel'>Specialty</label><input [(ngModel)]='experience.specialty' name='experience.specialty' class='form-control' type='text' style='height: 35px;width: 750px;'></div><label class='d-inline-block float-left d-xl-flex align-items-xl-center infolabel' style='display: block; color: rgb(175,178,187); margin-left: 50px;'>Detail</label><textarea [(ngModel)]='experience.details' name='experience.details' class='form-control' style='margin-right: 28px;width: 910px;margin-left: 50px;height: 155px;'></textarea></div>"
    document.getElementById('skill').innerHTML += add;
  }



}
