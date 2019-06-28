import { Component, OnInit, Input } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.scss']
})
export class HomeInfoComponent implements OnInit {
  @Input() jobToShow: any;
  jobInfo;
  jk;
  constructor(private electron: ElectronService, private data: DatabaseService) { }

  ngOnInit() {
  }

  update() {
    this.jk = this.jobToShow['jk'];
    this.jobInfoToShow();
  }

  jobInfoToShow() {
    let observable = this.data.getJobInfo(this.jk);
    console.log(this.jk);
    observable.subscribe(data => {
      this.jobInfo = data;
      console.log(this.jobInfo);
    })
  }

  onNav(jk){
    window.open(`https://indeed.com/viewjob?jk=${jk}`, '_blank')
  }
}
