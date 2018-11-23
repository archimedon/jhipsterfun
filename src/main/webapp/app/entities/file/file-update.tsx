import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInstruction } from 'app/shared/model/instruction.model';
import { getEntities as getInstructions } from 'app/entities/instruction/instruction.reducer';
import { IAnswer } from 'app/shared/model/answer.model';
import { getEntities as getAnswers } from 'app/entities/answer/answer.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { getUserLink, getEntity, updateEntity, createEntity, setBlob, reset } from './file.reducer';
import { IFile } from 'app/shared/model/file.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import axios from 'axios';

export interface IFileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFileUpdateState {
  isNew: boolean;
  instructionId: string;
  answerId: string;
  questionId: string;
}

export class FileUpdate extends React.Component<IFileUpdateProps, IFileUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      instructionId: '0',
      answerId: '0',
      questionId: '0',
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

    this.props.getInstructions();
    this.props.getAnswers();
    this.props.getQuestions();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  // showUrl = (e: any) => {
  //   const val = getUserLink(e.target.value);
  //   document.getElementById('showFile').innerHTML = JSON.stringify(val);
  // };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { fileEntity } = this.props;
      const entity = {
        ...fileEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/file');
  };

  render() {
    const { fileEntity, instructions, answers, questions, loading, updating } = this.props;
    const { isNew } = this.state;

    const { data, dataContentType } = fileEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jamkingApp.file.home.createOrEditLabel">Create or edit a File</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fileEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="file-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField
                    id="file-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="categoryLabel">Category</Label>
                  <AvInput
                    id="file-category"
                    type="select"
                    className="form-control"
                    name="category"
                    value={(!isNew && fileEntity.category) || 'ANSWER'}
                  >
                    <option value="ANSWER">ANSWER</option>
                    <option value="INSTRUCTION">INSTRUCTION</option>
                    <option value="QUESTION">QUESTION</option>
                  </AvInput>
                </AvGroup>
                <div id="showFile"> Ragga </div>
                <AvGroup>
                  <AvGroup>
                    <Label id="dataLabel" for="data">
                      Data
                    </Label>
                    <br />
                    {data ? (
                      <div>
                        <a onClick={openFile(dataContentType, data)}>Open</a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {dataContentType}, {byteSize(data)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('data')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_data" type="file" onChange={this.onBlobChange(false, 'data')} />
                    <AvInput type="hidden" name="data" value={data} />
                  </AvGroup>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/file" replace color="info">
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
  instructions: storeState.instruction.entities,
  answers: storeState.answer.entities,
  questions: storeState.question.entities,
  fileEntity: storeState.file.entity,
  loading: storeState.file.loading,
  updating: storeState.file.updating,
  updateSuccess: storeState.file.updateSuccess
});

const mapDispatchToProps = {
  getInstructions,
  getAnswers,
  getQuestions,
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
)(FileUpdate);
