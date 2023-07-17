import { Component, OnInit } from '@angular/core';
import { IAction } from 'src/app/shared/interfaces/action';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';
import { Autoplay, SwiperOptions } from 'swiper';

import SwiperCore, { Navigation, Pagination, Scrollbar, Virtual, EffectFade } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Virtual, EffectFade, Autoplay]);

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit {
  public banners: IAction[] = [];
  private api = environment.api.actions;

  constructor(private db: DbDataService) { }

  ngOnInit(): void {
    this.getBanners();
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: { clickable: true },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    }
  };

  getBanners(): void{
    this.db.getActions(this.api, 'forCarousel').subscribe((data) => {
      this.banners = data as IAction[];
    },
    (e) => {
      console.error(e);
    })
  }

}
