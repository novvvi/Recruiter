import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { DatabaseService } from '../../database.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobpostsdisplaytest;
  allJobs: any;
  selectedJob;
  submit;
  constructor(private electron: ElectronService, private data: DatabaseService) { }

  ngOnInit() {
    
  }

  OnSubmit() {
    let observable = this.data.getAllJobs(this.submit);
    console.log(observable);
    observable.subscribe(data => {
      this.allJobs = data['result'];
    })

  }

  jobToShow(id){
    this.selectedJob = id;
  }

  // allJobs() {
  //   let observable = this.data.getAllJobs();
  //   observable.subscribe(data => {
  //     console.log(data);
  //     this.jobInfo = data;
  //   })
  // }

}