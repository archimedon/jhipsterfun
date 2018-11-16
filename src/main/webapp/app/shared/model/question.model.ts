import { IAnswer } from 'app/shared/model//answer.model';
import { IFile } from 'app/shared/model//file.model';
import { ILesson } from 'app/shared/model//lesson.model';

export const enum AnswerType {
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  TEXT = 'TEXT'
}

export interface IQuestion {
  id?: number;
  ask?: string;
  answersAs?: AnswerType;
  minNumOptions?: number;
  answers?: IAnswer[];
  files?: IFile[];
  lessons?: ILesson[];
}

export const defaultValue: Readonly<IQuestion> = {};
