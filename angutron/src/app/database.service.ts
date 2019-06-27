import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, startWith } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private _http: HttpClient) {}


  getAllJobs(submit) {
    // return this._http.post('/api/indeed', submit);
    return interval(300000)
      .pipe(
        startWith(0),
        switchMap(() => this._http.post('/api/indeed', submit)),
        map(res => res)
      )
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
