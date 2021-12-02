import React, { useReducer } from 'react';
import styles from './App.module.scss';
import { GlobalContext, globalState, globalReducer } from './context/reducers/globalReducer';
import ProjectLoader from './pages/ProjectLoader/ProjectLoader.jsx';
// import NavBar from './components/NavBar/NavBar';
// import LeftPanel from './pages/LeftPanel/LeftPanel';
// import RightPanel from './pages/RightPanel/RightPanel';
// import About from './pages/About/About';

const App = () => {
  const [global, dispatchToGlobal] = useReducer(globalReducer, globalState);

  if (!global.isProjectLoaded) {
    return (
      <div>
        {/* pass global state and dispatch function as prop to context provider for child components */}
        <GlobalContext.Provider value={[global, dispatchToGlobal]}>
          {/* <ProjectLoader /> */}
          <ProjectLoader/>
        </GlobalContext.Provider>
      </div>
    );
  }
  // return (
  // /**
  //      * Wrap the components that we want to share the unique states with.
  //      * You can only provide one value to a Provider.
  //      *  - In order to avoid creating separate Contexts, wrap multiples in an array (ex: testCase and dispatchToTestCase).
  //      *
  //      *
  //      * NOTE: This concept is similar to Redux and how it provides the store to your top-level component and all of its children.
  //      * We just have to create separate providers for each reducer because we don’t have a global store ala Redux.
  //      *
  //      *
  //      * We access the value that we gave to the Provider through useContext
  //      */
  //   <div
  //     id={
  //         global.isProjectLoaded === 'about'
  //           ? ''
  //           : global.isFileDirectoryOpen
  //             ? global.isRightPanelOpen
  //               ? styles.fileDirectoryOpenRightPanelOpen
  //               : styles.fileDirectoryOpenRightPanelClosed
  //             : global.isRightPanelOpen
  //               ? styles.fileDirectoryClosedRightPanelOpen
  //               : styles.fileDirectoryClosedRightPanelClosed
  //       }
  //   >
  //     <GlobalContext.Provider value={[global, dispatchToGlobal]}>
  //       {global.isProjectLoaded === 'about' ? (
  //         <>
  //           <NavBar inAboutPage />
  //           <About dispatch={dispatchToGlobal} />
  //           {' '}
  //         </>
  //       ) : (
  //         <>
  //           <NavBar inAboutPage={false} />
  //           <LeftPanel />
  //         </>
  //       )}
  //       {global.isRightPanelOpen ? <RightPanel /> : ''}
  //     </GlobalContext.Provider>
  //   </div>
  // );
};

export default App;
