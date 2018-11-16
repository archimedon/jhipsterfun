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
import { ILesson } from 'app/shared/model/lesson.model';
import { getEntities as getLessons } from 'app/entities/lesson/lesson.reducer';
import { ITrack } from 'app/shared/model/track.model';
import { getEntities as getTracks } from 'app/entities/track/track.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICourseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICourseUpdateState {
  isNew: boolean;
  idslesson: any[];
  userId: string;
  trackId: string;
}

export class CourseUpdate extends React.Component<ICourseUpdateProps, ICourseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idslesson: [],
      userId: '0',
      trackId: '0',
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
    this.props.getLessons();
    this.props.getTracks();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courseEntity } = this.props;
      const entity = {
        ...courseEntity,
        ...values,
        lessons: mapIdList(values.lessons)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/course');
  };

  render() {
    const { courseEntity, users, lessons, tracks, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description } = courseEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jamkingApp.course.home.createOrEditLabel">Create or edit a Course</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="course-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField
                    id="course-title"
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
                  <AvInput id="course-description" type="textarea" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">User</Label>
                  <AvInput id="course-user" type="select" className="form-control" name="userId">
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
                  <Label for="lessons">Lesson</Label>
                  <AvInput
                    id="course-lesson"
                    type="select"
                    multiple
                    className="form-control"
                    name="lessons"
                    value={courseEntity.lessons && courseEntity.lessons.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {lessons
                      ? lessons.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/course" replace color="info">
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
  lessons: storeState.lesson.entities,
  tracks: storeState.track.entities,
  courseEntity: storeState.course.entity,
  loading: storeState.course.loading,
  updating: storeState.course.updating,
  updateSuccess: storeState.course.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getLessons,
  getTracks,
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
)(CourseUpdate);
