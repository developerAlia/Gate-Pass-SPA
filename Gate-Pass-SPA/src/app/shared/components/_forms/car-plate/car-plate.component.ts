import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "car-plate",
  templateUrl: "./car-plate.component.html",
  styleUrls: ["./car-plate.component.scss"],
})
export class CarPlateComponent implements OnInit {
  @Input() plateNumber = "00000";
  @Input() plateCodeEn = "A A";
  @Input() plateCodeAr = "أ أ";
  @Input() plateColor = "#ffce34";
  @Input() plateTextColor = "#000000";

  constructor() {}

  ngOnInit(): void {}
}
