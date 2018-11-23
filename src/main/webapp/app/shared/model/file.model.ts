import { IInstruction } from 'app/shared/model//instruction.model';
import { IAnswer } from 'app/shared/model//answer.model';
import { IQuestion } from 'app/shared/model//question.model';

export const enum Category {
  ANSWER = 'ANSWER',
  INSTRUCTION = 'INSTRUCTION',
  QUESTION = 'QUESTION'
}

export interface IFile {
  id?: number;
  name?: string;
  category?: Category;
  dataContentType?: string;
  data?: any;
  instructions?: IInstruction[];
  answers?: IAnswer[];
  questions?: IQuestion[];
}

export const defaultValue: Readonly<IFile> = {};
