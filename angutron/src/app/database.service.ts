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

}