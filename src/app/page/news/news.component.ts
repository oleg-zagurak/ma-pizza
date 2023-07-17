import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/shared/interfaces/news';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public news: INews[] = [];
  private api = environment.api.news;

  constructor(private db: DbDataService) { }

  ngOnInit(): void {
    this.db.getAll(this.api).subscribe((data) => {
      this.news = data as INews[];
    },
    (e) => {
      console.error(e)
    })
  }

}
