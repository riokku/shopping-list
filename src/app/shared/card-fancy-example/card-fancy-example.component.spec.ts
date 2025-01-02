import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFancyExample } from './card-fancy-example.component';

describe('CardFancyExample', () => {
  let component: CardFancyExample;
  let fixture: ComponentFixture<CardFancyExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFancyExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFancyExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
