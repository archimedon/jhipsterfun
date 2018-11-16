import { IInstruction } from 'app/shared/model//instruction.model';
import { IQuestion } from 'app/shared/model//question.model';
import { ICourse } from 'app/shared/model//course.model';

export interface ILesson {
  id?: number;
  title?: string;
  description?: any;
  minNumQuestions?: number;
  authorLogin?: string;
  authorId?: number;
  instructions?: IInstruction[];
  questions?: IQuestion[];
  courses?: ICourse[];
}

export const defaultValue: Readonly<ILesson> = {};
