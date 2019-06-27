import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  newUser;
  errors = [];
  experience;
  constructor(
    private _httpService: DatabaseService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newUser = {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      experience: []
    }
    this.experience = {
      type: '',
      name: '',
      title: '',
      specialty: '',
      details: '',
      start: '',
      end: ''
    }
  }

  onSubmit() {
    this.newUser.experience.push(this.experience)
    this.errors = [];
    let observable = this._httpService.create(this.newUser);
    observable.subscribe(data => {
      if (data['message'] === "Success") {
        console.log("created author", data);
        console.log(data['data']['_id'])
        
        // this._httpService.createExp(data['data']['_id'], this.experience).subscribe(data => {
        //   if (data['message'] === "Success") {
        //     console.log("created author", data);
        //   } else {
        //     console.log(data)
        //   }
        // })
        this._router.navigate(['/']);
      } else {
        console.log(data)
        console.log(data['error']['errors'])
        this.errors.push(data['error']['errors']['fullName']['message'])
        this.errors.push(data['error']['errors']['email']['message'])
        this.errors.push(data['error']['errors']['phoneNumber']['message'])
        this.errors.push(data['error']['errors']['experience.0.details']['message'])
        this.errors.push(data['error']['errors']['experience.0.specialty']['message'])
      }
    })
  }

  addSkill() {
    this.newUser.experience.push(this.experience)
  
    this.experience = {
      type: '',
      name: '',
      title: '',
      specialty: '',
      details: '',
      start: '',
      end: ''
    }
  }
}
