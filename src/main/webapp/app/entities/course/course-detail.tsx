import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CourseDetail extends React.Component<ICourseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Course [<b>{courseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{courseEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{courseEntity.description}</dd>
            <dt>User</dt>
            <dd>{courseEntity.userLogin ? courseEntity.userLogin : ''}</dd>
            <dt>Lesson</dt>
            <dd>
              {courseEntity.lessons
                ? courseEntity.lessons.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === courseEntity.lessons.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/course" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/course/${courseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ course }: IRootState) => ({
  courseEntity: course.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetail);
