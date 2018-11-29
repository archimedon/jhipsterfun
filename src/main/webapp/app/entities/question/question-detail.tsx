import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import TextType from '../nested/text_type';
import { IAnswer } from 'app/shared/model/answer.model';
import { IFile } from 'app/shared/model/file.model';
import DeFile from '../nested/de-file';
import MathJax from 'react-mathjax-preview';

export interface IQuestionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class QuestionDetail extends React.Component<IQuestionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { questionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Question [<b>{questionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="ask">Ask</span>
            </dt>
            <dd>
              <TextType textIn={questionEntity.ask} />
            </dd>
            <dt>
              <span id="answersAs">Answers As</span>
            </dt>
            <dd>{questionEntity.answersAs}</dd>
            <dt>
              <span id="minNumOptions">Min Num Options</span>
            </dt>
            <dd>{questionEntity.minNumOptions}</dd>
            <dt>File</dt>
            <dd>{rollFiles(questionEntity.files, 'qfile')}</dd>
            <dt>answers</dt>
            <dd>{listAnswers(questionEntity.answers)}</dd>
          </dl>
          <Button tag={Link} to="/entity/question" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/question/${questionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ question }: IRootState) => ({
  questionEntity: question.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDetail);

// const createAnswerView = ({
//   userName = 'Anonymous',
//   avatar = 'anon.png'
// } = {}) => ({
//   userName,
//   avatar
// });

const listAnswers = (answers: IAnswer[], edit = false) =>
  answers
    ? answers.map((answer, i) => (
        <span key={`answer_${answer.id}`}>
          <TextType textIn={answer.posit} />

          {i === answers.length - 1 ? '' : ', '}
        </span>
      ))
    : null;

const renderNestedAnswer = (aQuestion: IQuestion) => {
  // tslint:disable
  console.log('aQuestion.answersAs: ');
  if (aQuestion.answersAs) {
    const lineItem = (typeString: string) =>
      aQuestion.answers.map(answer => {
        const questionId = 'aQuestion_' + aQuestion.id;
        const answerId = questionId.concat('_answer_' + answer.id);
        return (
          <li>
            <input id={answerId} name={questionId + '_answer'} type={typeString} value={answer.posit} />
            <label htmlFor={answerId}>
              {answer.usePositWithFile ? <span>{answer.posit}</span> : null}
              {answer.files ? (
                // If the answer has files
                answer.files.map(file => {
                  const itemStyle = {
                    width: '40%',
                    border: answer.correct ? '10px solid orange' : '10px solid inherit'
                  };
                  return (
                    <p>
                      <img style={itemStyle} src={'data:' + file.dataContentType + ';base64,' + file.data} />
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
};

function rollFiles<T extends IFile>(ary: T[], idPref = 'file', itemStyle = { color: 'inherit' }): any[] {
  return ary && ary.length > 0
    ? ary.map((file, index) => {
        const itemId = idPref.concat('-').concat(index.toString());
        // const fn = (d:any, cb: (t: string) => {}) => {};
        const rep =
          file.data && file.dataContentType ? (
            <DeFile style={itemStyle} itemId={itemId} file={file}>
              {file.name}
            </DeFile>
          ) : (
            <b>null</b>
          );
        return rep;
      })
    : null;
}

//   <dd>
//   {questionEntity.answers
//     ? questionEntity.answers.map((val, i) => (
//         <span key={val.id}>
//           <a>{val.posit}</a>
//           {val.files
//             ? val.files.map(file => <span key={file.id}><br/><img src={file.url}/><br/></span>)
//             : null
//           }
//           {i === questionEntity.answers.length - 1 ? '' : ', '}
//         </span>
//       ))
//     : null}
// </dd>
//   return <span>
//   {aQuestion.answers
//     ? aQuestion.answers.map((val, i) => (
//         <span key={val.id}>
//           <a>{val.posit}</a>
//           {val.files
//             ? val.files.map(file => <span key={file.id}><br/><img src={file.url}/><br/></span>)
//             : null
//           }
//           {i === aQuestion.answers.length - 1 ? '' : ', '}
//         </span>
//       ))
//     : null}
//     </span>;
// }
