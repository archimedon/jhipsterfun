import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Question from './question';
import Answer from './answer';
import Track from './track';
import Lesson from './lesson';
import Course from './course';
import Instruction from './instruction';
import File from './file';
import Category from './category';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}/answer`} component={Answer} />
      <ErrorBoundaryRoute path={`${match.url}/track`} component={Track} />
      <ErrorBoundaryRoute path={`${match.url}/lesson`} component={Lesson} />
      <ErrorBoundaryRoute path={`${match.url}/course`} component={Course} />
      <ErrorBoundaryRoute path={`${match.url}/instruction`} component={Instruction} />
      <ErrorBoundaryRoute path={`${match.url}/file`} component={File} />
      <ErrorBoundaryRoute path={`${match.url}/category`} component={Category} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
