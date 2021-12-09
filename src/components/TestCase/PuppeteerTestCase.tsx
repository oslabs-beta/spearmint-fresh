import React, { useContext, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestMenu from '../TestMenu/PuppeteerTestMenu';
import PuppeteerTestStatements from './PuppeteerTestStatements';
import { updateStatementsOrder } from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerStatements } from '../../utils/puppeteerTypes';

//additions fo previously ExportFileModal functionality
import styles from './TestCase.module.scss';

const PuppeteerTestCase = () => {
  const [{ puppeteerStatements }, dispatchToPuppeteerTestCase] = useContext(
    PuppeteerTestCaseContext
  );

  const testDescription = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (testDescription && testDescription.current) {
      testDescription.current.focus();
    }
  }, []);

  const reorder = (list: Array<PuppeteerStatements>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements: Array<PuppeteerStatements> = reorder(
      puppeteerStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToPuppeteerTestCase(updateStatementsOrder(reorderedStatements));
  };

  return (
    <div>
      <div id='head'>
        <PuppeteerTestMenu />
      </div>
      <div id={styles.testMockSection}></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <PuppeteerTestStatements />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PuppeteerTestCase;
