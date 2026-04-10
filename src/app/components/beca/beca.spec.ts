import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecaComponent } from './beca.components';

describe('Beca', () => {
  let component: BecaComponent;
  let fixture: ComponentFixture<BecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BecaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
