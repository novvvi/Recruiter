import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, startWith } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private _http: HttpClient) {}
  newJobs;
  oldJobs;
  latestJobs;

  getAllJobs(submit) {
    // return this._http.post('/api/indeed', submit);
    return interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this._http.post('/api/indeed', submit)),
        map(res => res)
      )
  }

  getJobInfo(id) {
    return this._http.post('/api/indeed/info', {jk: id});
  }

  getAll(){
    return this._http.get('/user')
  }

  getUser(id){
    return this._http.get(`/user/${id}`)
  }

  create(user:any){
    return this._http.post('/create', user)
  }

  update(id, body){
    return this._http.put(`/user/edit/${id}`, body)
  }

  destroyUser(id){
    return this._http.delete(`/destroy/user/${id}`)
  }

  jobComparison(){
    var newList = [];
    if (this.oldJobs == null) {
      this.oldJobs = this.newJobs;
    } else {
      for (var i = 0; i < this.oldJobs.length; i++){
        for (var j = 0; j < this.newJobs.length; j++){
          console.log("$$$$$$$$$$$$$$$$$")
          console.log("oldJobs: " + this.oldJobs[i]['jk']);
          console.log("newJobs: " + this.newJobs[j]['jk']);
          if (this.newJobs[j]['jk'] != this.oldJobs[i]['jk']) {
            newList.push(this.newJobs[j]);
          }
        }
      }
    }
    this.latestJobs = newList
    console.log(this.latestJobs);
  }

  // here is what you need to use for parsing indeed



}




// ************************* browser js test script  *****************************//


// var selectedClasses = ["title", "sjcl", "summary", "iaWrapper", "jobsearch-SerpJobCard-footer"]
// var jobList = []
// var jobsList_RAW = document.getElementsByClassName('jobsearch-SerpJobCard');
// for (let i = 0; i < jobsList_RAW.length; i++){
//   let jobJSON = {
//   }
//   jobJSON["jk"] = jobsList_RAW[i].dataset.jk;
//   let jobClassList = jobsList_RAW[i].childNodes;
//   for (let n = 0; n < jobClassList.length; n++){
//     if (jobClassList[n].nodeName != "#text"){
//       let thisClass = jobClassList[n];
//       if (selectedClasses.indexOf(thisClass.className) != -1 ) {
//         let innerText = thisClass.innerText;
//         jobJSON[thisClass.className] = innerText;
//       }
//     }
//   }
//   jobList.push(jobJSON);
// }


// console.log(jobList)
