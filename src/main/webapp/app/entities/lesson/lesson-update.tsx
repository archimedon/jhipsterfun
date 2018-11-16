import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IInstruction } from 'app/shared/model/instruction.model';
import { getEntities as getInstructions } from 'app/entities/instruction/instruction.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './lesson.reducer';
import { ILesson } from 'app/shared/model/lesson.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILessonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILessonUpdateState {
  isNew: boolean;
  idsinstruction: any[];
  idsquestion: any[];
  authorId: string;
  courseId: string;
}

export class LessonUpdate extends React.Component<ILessonUpdateProps, ILessonUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsinstruction: [],
      idsquestion: [],
      authorId: '0',
      courseId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getInstructions();
    this.props.getQuestions();
    this.props.getCourses();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { lessonEntity } = this.props;
      const entity = {
        ...lessonEntity,
        ...values,
        instructions: mapIdList(values.instructions),
        questions: mapIdList(values.questions)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/lesson');
  };

  render() {
    const { lessonEntity, users, instructions, questions, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description } = lessonEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jamkingApp.lesson.home.createOrEditLabel">Create or edit a Lesson</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : lessonEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="lesson-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField
                    id="lesson-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    Description
                  </Label>
                  <AvInput id="lesson-description" type="textarea" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="minNumQuestionsLabel" for="minNumQuestions">
                    Min Num Questions
                  </Label>
                  <AvField id="lesson-minNumQuestions" type="string" className="form-control" name="minNumQuestions" />
                </AvGroup>
                <AvGroup>
                  <Label for="author.login">Author</Label>
                  <AvInput id="lesson-author" type="select" className="form-control" name="authorId">
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="instructions">Instruction</Label>
                  <AvInput
                    id="lesson-instruction"
                    type="select"
                    multiple
                    className="form-control"
                    name="instructions"
                    value={lessonEntity.instructions && lessonEntity.instructions.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {instructions
                      ? instructions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="questions">Question</Label>
                  <AvInput
                    id="lesson-question"
                    type="select"
                    multiple
                    className="form-control"
                    name="questions"
                    value={lessonEntity.questions && lessonEntity.questions.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {questions
                      ? questions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.ask}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/lesson" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  instructions: storeState.instruction.entities,
  questions: storeState.question.entities,
  courses: storeState.course.entities,
  lessonEntity: storeState.lesson.entity,
  loading: storeState.lesson.loading,
  updating: storeState.lesson.updating,
  updateSuccess: storeState.lesson.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getInstructions,
  getQuestions,
  getCourses,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonUpdate);
