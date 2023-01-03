export interface RateModel {
  user: {
    _id: string;
    name: string;
  };
  review: {
    _id: string;
    name: string;
  };
  rate: number;
  _id: string;
}
