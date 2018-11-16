import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './answer.reducer';
import { IAnswer } from 'app/shared/model/answer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnswerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AnswerDetail extends React.Component<IAnswerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { answerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Answer [<b>{answerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="posit">Posit</span>
            </dt>
            <dd>{answerEntity.posit}</dd>
            <dt>
              <span id="correct">Correct</span>
            </dt>
            <dd>{answerEntity.correct ? 'true' : 'false'}</dd>
            <dt>File</dt>
            <dd>
              {answerEntity.files
                ? answerEntity.files.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === answerEntity.files.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Question</dt>
            <dd>{answerEntity.questionAsk ? answerEntity.questionAsk : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/answer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/answer/${answerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ answer }: IRootState) => ({
  answerEntity: answer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerDetail);
