import { ICourse } from 'app/shared/model//course.model';

export interface ITrack {
  id?: number;
  title?: string;
  description?: any;
  courses?: ICourse[];
}

export const defaultValue: Readonly<ITrack> = {};
