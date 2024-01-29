import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsFormPage } from './posts-form.page';

describe('PostsFormPage', () => {
  let component: PostsFormPage;
  let fixture: ComponentFixture<PostsFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
