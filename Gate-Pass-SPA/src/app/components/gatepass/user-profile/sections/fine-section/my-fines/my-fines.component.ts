import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MyFines } from "src/app/shared/models/dashboard/myFines";

@Component({
  selector: "my-fines",
  templateUrl: "./my-fines.component.html",
  styleUrls: ["./my-fines.component.scss"],
})
export class MyFinesComponent implements OnInit {
  @Input() cardData: MyFines;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}
}
