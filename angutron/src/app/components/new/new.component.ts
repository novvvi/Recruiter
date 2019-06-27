import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {


  constructor(
    private _httpService: DatabaseService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    
  }


}
