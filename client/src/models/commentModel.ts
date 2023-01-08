export interface CommentModel {
  user: {
    _id: string;
    name: string;
  };
  review: {
    _id: string;
    name: string;
  };
  text: string;
  _id: string;
}
