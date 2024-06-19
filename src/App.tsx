import styles from './App.module.scss'
import Header from './components/Header/Header'
import SideMenu from './components/SideMenu/SideMenu'
import Workspace from './components/Workspace/Workspace'

function App() {
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
