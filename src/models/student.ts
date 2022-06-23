export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: 'male' | 'female' | 'other';
  city: string;

  createAt?: number;
  updatedAt?: number;
}
