import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mapizza';
  private scroll = 0;
  public scrolled = false;
  @HostListener('window:scroll', ['$event'])
  scrollReact(event: Event): void{
    const document = event.target as Document;
    if(document instanceof Document){
      let current = document.documentElement.scrollTop;
      current > this.scroll ? this.scrolled = true : this.scrolled = false;
      this.scroll = current;
    }
  }
}
