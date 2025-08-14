import Link from 'next/link';
import styles from '@/app/ui/Navigation/Navigation.module.scss';
import { UserCircleIcon } from '@phosphor-icons/react';
import { SessionData } from '@auth0/nextjs-auth0/types';

export function AccountMenu({ session }: { session: SessionData | null }) {
  return !session ? (
    <Link className={styles.navItem} id="account" href="/auth/login">
      <UserCircleIcon size={24} weight="light" /> Account
    </Link>
  ) : (
    <>
      <div className={styles.navItem} id="account">
        <UserCircleIcon size={24} weight="light" /> Hi {session.user.nickname}
      </div>
      <div className={styles.accountMenu}>
        <ul>
          <li>
            <Link className={styles.subNavItem} id="account" href="/account">
              Account Information
            </Link>
          </li>
          <li>
            <Link className={styles.subNavItem} id="account" href="/listings">
              My Listings
            </Link>
          </li>
          <li>
            <Link className={styles.subNavItem} id="account" href="/venues">
              My Venues
            </Link>
          </li>
          <li>
            <Link
              className={styles.subNavItem}
              id="log-out"
              href="/auth/logout"
            >
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
