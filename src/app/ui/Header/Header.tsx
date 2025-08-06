import styles from './Header.module.scss';
import Navigation from '@/app/ui/Navigation/Navigation';

export default function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.siteName}>
        <span className={styles.city}>NYC</span> Poetry Calendar
      </span>
      <Navigation />
    </div>
  );
}
