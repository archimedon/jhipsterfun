import { IAnswer } from 'app/shared/model//answer.model';
import { IFile } from 'app/shared/model//file.model';
import { ILesson } from 'app/shared/model//lesson.model';

export interface IQuestion {
  id?: number;
  ask?: string;
  minNumOptions?: number;
  answers?: IAnswer[];
  files?: IFile[];
  lessons?: ILesson[];
}

export const defaultValue: Readonly<IQuestion> = {};
