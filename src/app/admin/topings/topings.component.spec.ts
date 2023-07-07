import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopingsComponent } from './topings.component';

describe('TopingsComponent', () => {
  let component: TopingsComponent;
  let fixture: ComponentFixture<TopingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
