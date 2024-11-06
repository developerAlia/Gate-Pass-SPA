import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddColorModalComponent } from '../add-color-modal/add-color-modal.component';

@Component({
  selector: 'app-colors-lists',
  templateUrl: './colors-lists.component.html',
  styleUrls: ['./colors-lists.component.scss']
})
export class ColorsListsComponent implements OnInit {
  addNewColor: NgbModalRef;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  newColorModal(){
    this.addNewColor = this.modalService.open(AddColorModalComponent, {
      centered: true,
      backdrop: true,
      size: "xl",
    });
   }
}
