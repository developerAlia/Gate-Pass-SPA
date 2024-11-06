import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationInterface } from '../models/notification/notification'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastrService: ToastrService) { }


  showTosatrAlert(data: NotificationInterface) {

    // switch (true) {
    //   case data.actionType.toLocaleLowerCase().includes('edit'):
    //     this.toastrService.warning('Description is Here', data.actionType, { closeButton: true });
    //     break;
    //   case data.actionType.toLocaleLowerCase().includes('new'):
    //     this.toastrService.success('Description is Here', data.actionType, { closeButton: true });
    //     break;
    //   case data.actionType.toLocaleLowerCase().includes('error'):
    //     this.toastrService.error('Description is Here', data.actionType, { closeButton: true });
    //     break;
    //   default:
    //     this.toastrService.info('Description is Here', data.actionType, { closeButton: true });
    //     break;
    // }
  }


}
