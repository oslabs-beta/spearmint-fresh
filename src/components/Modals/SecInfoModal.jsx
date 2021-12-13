/*
 * Handles modal that pops up to prompt authentication of Snyk
 *
 */
import React, { } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.module.scss';
import { setTabIndex, openBrowserDocs } from '../../context/actions/globalActions';

// Accordion view
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ipc = require('electron').ipcRenderer;
const os = require('os');

const SecInfoModal = ({
  secModalIsOpen,
  setSecModalIsOpen,
  closeModal
}) => {

  let execute = '\n';
  let authScript = 'snyk auth ';

  if (os.platform() === 'win32') {
    execute = '\r';
    authScript = `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted`;
  }

  // sends user to webpage to authenticate use of snyk in terminal
  const snykAuth = () => {
    ipc.send('terminal.toTerm', `${authScript} ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  const snykCodeEnable = () => {
    ipc.send('terminal.toTerm', ``)
  }

  return (
    <ReactModal
      className={styles.modal}
      isOpen={secModalIsOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={styles.modalCustomOverlay}
      style={{
        content: {
          top: '10%',
          left: '22%'
        },
        overlay: {
          left: '276px',
          minWidth: '600px',
          width: 'calc(55% - 161px)'
        }
      }}
    >
      {/* Modal Title */}
      <div id={styles.title}>
        <p style={{ fontSize: 20 }}>Enable Snyk</p>
      </div>
      {/* Accordion View */}
      <div>
        {/* Authentication Guide */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panella-header'
            id={styles.accordionSummary}
          >
            Authenticate Snyk on Site
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            <div id={styles.accordionDiv}>
              <pre>
                <div className='code-wrapper'>
                  <code>{authScript}</code>
                </div>
              </pre>
              <Button variant='contained' type='button' id={styles.secTestBtn} onClick={snykAuth}>
                Authenticate Snyk
              </Button>
            </div>
          </AccordionDetails>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panella-header'
            id={styles.accordionSummary}
          >
            Enable Application-Wide Testing
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            <div id={styles.accordionDiv}>
              <pre>
                <div className='code-wrapper'>
                  <code>{authScript}</code>
                </div>
              </pre>
              <Button variant='contained' type='button' id={styles.secTestBtn} onClick={snykAuth}>
                Authenticate Snyk
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </ReactModal>
  )
}