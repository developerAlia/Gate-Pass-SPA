import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationInterface } from '../models/notification/notification'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // baseUrl = environment.apiUrl + 'Research/';
  // notificationSubject: BehaviorSubject<NotificationInterface[]> = new BehaviorSubject(null);
  // constructor(private http: HttpClient, private router: Router) {
  //   this.setNotification();
  //  }

  // setNotification(){
  //   this.getNotification().subscribe(((data:NotificationInterface[])=>{
  //     this.notificationSubject.next(data);
  //   }));
  // }

  // getNotification() {
  //   return this.http.get<NotificationInterface[]>(this.baseUrl + 'notifications');
  // }

  // go2ResearcherDetails(researcherId:number, zNotiFieldsNameId: any, notificatId: number){
  //   this.http.put(this.baseUrl + 'notifications/'  , [{notificatId: notificatId}]).subscribe(()=>{
  //     this.setNotification();
  //     this.router.navigateByUrl('/researcher/researcher-detail/' + researcherId, {state: zNotiFieldsNameId});
  //   });
  // }
  // clearAllNotification(notificationToClear:NotificationInterface[]){
  //   this.http.put(this.baseUrl + 'notifications/', notificationToClear).subscribe(()=> this.setNotification());
  // }

}
