import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './instruction.reducer';
import { IInstruction } from 'app/shared/model/instruction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInstructionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InstructionDetail extends React.Component<IInstructionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { instructionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Instruction [<b>{instructionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{instructionEntity.title}</dd>
            <dt>
              <span id="input">Input</span>
            </dt>
            <dd>{instructionEntity.input}</dd>
            <dt>
              <span id="inputMimeWrap">Input Mime Wrap</span>
            </dt>
            <dd>{instructionEntity.inputMimeWrap}</dd>
            <dt>Creator</dt>
            <dd>{instructionEntity.creatorLogin ? instructionEntity.creatorLogin : ''}</dd>
            <dt>File</dt>
            <dd>
              {instructionEntity.files
                ? instructionEntity.files.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === instructionEntity.files.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/instruction" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/instruction/${instructionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ instruction }: IRootState) => ({
  instructionEntity: instruction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructionDetail);
