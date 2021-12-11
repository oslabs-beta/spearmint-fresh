import React, { ChangeEvent, useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { AccTestCaseContext } from '../../../context/reducers/accTestCaseReducer';
import CatTagFilter from '../CatTagFilter/CatTagFilter';

import {
  deleteItStatement,
} from '../../../context/actions/accTestCaseActions';

import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  itStatements,
  describeId,
  updateItStatementText,
  updateItCatTag,
}) => {

  const [, dispatchToAccTestCase] = useContext(AccTestCaseContext);

  const deleteItStatementHandleClick = (e: ChangeEvent) => {
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
  };

  const deleteItStatementOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const itId = e.target.id;
      dispatchToAccTestCase(deleteItStatement(describeId, itId));
    }
  }

  return itStatements.allIds[describeId].map((id: string, i: number) => (
    <Draggable
      draggableId={id}
      index={i}
      key={`itRenderer-${id}`}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.ItRenderer}
          key={i}
        >

          <CatTagFilter
            dispatch={dispatchToAccTestCase}
            tagAction={updateItCatTag}
            textAction={updateItStatementText}
            itId={id}
            catTag={itStatements.byId[id].catTag}
          />

          <i
            tabIndex={0}
            onKeyPress={deleteItStatementOnKeyUp}
            onClick={deleteItStatementHandleClick}
            id={id}
            className={cn(styles.itClose, 'far fa-window-close')}
          />

          <p class={styles.itStatement}>{itStatements.byId[id].text}</p>
          <hr />

        </div>
      )}
    </Draggable>
  ));
};

export default ItRenderer;
