import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenDateComponent } from './between-date.component';

describe('BetweenDateComponent', () => {
  let component: BetweenDateComponent;
  let fixture: ComponentFixture<BetweenDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetweenDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
