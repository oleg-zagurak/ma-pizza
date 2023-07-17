import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsInfoComponent } from './news-info.component';
import { newsResolver } from 'src/app/shared/resolvers/news/news.resolver';


const routes: Routes = [
  {
    path: '', component: NewsInfoComponent, resolve: {news: newsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsInfoRoutingModule { }