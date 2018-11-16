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
import { IFile } from 'app/shared/model/file.model';
import { getEntities as getFiles } from 'app/entities/file/file.reducer';
import { ILesson } from 'app/shared/model/lesson.model';
import { getEntities as getLessons } from 'app/entities/lesson/lesson.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './instruction.reducer';
import { IInstruction } from 'app/shared/model/instruction.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInstructionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInstructionUpdateState {
  isNew: boolean;
  idsfile: any[];
  creatorId: string;
  lessonId: string;
}

export class InstructionUpdate extends React.Component<IInstructionUpdateProps, IInstructionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsfile: [],
      creatorId: '0',
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

    this.props.getUsers();
    this.props.getFiles();
    this.props.getLessons();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { instructionEntity } = this.props;
      const entity = {
        ...instructionEntity,
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
    this.props.history.push('/entity/instruction');
  };

  render() {
    const { instructionEntity, users, files, lessons, loading, updating } = this.props;
    const { isNew } = this.state;

    const { input } = instructionEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jamkingApp.instruction.home.createOrEditLabel">Create or edit a Instruction</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : instructionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="instruction-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField
                    id="instruction-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="inputLabel" for="input">
                    Input
                  </Label>
                  <AvInput id="instruction-input" type="textarea" name="input" />
                </AvGroup>
                <AvGroup>
                  <Label id="inputMimeWrapLabel">Input Mime Wrap</Label>
                  <AvInput
                    id="instruction-inputMimeWrap"
                    type="select"
                    className="form-control"
                    name="inputMimeWrap"
                    value={(!isNew && instructionEntity.inputMimeWrap) || 'NONE'}
                  >
                    <option value="NONE">NONE</option>
                    <option value="BASE64">BASE64</option>
                    <option value="BINHEX">BINHEX</option>
                    <option value="JSON">JSON</option>
                    <option value="BASE64_DIRTREE">BASE64_DIRTREE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="creator.login">Creator</Label>
                  <AvInput id="instruction-creator" type="select" className="form-control" name="creatorId">
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
                  <Label for="files">File</Label>
                  <AvInput
                    id="instruction-file"
                    type="select"
                    multiple
                    className="form-control"
                    name="files"
                    value={instructionEntity.files && instructionEntity.files.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/instruction" replace color="info">
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
  files: storeState.file.entities,
  lessons: storeState.lesson.entities,
  instructionEntity: storeState.instruction.entity,
  loading: storeState.instruction.loading,
  updating: storeState.instruction.updating,
  updateSuccess: storeState.instruction.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getFiles,
  getLessons,
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
)(InstructionUpdate);
