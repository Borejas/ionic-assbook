import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsCommentsPage } from './posts-comments.page';

describe('PostsCommentsPage', () => {
  let component: PostsCommentsPage;
  let fixture: ComponentFixture<PostsCommentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostsCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
