import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionGeneralPage } from './informacion-general.page';

describe('InformacionGeneralPage', () => {
  let component: InformacionGeneralPage;
  let fixture: ComponentFixture<InformacionGeneralPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformacionGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
