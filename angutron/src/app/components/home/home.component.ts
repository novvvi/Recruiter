import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { DatabaseService } from '../../database.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allJobs: any;
  selectedJob;
  jobInfo;
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
    let observable = this.data.getJobInfo(id["jk"]);
    console.log(id["jk"]);
    observable.subscribe(data => {
      let jobInfo = data;
      console.log(jobInfo);
      id["detailinfo"] = jobInfo
      this.selectedJob = id;
    })
  }

  // jobInfoToShow(id){
  //   this.jobToShow(id);
  //   let observable = this.data.getJobInfo(this.jobInfo);
  //   observable.subscribe(data => {
  //     this.jobInfo = data['result'];
  //   })
  // }

}