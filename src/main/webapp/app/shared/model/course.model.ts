import { ILesson } from 'app/shared/model//lesson.model';
import { ITrack } from 'app/shared/model//track.model';

export interface ICourse {
  id?: number;
  title?: string;
  description?: any;
  userLogin?: string;
  userId?: number;
  lessons?: ILesson[];
  tracks?: ITrack[];
}

export const defaultValue: Readonly<ICourse> = {};
