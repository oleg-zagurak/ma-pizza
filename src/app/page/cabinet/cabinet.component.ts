import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

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
    if (container instanceof HTMLDivElement) {
      let item: HTMLAnchorElement = container.querySelector('.categories-list li.active a') as HTMLAnchorElement;
      container.classList.contains('active') ? container.classList.remove('active') : container.classList.add('active');
      this.title = item.textContent as string;
    }
  }
  menuInit(elem: HTMLDivElement): void {
    if (this.once) {
      setTimeout(() => {
        let item = elem.querySelector('.categories-list li.active a') as HTMLAnchorElement;
        this.title = item.textContent as string;
      }, 0)
    }
    this.once = false;
  }
}
