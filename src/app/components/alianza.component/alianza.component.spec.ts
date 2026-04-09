import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlianzaComponent } from './alianza.component';

describe('AlianzaComponent', () => {
  let component: AlianzaComponent;
  let fixture: ComponentFixture<AlianzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlianzaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlianzaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
