import { Component, OnInit } from '@angular/core';

import SwiperCore, { Navigation, Pagination, Scrollbar, Virtual, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Virtual]);

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: { clickable: true },
    autoHeight: true,
    loop: true
  };

  constructor() { }

  ngOnInit(): void {
  }

}
