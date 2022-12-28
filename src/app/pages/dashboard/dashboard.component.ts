import { Component, OnDestroy } from "@angular/core";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnDestroy {
  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: "Add Category",
    iconClass: "nb-lightbulb",
    type: "primary",
  };
  rollerShadesCard: CardSettings = {
    title: "Add Store",
    iconClass: "nb-roller-shades",
    type: "success",
  };
  wirelessAudioCard: CardSettings = {
    title: "Add Coupon",
    iconClass: "nb-audio",
    type: "info",
  };
  coffeeMakerCard: CardSettings = {
    title: "Add Blog",
    iconClass: "nb-coffee-maker",
    type: "warning",
  };

  statusCards = [
    {
      ...this.lightCard,
      type: "warning",
    },
    {
      ...this.rollerShadesCard,
      type: "primary",
    },
    {
      ...this.wirelessAudioCard,
      type: "danger",
    },
    {
      ...this.coffeeMakerCard,
      type: "info",
    },
  ];

  constructor() {}

  ngOnDestroy() {
    this.alive = false;
  }
}
