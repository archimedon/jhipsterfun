import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFile } from 'app/shared/model/file.model';
import { getEntities as getFiles } from 'app/entities/file/file.reducer';
import { ILesson } from 'app/shared/model/lesson.model';
import { getEntities as getLessons } from 'app/entities/lesson/lesson.reducer';
import { getEntity, updateEntity, createEntity, reset } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IQuestionUpdateState {
  isNew: boolean;
  idsfile: any[];
  lessonId: string;
}

export class QuestionUpdate extends React.Component<IQuestionUpdateProps, IQuestionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsfile: [],
      lessonId: '0',
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

    this.props.getFiles();
    this.props.getLessons();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { questionEntity } = this.props;
      const entity = {
        ...questionEntity,
        ...values,
        files: mapIdList(values.files)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/question');
  };

  render() {
    const { questionEntity, files, lessons, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jamkingApp.question.home.createOrEditLabel">Create or edit a Question</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : questionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="question-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="askLabel" for="ask">
                    Ask
                  </Label>
                  <AvField
                    id="question-ask"
                    type="text"
                    name="ask"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="answersAsLabel">Answers As</Label>
                  <AvInput
                    id="question-answersAs"
                    type="select"
                    className="form-control"
                    name="answersAs"
                    value={(!isNew && questionEntity.answersAs) || 'CHECKBOX'}
                  >
                    <option value="CHECKBOX">CHECKBOX</option>
                    <option value="RADIO">RADIO</option>
                    <option value="TEXT">TEXT</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="minNumOptionsLabel" for="minNumOptions">
                    Min Num Options
                  </Label>
                  <AvField id="question-minNumOptions" type="string" className="form-control" name="minNumOptions" />
                </AvGroup>
                <AvGroup>
                  <Label for="files">File</Label>
                  <AvInput
                    id="question-file"
                    type="select"
                    multiple
                    className="form-control"
                    name="files"
                    value={questionEntity.files && questionEntity.files.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {files
                      ? files.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/question" replace color="info">
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
  files: storeState.file.entities,
  lessons: storeState.lesson.entities,
  questionEntity: storeState.question.entity,
  loading: storeState.question.loading,
  updating: storeState.question.updating,
  updateSuccess: storeState.question.updateSuccess
});

const mapDispatchToProps = {
  getFiles,
  getLessons,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionUpdate);
