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
import { getSession } from 'app/shared/reducers/authentication';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './lesson.reducer';
import { ILesson } from 'app/shared/model/lesson.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import RichDropdown from 'app/entities/nested/rich_dropdown';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

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
    this.getQuestionData = this.getQuestionData.bind(this);
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

    this.props.getSession();
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
      // values.questions = this.getQuestionData();
      values.questions = (document.getElementsByName('questions')[0] as HTMLInputElement).value.split(',');

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

  toggleItem = list => {
    // tslint:disable-next-line
    console.log('toggleItem');
    // tslint:disable-next-line
    console.log('list', list);

    // const holdQids = document.getElementById('holdQids') as HTMLInputElement;
    // holdQids.value = list.map(item => item.id);
    // // tslint:disable-next-line
    // console.log('holdQids.value', holdQids.value);
  };

  getQuestionData = (): any[] => {
    const question_menu = document.getElementById('question_menu');
    // const selitems = question_menu.getElementsByClassName('selected') as HTMLCollection;
    const vals = this.props.questions.filter(it => it.selected);
    // [].map.call(selitems, (item: HTMLOListElement) => item.getAttribute('ref'));
    // tslint:disable-next-line
    console.log('sel questions: ', JSON.stringify(vals));

    // tslint:disable-next-line
    console.log('valsss: ', vals);

    return vals;
  };

  isSelected = (other, ary: any[]) => {
    // tslint:disable-next-line
    console.log('id: ', other.id);
    // tslint:disable-next-line
    console.log('ary: ', ary);

    return ary && ary.filter(that => that.id === other.id).length > 0;
  };

  render() {
    const { lessonEntity, users, instructions, questions, courses, loading, updating, account } = this.props;
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
                  <Label for="lesson-author">Author</Label>
                  {account &&
                  //  JSON.stringify(account)
                  // <AvField id="lesson-author" value={lessonEntity.author.id} className="form-control" type="string" name="authorId"/>
                  this.props.isAdmin ? (
                    <AvInput id="lesson-author" type="select" className="form-control" name="authorId">
                      {users &&
                        users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))}
                    </AvInput>
                  ) : (
                    <input id="lesson-author" disabled={false} value={account ? account.id : ''} type="text" name="authorId" />
                  )}
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
                  <Label for="question_menu">Questions</Label>
                  <div id="questionBox">
                    {questions ? (
                      <RichDropdown
                        itemId="question_menu"
                        list={questions.map(it => RichDropdown.makeMenuItem(it, this.isSelected(it, lessonEntity.questions)))}
                        dataName="questions"
                        titles={['Select Question(s)', '{count} Question attached', '{count} Questions attached']}
                        toggleItem={this.toggleItem}
                        labelValue={{ value: 'id', label: 'ask' }}
                      />
                    ) : null}
                  </div>
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
  account: storeState.authentication.account,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isAuthenticated: storeState.authentication.isAuthenticated,
  instructions: storeState.instruction.entities,
  questions: storeState.question.entities.map(q => RichDropdown.makeMenuItem(q, false)),
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
  getSession,
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
