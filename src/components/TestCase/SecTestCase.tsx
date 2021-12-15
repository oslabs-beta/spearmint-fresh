import React, { useState, useContext } from 'react';
import { setTabIndex } from '../../context/actions/globalActions';
import { useGenerateScript } from '../Modals/modalHooks';

import { GlobalContext } from '../../context/reducers/globalReducer';

import styles from './TestCase.module.scss';
import SecTestMenu from '../TestMenu/SecTestMenu';
import { Button } from '@material-ui/core';

const ipc = require('electron').ipcRenderer;
const os = require('os');

const SecTestCase = () => {

  const script = useGenerateScript('sec');
  const [btnFeedback, setBtnFeedback] = useState({ changedDir: false, installed: false });
  const [{ isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  const snykInstall = () => {
    // changes directory to project file directory
    ipc.send('terminal.toTerm', `${script.cd}${execute}`);
    setBtnFeedback({ ...btnFeedback, changedDir: true });

    // installs snyk
    ipc.send('terminal.toTerm', `${script.install}${execute}`);
    setBtnFeedback({ ...btnFeedback, installed: true });
    dispatchToGlobal(setTabIndex(2));
  }

  // sends user to webpage to authenticate use of snyk in terminal
  const snykAuth = () => {
    if (os.platform() === 'win32') {
      ipc.send('terminal.toTerm', `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted ${execute}`);
    }
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

  // sends user to snyk settings in default browser to enable Snyk Code
  const enableSnykCode = () => {
    require('electron').shell.openExternal('https://app.snyk.io/manage/snyk-code');
  }

  return (
    <div id={styles.SecTestCase}>
      <div id="head">
        <SecTestMenu />
      </div>

      <section>
        <div id={styles.secInfo}>
          <p>
            Spearmint leverages Snyk testing in order to evaluate security vulnerabilities.
            <br />
            <br />
            Some assembly required.
            <br />
            If this is your first time using this feature, please click below to install Snyk globally on your machine.
            <br />
          </p>
        </div>
        <br />
        <Button variant='contained' type='button' id={styles.secTestBtn} onClick={snykInstall}>
          Install Snyk
        </Button>
        <div id={styles.secInfo}>
          <p>
            <br />
            Once installed, please click below to be directed to Snyk's website to grant permission to the tool to run in your terminal.
          </p>
        </div>
        <br />
        <Button variant='contained' type='button' id={styles.secTestBtn} onClick={snykAuth}>
          Authenticate
        </Button>
        <br />
        <br />
        <br />
        <Button variant='outlined' type='button' id={styles.secTestBtn} onClick={dependencyTest}>
          Test Dependencies
        </Button>
        <br />
        <br />
        <Button variant='outlined' type='button' id={styles.secTestBtn} onClick={snykWizard}>
          Fix Dependencies
        </Button>
        <br />
        <br />
        <br />
        <br />
        <p id={styles.secInfo}>
          To utilize Snyk's application-wide testing tool, Snyk Code must be enabled.
          <br />
          The below button will send you to Snyk's website to update your settings.
        </p>
        <br />
        <Button variant='contained' type='button' id={styles.secTestBtn} onClick={enableSnykCode}>
          Enable Snyk Code
        </Button>
        <br />
        <br />
        <Button variant='outlined' type='button' id={styles.secTestBtn} onClick={applicationTest}>
          Test Application
        </Button>
      </section>
    </div>
  )
}

export default SecTestCase;