import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import {
  Temperature,
  TemperatureHumidityData,
} from "../../../@core/data/temperature-humidity";
import { takeWhile } from "rxjs/operators";
import { forkJoin } from "rxjs";

@Component({
  selector: "ngx-temperature",
  styleUrls: ["./temperature.component.scss"],
  templateUrl: "./temperature.component.html",
})
export class TemperatureComponent implements OnDestroy {
  private alive = true;

  temperatureData: Temperature;
  categories: number;
  stores: number;
  coupons: number;
  blogs: number;
  categoryIcon = "list-outline";
  storeIcon = "home-outline";
  couponIcon = "gift-outline";
  blogIcon = "clipboard-outline";
  temperatureMode = "cool";

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = "heat";

  theme: any;
  themeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private temperatureHumidityService: TemperatureHumidityData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((config) => {
        this.theme = config.variables.temperature;
        // console.log("hahha");
        // console.log(this.theme)
      });

    this.categories = 77;
    this.stores = 875;
    this.coupons = 1760;
    this.blogs = 35;
    // forkJoin(
    //   this.temperatureHumidityService.getTemperatureData(),
    //   this.temperatureHumidityService.getHumidityData(),
    // )
    //   .subscribe(([temperatureData]: [Temperature, Temperature]) => {
    //     this.temperatureData = temperatureData;
    //     this.temperature = 99;
    //   });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
