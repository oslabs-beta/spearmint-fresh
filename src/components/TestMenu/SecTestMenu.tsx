import React, { useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { createNewSecTest } from '../../context/actions/secTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  setTestCase,
  toggleModal,
} from '../../context/actions/globalActions';
import { SecTestCaseContext } from '../../context/reducers/secTestCaseReducer';
import { useToggleModal } from './testMenuHooks';

const SecTestMenu = () => {
  // link to Snyk docs
  const snykURL = 'https://docs.snyk.io/'

  /* initialize hooks */
  // 
  const { title, isModalOpen, openModal, openScriptModal, closeModal, } = useToggleModal('sec');
  const [secTestCase, dispatchToSecTestCase] = useContext(SecTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);

  // setValidCode to true on load.
  useEffect(() => {
      dispatchToGlobal(setValidCode(true));
    }, []);

  // handle change to open Snyk docs on right panel
  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(snykURL));
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
          {/* set a few of these properties to null since they are required to be present but accept any data type... just for testing*/}
          <Modal
            title={title}
            dispatchToMockData={null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchTestCase={dispatchToSecTestCase}
            createTest={createNewSecTest}
          />
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