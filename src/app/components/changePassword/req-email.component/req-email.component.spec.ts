import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqEmailComponent } from './req-email.component';

describe('ReqEmailComponent', () => {
  let component: ReqEmailComponent;
  let fixture: ComponentFixture<ReqEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReqEmailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
