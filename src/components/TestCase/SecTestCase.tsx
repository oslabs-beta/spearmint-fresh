import React, { useContext } from 'react';
import { setTabIndex } from '../../context/actions/globalActions';

import { GlobalContext } from '../../context/reducers/globalReducer';

import styles from './TestCase.module.scss';
import SecTestMenu from '../TestMenu/SecTestMenu';
import { Button, TextField } from '@material-ui/core';

const ipc = require('electron').ipcRenderer;
const os = require('os');

const SecTestCase = () => {

  const [{ isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  // sends user to webpage to authenticate use of snyk in terminal
  const snykAuth = () => {
    ipc.send('terminal.toTerm', `snyk auth ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  const dependencyTest = () => {
    ipc.send('terminal.toTerm', `snyk test ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  const applicationTest = () => {
    ipc.send('terminal.toTerm', `snyk code test ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  const snykWizard = () => {
    ipc.send('terminal.toTerm', `snyk wizard ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  return (
    <div id={styles.SecTestCase}>
      <div id="head">
        <SecTestMenu />
      </div>

      <section>
        <Button variant='contained' type='button' id={styles.snyk} onClick={snykAuth}>
          Authenticate Snyk
        </Button>
        <br />
        <br />
        <br />
        <Button variant='outlined' type='button' id={styles.snyk} onClick={dependencyTest}>
          Test Dependencies
        </Button>
        <br />
        <br />
        <Button variant='outlined' type='button' id={styles.snyk} onClick={snykWizard}>
          Fix Dependencies
        </Button>
        <Button variant='outlined' type='button' id={styles.snyk} onClick={applicationTest}>
          Test Application
        </Button>
        <br />
        <br />
      </section>
    </div>
  )
}

export default SecTestCase;