import { IFile } from 'app/shared/model//file.model';

export interface IAnswer {
  id?: number;
  posit?: any;
  correct?: boolean;
  usePositWithFile?: boolean;
  files?: IFile[];
  questionAsk?: string;
  questionId?: number;
}

export const defaultValue: Readonly<IAnswer> = {
  correct: false,
  usePositWithFile: false
};
