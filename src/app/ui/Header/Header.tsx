import styles from './Header.module.scss';
import Navigation from '@/app/ui/Navigation/Navigation';
import { SessionData } from '@auth0/nextjs-auth0/types';

export default function Header({ session }: { session: SessionData | null }) {
  return (
    <div className={styles.header}>
      <span className={styles.siteName}>
        <span className={styles.city}>NYC</span> Poetry Calendar
      </span>
      <Navigation session={session} />
    </div>
  );
}
