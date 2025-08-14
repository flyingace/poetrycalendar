import Header from '@/app/ui/Header/Header';
import styles from './layout.module.scss';
import { auth0 } from '@/lib/auth0';
import { SessionData } from '@auth0/nextjs-auth0/types';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: SessionData | null = await auth0.getSession();
  return (
    <div className={styles.layout}>
      <Header session={session} />
      {children}
      <div className={styles.boxes}>
        <span className={styles.orangeBox}></span>
        <span className={styles.blueBox}></span>
        <span className={styles.violetBox}></span>
      </div>
    </div>
  );
}
