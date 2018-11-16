import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './track.reducer';
import { ITrack } from 'app/shared/model/track.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrackDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TrackDetail extends React.Component<ITrackDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { trackEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Track [<b>{trackEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{trackEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{trackEntity.description}</dd>
            <dt>Course</dt>
            <dd>
              {trackEntity.courses
                ? trackEntity.courses.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === trackEntity.courses.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/track" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/track/${trackEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ track }: IRootState) => ({
  trackEntity: track.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackDetail);
