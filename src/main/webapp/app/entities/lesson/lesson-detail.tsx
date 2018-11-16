import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './lesson.reducer';
import { ILesson } from 'app/shared/model/lesson.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILessonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LessonDetail extends React.Component<ILessonDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { lessonEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Lesson [<b>{lessonEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{lessonEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{lessonEntity.description}</dd>
            <dt>
              <span id="minNumQuestions">Min Num Questions</span>
            </dt>
            <dd>{lessonEntity.minNumQuestions}</dd>
            <dt>Author</dt>
            <dd>{lessonEntity.authorLogin ? lessonEntity.authorLogin : ''}</dd>
            <dt>Instruction</dt>
            <dd>
              {lessonEntity.instructions
                ? lessonEntity.instructions.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === lessonEntity.instructions.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Question</dt>
            <dd>
              {lessonEntity.questions
                ? lessonEntity.questions.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.ask}</a>
                      {i === lessonEntity.questions.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/lesson" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/lesson/${lessonEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ lesson }: IRootState) => ({
  lessonEntity: lesson.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonDetail);
