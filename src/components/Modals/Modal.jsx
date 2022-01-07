/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */

import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.module.scss';
import { useNewTest, useGenerateScript } from './modalHooks';
import { setTabIndex } from '../../context/actions/globalActions';
// Accordion view
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cn from 'classnames';
import { GlobalContext } from '../../context/reducers/globalReducer';

const ipc = require('electron').ipcRenderer;
const os = require('os');

const Modal = ({
  title,
  isModalOpen,
  closeModal,
  dispatchToMockData,
  dispatchTestCase,
  createTest,
  testType = null,
  puppeteerUrl = 'sample.io',
}) => {
  const { handleNewTest } = useNewTest(
    dispatchToMockData,
    dispatchTestCase,
    createTest,
    closeModal
  );
  const [fileName, setFileName] = useState('');
  const script = useGenerateScript(title, testType, puppeteerUrl);
  const [btnFeedback, setBtnFeedback] = useState({ changedDir: false, installed: false });
  const [{ isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  const clearAndClose = () => {
    setBtnFeedback({ ...btnFeedback, changedDir: false, installed: false });
    closeModal();
  };

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  const changeDirectory = () => {
    ipc.send('terminal.toTerm', `${script.cd}${execute}`);
    setBtnFeedback({ ...btnFeedback, changedDir: true });
  };

  const installDependencies = () => {
    ipc.send('terminal.toTerm', `${script.install}${execute}`);
    setBtnFeedback({ ...btnFeedback, installed: true });
    dispatchToGlobal(setTabIndex(2));
  };

  const submitFileName = () => {
    const fileName = document.getElementById('inputFileName').value;
    setFileName(fileName);
  };

  const jestTest = () => {
    ipc.send('terminal.toTerm', `npx jest ${fileName}${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };
  const verboseTest = () => {
    ipc.send('terminal.toTerm', `npx jest --verbose ${fileName}${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };
  const coverageTest = () => {
    ipc.send('terminal.toTerm', `npx jest --coverage ${fileName}${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  // Warning that tests will not be saved while transitioning between test types
  if (title === 'New Test') {
    return (
      <ReactModal
        className={styles.modal}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Save?'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        style={{
          content: {
            top: '10%',
            left: isFileDirectoryOpen ? '22%' : '11%',
          },
          overlay: {
            zIndex: 3,
            left: isFileDirectoryOpen ? '276px' : '46px',
            minWidth: isFileDirectoryOpen ? '600px' : '600px',
            width: isFileDirectoryOpen ? 'calc(59.9% - 276px)' : 'calc(49.9% - 46px)',
          },
        }}
      >
        <div id={styles.title}>
          <p>{title}</p>
        </div>

        <div id={styles.body}>
          <p id={styles.text}>
            Do you want to start a new test? All unsaved changes
            <br />
            will be lost.
          </p>
          <span
            id={styles.newTestButtons}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <button id={styles.save} onClick={handleNewTest}>
              {title}
            </button>
            <button id={styles.save} onClick={closeModal}>
              Cancel
            </button>
          </span>
        </div>
      </ReactModal>
    );
  }

  // EndPointGuide component definition, conditionally rendered
  const EndPointGuide = () => {
    // endpoint guide only exists when user is in endpoint testing
    if (script.endPointGuide) {
      const array = [];
      for (let step in script.endPointGuide) {
        array.push(
          <div id={styles.endPointGuide}>
            {script.endPointGuide[step]}
            {'\n'}
          </div>
        );
      }
      // return accordion element
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            id={styles.accordionSummary}
          >
            Endpoint Testing Configuration Guide
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>{array}</AccordionDetails>
        </Accordion>
      );
    }
    // return anything to not render accordion
    return null;
  };

  // ReactDependencies component definition, conditionally rendered
  const ReactDependencies = () => {
    if (title === 'hooks' || title === 'react') {
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            id={styles.accordionSummary}
          >
            3. Important React Babel Configuration
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>
            <div id={styles.accordionDiv}>
              <div> Ensure that your project contains the following file: </div>
              <pre>
                <div className='code-wrapper'>
                  <code>babel.config.js</code>
                </div>
              </pre>
            </div>
            <div>
              and includes the following code:
              <br />
            </div>
            <pre>
              <div className='code-wrapper'>
                <code>
                  {`module.exports = {presets: ['@babel/preset-env', '@babel/preset-react']}`}
                </code>
              </div>
            </pre>
          </AccordionDetails>
        </Accordion>
      );
    }
    return null;
  };

  return (
    <ReactModal
      className={styles.modal2}
      isOpen={isModalOpen}
      onRequestClose={clearAndClose}
      contentLabel='Save?'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={styles.modalCustomOverlay}
      ariaHideApp={false}
      style={{
        content: {
          top: '10%',
          left: isFileDirectoryOpen ? '22%' : '11%',
        },
        overlay: {
          left: isFileDirectoryOpen ? '276px' : '46px',
          minWidth: isFileDirectoryOpen ? '600px' : '600px',
          width: isFileDirectoryOpen ? 'calc(59.9% - 276px)' : 'calc(49.9% - 46px)',
        },
      }}
    >
      {/* Modal Title */}
      <div id={styles.title}>
        <p style={{ fontSize: 20 }}>Run Tests in Terminal</p>
        <i
          tabIndex={0}
          onKeyPress={clearAndClose}
          onClick={clearAndClose}
          id={styles.escapeButton}
          className={cn('far fa-window-close', styles.describeClose)}
        />
      </div>
      {/* Accordion View */}
      <div>
        {/* Configuration Guide */}
        <EndPointGuide />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            id={styles.accordionSummary}
          >
            Configuration Guide
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            <div style={{ width: '100%' }}>
              {/* Change Directory */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id={styles.accordionSummary}
                >
                  1. Set terminal to root directory.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div id={styles.accordionDiv}>
                    <pre>
                      <div className='code-wrapper'>
                        <code>{script.cd}</code>
                      </div>
                    </pre>
                    <span id={styles.newTestButtons}>
                      <button
                        id={styles.save}
                        className='changeDirectory'
                        onClick={changeDirectory}
                      >
                        Change Directory
                      </button>
                      <div id={styles.feedback}>
                        {btnFeedback.changedDir === false ? null : (
                          <p>Directory has been changed to root directory.</p>
                        )}
                      </div>
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Install Dependencies */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id={styles.accordionSummary}
                >
                  2. Install dependencies and Jest.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div id={styles.accordionDiv}>
                    <pre>
                      <div className='code-wrapper' id={styles.codeWrapper}>
                        <code>{script.install}</code>
                      </div>
                    </pre>
                    <span id={styles.newTestButtons}>
                      <button id={styles.save} onClick={installDependencies}>
                        Install
                      </button>
                      <div id={styles.feedback}></div>
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Create config file only if title is react or hook */}
              <ReactDependencies />
            </div>
          </AccordionDetails>
        </Accordion>
        {/* Specify File to test */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            // id="panel1a-header"
            id={styles.accordionSummary}
          >
            Specify file to test (optional)
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            {/* Select test to run */}
            <div id={styles.accordionDiv}>
              <input id='inputFileName' placeholder='example.js' />
              <span id={styles.newTestButtons}>
                <button id={styles.save} onClick={submitFileName}>
                  Submit
                </button>
              </span>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* Testing */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={styles.accordionSummary}
          >
            Select and Run Tests
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            {/* Select test to run */}
            <div id={styles.accordionDiv}>
              {/* To do: make button toggle on/off */}
              <pre>
                <div className='code-wrapper'>
                  <code>
                    {`npx jest ${fileName}\n`}
                    {`npx jest --verbose ${fileName}\n`}
                    {`npx jest --coverage ${fileName}\n`}
                  </code>
                </div>
              </pre>
              <span id={styles.newTestButtons}>
                <button id={styles.save} onClick={jestTest}>
                  Jest Test
                </button>
                <button id={styles.save} onClick={verboseTest}>
                  Verbose Test
                </button>
                <button id={styles.save} onClick={coverageTest}>
                  Coverage Test
                </button>
              </span>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </ReactModal>
  );
};

export default Modal;
