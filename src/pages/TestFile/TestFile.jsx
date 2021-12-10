/* eslint-disable linebreak-style */
import React, { useContext, useReducer, Fragment } from 'react';
import ReactModal from 'react-modal';
import styles from '../../components/Modals/Modal.module.scss';
// A simple JavaScript utility for conditionally joining classNames together
import cn from 'classnames';

// may be able to delete toggleReact, etc. from their respective action files
import ReactTestCase from '../../components/TestCase/ReactTestCase';

import {
  ReduxTestCaseContext,
  reduxTestCaseState,
  reduxTestCaseReducer,
} from '../../context/reducers/reduxTestCaseReducer';
import ReduxTestCase from '../../components/TestCase/ReduxTestCase';

import {
  HooksTestCaseContext,
  hooksTestCaseState,
  hooksTestCaseReducer,
} from '../../context/reducers/hooksTestCaseReducer';
import HooksTestCase from '../../components/TestCase/HooksTestCase';

import {
  EndpointTestCaseContext,
  endpointTestCaseState,
  endpointTestCaseReducer,
} from '../../context/reducers/endpointTestCaseReducer';
// import EndpointTestCase from '../../components/TestCase/EndpointTestCase';

import {
  puppeteerTestCaseState,
  puppeteerTestCaseReducer,
  PuppeteerTestCaseContext,
} from '../../context/reducers/puppeteerTestCaseReducer';
// import PuppeteerTestCase from '../../components/TestCase/PuppeteerTestCase';

import {
  MockDataContext,
  mockDataState,
  mockDataReducer,
} from '../../context/reducers/mockDataReducer';

import {
  AccTestCaseContext,
  accTestCaseState,
  accTestCaseReducer,
} from '../../context/reducers/accTestCaseReducer';
import AccTestCase from '../../components/TestCase/AccTestCase';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { setTestCase, toggleModal } from '../../context/actions/globalActions';

const TestFile = () => {
  let [{ testCase, isTestModalOpen }, dispatchToGlobal] = useContext(GlobalContext);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);

  const [endpointTestCase, dispatchToEndpointTestCase] = useReducer(
    endpointTestCaseReducer,
    endpointTestCaseState
  );

  const [reduxTestCase, dispatchToReduxTestCase] = useReducer(
    reduxTestCaseReducer,
    reduxTestCaseState
  );
  const [hooksTestCase, dispatchToHooksTestCase] = useReducer(
    hooksTestCaseReducer,
    hooksTestCaseState
  );
  const [puppeteerTestCase, dispatchToPuppeteerTestCase] = useReducer(
    puppeteerTestCaseReducer,
    puppeteerTestCaseState
  );
  const [accTestCase, dispatchToAccTestCase] = useReducer(accTestCaseReducer, accTestCaseState);

  const closeTestModal = () => {
    dispatchToGlobal(toggleModal());
  };

  const handleToggle = (test) => {
    dispatchToGlobal(setTestCase(test));
    closeTestModal();
  };

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  return (
    // landing modal which displays button choices
    <div>
      <ReactModal
        className={styles.modal}
        isOpen={isTestModalOpen}
        onRequestClose={closeTestModal}
        contentLabel='Save?'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        style={modalStyles}
      >
        <div id={styles.title}>
          <p style={{ fontSize: 15 }}>Test</p>
          <i
            tabIndex={0}
            onKeyPress={closeTestModal}
            onClick={closeTestModal}
            id={styles.escapeButton}
            className={cn('far fa-window-close', styles.describeClose)}
          />
        </div>
        <div id={styles.body}>
          <p id={styles.text}>What would you like to test?</p>
          <span id={styles.newTestButtons}>
            <button id={styles.save} autoFocus onClick={() => handleToggle('acc')}>
              Accessibility
            </button>
            <button id={styles.save} onClick={() => handleToggle('endpoint')}>
              Endpoint
            </button>
            <button id={styles.save} onClick={() => handleToggle('hooks')}>
              Hooks
            </button>
            <button id={styles.save} onClick={() => handleToggle('puppeteer')}>
              Puppeteer
            </button>
            <button id={styles.save} onClick={() => handleToggle('react')}>
              React
            </button>
            <button id={styles.save} onClick={() => handleToggle('redux')}>
              Redux
            </button>
             <button id={styles.save} onClick={() => handleToggle('security')}>
              Security
            </button>
            {/* <button id={styles.save} onClick={() => handleToggle('vue')}>
              Vue
            </button> */}
          </span>
        </div>
      </ReactModal>
      {/* instantiate context for each test option */}
      {testCase === 'redux' && (
        <section>
          <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
            <ReduxTestCase />
          </ReduxTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'react' && (
        <section>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <ReactTestCase />
          </MockDataContext.Provider>
        </section>
      )}

      {/* {testCase === 'endpoint' && (
        <section>
          <EndpointTestCaseContext.Provider value={[endpointTestCase, dispatchToEndpointTestCase]}>
            <EndpointTestCase />
          </EndpointTestCaseContext.Provider>
        </section>
      )} */}

      {testCase === 'hooks' && (
        <section>
          <HooksTestCaseContext.Provider value={[hooksTestCase, dispatchToHooksTestCase]}>
            <HooksTestCase />
          </HooksTestCaseContext.Provider>
        </section>
      )}

      {/* {testCase === 'puppeteer' && (
        <section>
          <PuppeteerTestCaseContext.Provider
            value={[puppeteerTestCase, dispatchToPuppeteerTestCase]}
          >
            <PuppeteerTestCase />
          </PuppeteerTestCaseContext.Provider>
        </section>
      )} */}

      {testCase === 'acc' && (
        <section>
          <AccTestCaseContext.Provider value={[accTestCase, dispatchToAccTestCase]}>
            <AccTestCase />
          </AccTestCaseContext.Provider>
        </section>
      )}
      
      {testCase === 'security' && (
        <section>
          <SecTestCaseContext.Provider value={[secTestCase, dispatchToSecTestCase]}>
            <SecTestCase />
          </SecTestCaseContext.Provider>
        </section>
      )}

       {/* {
        //incomplete functionality: this is wired to go to a react test for now
        testCase === 'vue' && (
          <section>
            <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
              <ReactTestCase />
            </MockDataContext.Provider>
          </section>
        )
      } */}

      {testCase === '' && (
        <Fragment>
          <div id={styles.left}>
            <br></br>
            <br></br>
            <h2>Click on New Test below to get started!</h2>
            <br></br>
          </div>
          <div id={styles.testMenu}>
            <div id={styles.left}>
              <button id={styles.newTestBtn} onClick={closeTestModal}>
                New Test +
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default TestFile;
