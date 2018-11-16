import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Instruction from './instruction';
import InstructionDetail from './instruction-detail';
import InstructionUpdate from './instruction-update';
import InstructionDeleteDialog from './instruction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InstructionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InstructionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InstructionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Instruction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={InstructionDeleteDialog} />
  </>
);

export default Routes;
