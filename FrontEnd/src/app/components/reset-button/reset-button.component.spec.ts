import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetButtonComponent } from './reset-button.component';

describe('ResetButtonComponent', () => {
  let component: ResetButtonComponent;
  let fixture: ComponentFixture<ResetButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('send_reset', () => {
  let component: ResetButtonComponent;
  let fixture: ComponentFixture<ResetButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetButtonComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the message', () => {
    var spy = spyOn(component.resetEvent, 'emit')
    component.send_reset()
    expect(spy).toHaveBeenCalled()
  });
});
