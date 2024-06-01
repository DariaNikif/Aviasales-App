import Logo from '../Logo/Logo'
import AviaFilters from '../AviaFilters/AviaFilters'
import SortButtons from '../ButtonFilters/ButtonFilters'
import TicketsList from '../TicketsList/TicketsList'

import styles from './App.module.scss'

function App() {
  return (
    <section className={styles['app-wrapper']}>
      <Logo />
      <section className={styles.main}>
        <AviaFilters />
        <div className={styles['avia-content']}>
          <SortButtons />
          <TicketsList />
        </div>
      </section>
    </section>
  )
}

export default App
