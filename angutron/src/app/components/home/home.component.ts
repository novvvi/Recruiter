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
    this.submit = {keyword: "", location: ""};
  }

  OnSubmit() {
    let observable = this.data.getAllJobs(this.submit);
    console.log(observable);
    observable.subscribe(data => {
      this.allJobs = data['result'];
      console.log(this.allJobs);
      console.log(this.submit);
      this.submit = {keyword: "", location: ""};
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