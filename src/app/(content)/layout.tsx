import Header from '@/app/ui/Header/Header';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <div className={styles.boxes}>
        <span className={styles.orangeBox}></span>
        <span className={styles.blueBox}></span>
        <span className={styles.violetBox}></span>
      </div>
    </div>
  );
}
