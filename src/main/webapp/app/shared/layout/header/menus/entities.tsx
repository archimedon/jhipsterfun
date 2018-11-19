import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/question">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Question
    </DropdownItem>

    <DropdownItem tag={Link} to="/entity/file">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;File
    </DropdownItem>

    <DropdownItem tag={Link} to="/entity/answer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Answer
    </DropdownItem>

    <DropdownItem tag={Link} to="/entity/course">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Course
    </DropdownItem>

    <DropdownItem tag={Link} to="/entity/instruction">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Instruction
    </DropdownItem>

    <DropdownItem tag={Link} to="/entity/lesson">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Lesson
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/track">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;Track
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
