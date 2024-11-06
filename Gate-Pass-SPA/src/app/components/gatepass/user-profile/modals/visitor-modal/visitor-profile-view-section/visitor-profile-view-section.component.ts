import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { User } from "src/app/shared/models/gatepass/request2Get";

@Component({
  selector: "visitor-profile-view-section",
  templateUrl: "./visitor-profile-view-section.component.html",
  styleUrls: ["./visitor-profile-view-section.component.scss"],
})
export class VisitorProfileViewSectionComponent implements OnInit {
  @Input() userData: User;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}
}
