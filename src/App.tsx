import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import Workspace from './components/Workspace/Workspace';

import styles from './App.module.scss';
import { smrApi } from './store/api/smr.api';

function App() {
console.log('APP')
  smrApi.useGetTreeRowsQuery();

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <SideMenu />
        <Workspace />
      </div>
    </>
  )
}

export default App
