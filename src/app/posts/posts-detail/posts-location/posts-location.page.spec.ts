import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostLocationPage } from './posts-location.page';

describe('PostLocationPage', () => {
  let component: PostLocationPage;
  let fixture: ComponentFixture<PostLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
