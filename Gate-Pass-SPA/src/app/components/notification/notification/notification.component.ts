import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationInterface } from 'src/app/shared/models/notification/notification';
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit,OnDestroy {

  // notificationData: NotificationInterface[] = [];
  // subscription: Subscription;

  // constructor(private notificationService: NotificationService, private router:Router) { }

  ngOnInit(): void {
    // this.subscription = this.notificationService.notificationSubject.subscribe((data)=>{
    //   this.notificationData =data;
    // });
  }

  // getNotification(){
  //   this.notificationService.setNotification();
  // }

  // go2ResearcherDetails(researcherId:number, zNotiFieldsNameId: any, notificatId: number){
  //   this.notificationService.go2ResearcherDetails(researcherId, zNotiFieldsNameId, notificatId);
  // }

  // clearNotification(){
  //   this.notificationService.clearAllNotification(this.notificationData);
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.subscription.unsubscribe();
  }

}
