import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from 'src/app/shared/interfaces/news';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.scss']
})
export class NewsInfoComponent implements OnInit {
  public news!: INews;

  constructor(private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const subscription = this.ActivatedRoute.data.subscribe({
      next: ({ news }) => {
        this.news = news as INews;
      },
      error: e => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }

}
