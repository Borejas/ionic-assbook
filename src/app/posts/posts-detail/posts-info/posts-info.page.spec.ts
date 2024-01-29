import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsInfoPage } from './posts-info.page';

describe('PostsInfoPage', () => {
  let component: PostsInfoPage;
  let fixture: ComponentFixture<PostsInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
