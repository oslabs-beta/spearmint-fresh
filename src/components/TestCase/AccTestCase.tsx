import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  updateDescribeText,
  updateItStatementText,
  updateDescribeOrder,
  updateItStatementOrder,
  updateDescribeStandardTag,
  updateItCatTag,
  updateFilePath,
  updateTestType,
  createPuppeteerUrl,
} from '../../context/actions/accTestCaseActions';
import {
  AccTestCaseContext,
} from '../../context/reducers/accTestCaseReducer';
import { GlobalContext } from '../../context/reducers/globalReducer';

import styles from './TestCase.module.scss';
import AccTestMenu from '../TestMenu/AccTestMenu';
import AccTestTypes from '../AccTestComponent/AccTestTypes/AccTestTypes';
import PuppeteerUrl from '../AccTestComponent/PuppeteerUrl/PuppeteerUrl';
import SearchInput from '../SearchInput/SearchInput';
import DecribeRenderer from '../AccTestComponent/DescribeRenderer/DescribeRenderer';

const AccTestCase = () => {
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);

  const { describeBlocks, itStatements, testType } = accTestCase;

  const [{ filePathMap }] = useContext<any>(GlobalContext);

  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // edge cases: dropped to a non-destination, or dropped where it was grabbed (no change)
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const list = result.draggableId.includes('describe') ? describeBlocks.allIds : itStatements.allIds[result.type];
    const func = result.draggableId.includes('describe') ? updateDescribeOrder : updateItStatementOrder;

    const reorderedStatements = reorder(list, result.source.index, result.destination.index);

    dispatchToAccTestCase(func(reorderedStatements, result.type));
  };

  return (
    <div id={styles.AccTestCase}>
      <div id="head">
        <AccTestMenu />
      </div>

      <section id={styles.testCaseHeader}>
        <div id={styles.accTestDiv}>
          <AccTestTypes
            dispatch={dispatchToAccTestCase}
            action={updateTestType}
            currType={testType}
          />

          {testType === 'puppeteer' ? (
            <PuppeteerUrl dispatch={dispatchToAccTestCase} action={createPuppeteerUrl} />
          ) : (
            <div>
              <label htmlFor="fileImport">Import File From</label>
              <div id={styles.labelInput} style={{ width: '80%' }}>
                <SearchInput
                  options={Object.keys(filePathMap)}
                  dispatch={dispatchToAccTestCase}
                  action={updateFilePath}
                  filePathMap={filePathMap}
                />
              </div>
            </div>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd} key={`acc-dnd-context`}>
          <Droppable
            droppableId="droppableAccDescribe"
            key="acc-droppable-context"
            type="describe"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              > 
                <DecribeRenderer
                  key="bananas"
                  dispatcher={dispatchToAccTestCase}
                  describeBlocks={describeBlocks}
                  itStatements={itStatements}
                  updateDescribeText={updateDescribeText}
                  updateItStatementText={updateItStatementText}
                  updateDescribeStandardTag={updateDescribeStandardTag}
                  updateItCatTag={updateItCatTag}
                  type="acc"
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};
export default AccTestCase;
