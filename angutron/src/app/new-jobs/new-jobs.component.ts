import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-new-jobs',
  templateUrl: './new-jobs.component.html',
  styleUrls: ['./new-jobs.component.scss']
})
export class NewJobsComponent implements OnInit {
  newJobsfromService;
  constructor(private electron: ElectronService, private data: DatabaseService) { }


  ngOnInit() {
    this.newJobsfromService = this.data.latestJobs;
  }

}
