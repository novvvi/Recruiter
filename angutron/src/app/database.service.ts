import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, startWith } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private _http: HttpClient){}

  // getAllJobs() {
  //   return interval(5000)
  //     .pipe(
  //       startWith(0),
  //       switchMap(() => this._http.get("http://api.openweathermap.org/data/2.5/weather?id=4887398&APPID=93447b78ed332dc0065cc3d3cb874fe6")),
  //       map(res => res)
  //     )
  // }

  getAll(){
    return this._http.get('/user')
  }

  create(user:any){
    return this._http.post('/create', user)
  }

  update(id:any, user:any){
    return this._http.put(`/user/edit/${id}`, user)
  }

  createExp(id:any,exp:any){
    return this._http.post(`create/exp/${id}`, exp)
  }

  // here is what you need to use for parsing indeed

  parsingOnePage(doc) {
    var selectedClasses = ["title", "sjcl", "summary", "iaWrapper", "jobsearch-SerpJobCard-footer"]
    var jobList = []
    var jobsList_RAW = doc.getElementsByClassName('jobsearch-SerpJobCard');
    for (let i = 0; i < jobsList_RAW.length; i++){
      let jobJSON = {
      }
      jobJSON["jk"] = jobsList_RAW[i].dataset.jk;
      let jobClassList = jobsList_RAW[i].childNodes;
      for (let n = 0; n < jobClassList.length; n++){
        if (jobClassList[n].nodeName != "#text"){
          let thisClass = jobClassList[n];
          if (selectedClasses.indexOf(thisClass.className) != -1 ) {
            let innerText = thisClass.innerText;
            jobJSON[thisClass.className] = innerText;
          }
        }
      }
      jobList.push(jobJSON);
    }
  }

  
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
