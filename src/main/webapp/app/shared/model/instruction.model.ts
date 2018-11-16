import { IFile } from 'app/shared/model//file.model';
import { ILesson } from 'app/shared/model//lesson.model';

export const enum InputMimeWrap {
  NONE = 'NONE',
  BASE64 = 'BASE64',
  BINHEX = 'BINHEX',
  JSON = 'JSON',
  BASE64_DIRTREE = 'BASE64_DIRTREE'
}

export interface IInstruction {
  id?: number;
  title?: string;
  input?: any;
  inputMimeWrap?: InputMimeWrap;
  creatorLogin?: string;
  creatorId?: number;
  files?: IFile[];
  lessons?: ILesson[];
}

export const defaultValue: Readonly<IInstruction> = {};
