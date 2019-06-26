import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { DatabaseService } from '../../database.service';


@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 jobInfo: any;

 constructor(private electron: ElectronService, private data: DatabaseService) { }

 ngOnInit() {
  //  this.keyword()
 }

 closeWindow() {
   this.electron.window.close();
 }

 minimizeWindow() {
   this.electron.window.minimize();
 }

//  keyword() {
//    let observable = this.data.getAllJobs();
//    observable.subscribe(data => {
//      console.log(data);
//      this.jobInfo = data;
//    })
//  }
}