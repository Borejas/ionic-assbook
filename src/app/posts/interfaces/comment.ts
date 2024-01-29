import { User } from '../../auth/interfaces/user';
import { Post } from './posts';


export interface CommentInsert {
    text: string;
}

export interface Comment extends CommentInsert {
    id: number;
    text: string;
    date: string;
    post?: Post;
    user: User;
}