import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  public once = true;
  public title = '';
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.menuInit(this.container.nativeElement)
  }
  menuSwitcher(container: HTMLDivElement): void {
    if (container instanceof HTMLDivElement && container.offsetWidth <= 1000) {
      let item: HTMLAnchorElement = container.querySelector('.categories-list li.active a') as HTMLAnchorElement;
      container.classList.contains('active') ? container.classList.remove('active') : container.classList.add('active');
      this.title = item.textContent as string;
    }
  }
  menuInit(elem: HTMLDivElement): void {
    if (this.once && elem.offsetWidth <= 1000) {
      setTimeout(() => {
        let item = elem.querySelector('.categories-list li.active a') as HTMLAnchorElement;
        this.title = item.textContent as string;
      }, 0)
    }
    this.once = false;
  }
}
