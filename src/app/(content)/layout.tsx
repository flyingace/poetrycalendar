import Header from '@/app/ui/Header/Header';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
}
