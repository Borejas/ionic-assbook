import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsDetailPage } from './posts-detail.page';

describe('PostsDetailPage', () => {
  let component: PostsDetailPage;
  let fixture: ComponentFixture<PostsDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
