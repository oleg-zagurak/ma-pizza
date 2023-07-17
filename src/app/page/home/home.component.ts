import { Component, OnInit } from '@angular/core';

import SwiperCore, { Navigation, Pagination, Scrollbar, Virtual, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Virtual]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public acardion: boolean[] = [false, false, false, false];

  constructor() { }

  ngOnInit(): void {
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: { clickable: true },
    autoHeight: true,
    loop: true
  };

  toggleAccordion(item:HTMLElement): void{
    let index = Number(item.dataset['index']);
    this.acardion[index] = !this.acardion[index];
    if(this.acardion[index]){
      item.style.height = item.scrollHeight + 'px';
    } else {
      item.style.height = 0 + 'px';
    }
  }

  toggleMore(item: HTMLElement): void{
    item.classList.toggle('open');
    if(item.classList.contains('open')){
      item.style.height = item.scrollHeight + 'px';
    } else {
      item.style.height = 0 + 'px';
    }
  }

}
