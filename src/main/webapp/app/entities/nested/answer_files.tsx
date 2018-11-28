import React from 'react'; // required to use JSX
import { IQuestion } from 'app/shared/model/question.model';
import { IFile } from 'app/shared/model/file.model';
import { render } from 'enzyme';
// import { IFileProps } from 'app/entities/file';

export class AnswerFiles {
  renderNestedAnswer(aQuestion: IQuestion) {
    if (aQuestion.answersAs) {
      // tslint:disable
      console.log('aQuestion.answersAs: ', aQuestion);

      const lineItem = (typeString: string) =>
        aQuestion.answers.map(answer => {
          const questionId = 'aQuestion_' + aQuestion.id;
          const answerId = questionId.concat('_answer_' + answer.id);
          return (
            <li>
              <input id={answerId} name={questionId + '_answer'} type={typeString} value={answer.posit} />
              <label htmlFor={answerId}>
                {answer.usePositWithFile ? <span>{answer.posit}</span> : null}
                (answers.files)}{' '}
                {answer.files ? (
                  // If the answer has files
                  answer.files.map(file => {
                    const itemStyle = {
                      width: '40%',
                      border: answer.correct ? '10px solid orange' : '10px solid inherit'
                    };
                    return (
                      <p>
                        <img style={itemStyle} src={'data:' + file.dataContentType + ';' + file.data} />
                      </p>
                    );
                  })
                ) : (
                  <span>{answer.posit}</span>
                ) // otherwise show text
                }
              </label>
            </li>
          );
        });
      return (
        <form action="#" onSubmit={void 0}>
          <ul>{lineItem(aQuestion.answersAs)}</ul>
        </form>
      );
    }
  }
}

function rollFiles<T extends IFile>(ary: T[], idPref = 'file', itemStyle = { color: 'inherit' }): any[] {
  return ary.map((file, index) => {
    const itemId = idPref.concat('-').concat(index.toString());
    // const fn = (d:any, cb: (t: string) => {}) => {};
    const rep =
      file.data && file.dataContentType ? (
        <DeFile style={itemStyle} itemId={itemId} file={file}>
          {file.name}
        </DeFile>
      ) : null;
    return rep;
  });
}
