import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() scrollStatus = false;
  public pizza = false;

  public burger = false;
  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationStart){
        if(e.url === '/' || e.url === '/#pizza'){
          this.pizza = true;
        } else{
          this.pizza = false;
        }
        this.burger = false;
      }
    })
   }

  ngOnInit(): void {
  }

  togleBurger(): void{
    this.burger = !this.burger;
  }
}
