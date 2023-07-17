import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktyComponent } from './kontakty.component';

describe('KontaktyComponent', () => {
  let component: KontaktyComponent;
  let fixture: ComponentFixture<KontaktyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontaktyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontaktyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
