import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private dataUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  constructor(private http: HttpClient) { }

  public getUsersList(){
    return this.http.get(this.dataUrl);
  }

}
