import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsMapPageComponent } from './gps-map-page.component';

describe('GpsMapPageComponent', () => {
  let component: GpsMapPageComponent;
  let fixture: ComponentFixture<GpsMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GpsMapPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GpsMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
