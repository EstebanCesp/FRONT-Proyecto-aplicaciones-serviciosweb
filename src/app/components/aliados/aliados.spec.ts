import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aliados } from './aliados';

describe('Aliados', () => {
  let component: Aliados;
  let fixture: ComponentFixture<Aliados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aliados],
    }).compileComponents();

    fixture = TestBed.createComponent(Aliados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
