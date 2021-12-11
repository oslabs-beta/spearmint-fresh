import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  toggleRightPanel,
  updateFile,
  setFilePath,
  setValidCode,
  toggleExportBool,
  setTestCase,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import Modal from '../Modals/Modal';
import {
  addEndpoint,
  createNewEndpointTest,
  toggleDB,
  updateDBFilePath,
} from '../../context/actions/endpointTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

// child component of EndPointTest menu. has NewTest and Endpoint buttons
const EndpointTestMenu = () => {
  const [endpointTestCase, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);

  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('endpoint');
  const generateTest = useGenerateTest('endpoint', projectFilePath);
  // Endpoint testing docs url
  const endpointUrl = 'https://www.npmjs.com/package/supertest';

  useEffect(() => {
    // validateInputs('endpoint', endpointTestCase)
    //   ? dispatchToGlobal(setValidCode(true))
    dispatchToGlobal(setValidCode(false));
  }, []);

  const handleAddEndpoint = () => {
    dispatchToEndpointTestCase(addEndpoint());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(endpointUrl));
  };

  const fileHandle = () => {
    console.log('endpointTestCase'); 
    console.log(endpointTestCase)
    dispatchToGlobal(updateFile(generateTest(endpointTestCase)));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
  };

  const handleClickAddDatabase = () => {
    if (endpointTestCase.addDB) {
      dispatchToEndpointTestCase(toggleDB(false));
      dispatchToEndpointTestCase(updateDBFilePath(''));
    } else dispatchToEndpointTestCase(toggleDB('PostgreSQL'));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (exportBool) {
    const valid = validateInputs('endpoint', endpointTestCase);
    dispatchToGlobal(setValidCode(valid));
    dispatchToGlobal(toggleExportBool());
    if (valid && !file) dispatchToGlobal(updateFile(generateTest(endpointTestCase)));
  }


  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal} autoFocus >New Test +</button>
          <button id={styles.preview} onClick={fileHandle}>
            Preview
          </button>
          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          {/* <UploadTest testType="endpoint test" />
          <GetTests testType="endpoint test" /> */}
          <Modal
            // passing methods down as props to be used when TestModal is opened
            title={title}
            dispatchToMockData={null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchTestCase={title === 'New Test' ? dispatchToEndpointTestCase : null}
            createTest={title === 'New Test' ? createNewEndpointTest : null}
          />
        </div>
        <div id={styles.right}>
          <button data-testid='endPointButton' onClick={handleAddEndpoint}>
            Endpoint
          </button>
          <button data-testid='endPointButton' onClick={handleClickAddDatabase}>
            Configure Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndpointTestMenu;
