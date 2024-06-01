import companyLogo from '../../Assets/Logo.svg'

import styles from './Logo.module.scss'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={companyLogo} alt="logo" />
    </div>
  )
}
