import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  user;

  constructor(
    private _httpService: DatabaseService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    
  }


  thisgenresume(user:any){
    this._httpService.genresume(user).subscribe(data => {
      console.log(data);
    })
  }

  thisgetAll(){
    this._httpService.getAll().subscribe(data => {
      console.log('got user!', data);
      this.user = data['data'][0];
      console.log(this.user);
      this.thisgenresume(this.user)
    })
  }

}
