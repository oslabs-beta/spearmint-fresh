import React, { useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
// import { createNewTest } from '../../context/actions/secTestCaseActions';
import Modal from '../Modals/Modal';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  setTestCase,
  toggleModal,
} from '../../context/actions/globalActions';
// import { SecTestCaseContext } from '../../context/reducers/secTestCaseReducer';
import { useToggleModal } from './testMenuHooks';

const SecTestMenu = () => {
  /* initialize hooks */
  // 
  const { title, isModalOpen, openModal, openScriptModal, closeModal, } = useToggleModal('acc');
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);

  // setValidCode to true on load.
  useEffect(() => {
      dispatchToGlobal(setValidCode(true));
    }, []);

  // handle change to open accessibility URL docs on right panel
  // placeholder URL :)
  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs('www.google.com'));
  };

  const openNewTestModal = () => {
  if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };
  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button id={styles.newTestBtn} autoFocus onClick={openModal}>New Test +</button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          {/* <UploadTest testType="acc" />
          <GetTests testType="acc" /> */}
          {/* set a few of these properties to null since they are required to be present but accept any data type... just for testin*/}
          <Modal
            title={title}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={null}
            dispatchTestCase={null}
            createTest={null}
            testType={null}
            puppeteerUrl={'sample.io'}
          />
          {/* Just send user to docs on button click */}
        </div>

        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >  
        </div>
      </div>
    </div>
  );
}
    
export default SecTestMenu;
  