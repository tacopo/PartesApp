import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPartesComponent } from './tabla-partes.component';

describe('TablaPartesComponent', () => {
  let component: TablaPartesComponent;
  let fixture: ComponentFixture<TablaPartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPartesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
