'use client';

import { MouseEvent } from 'react';
import styles from './Navigation.module.scss';
import {
  CalendarDotsIcon,
  PlusSquareIcon,
  StorefrontIcon,
  SunIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { AccountMenu } from '@/app/ui/Navigation/AccountMenu';
import { SessionData } from '@auth0/nextjs-auth0/types';

export default function Navigation({
  session,
}: {
  session: SessionData | null;
}) {
  function handleClick(evt: MouseEvent<HTMLButtonElement>) {
    console.log(`${evt.currentTarget.id} was clicked`);
  }

  return (
    <nav>
      <ul className={styles.navItems}>
        <li>
          <Link className={styles.navItem} id="listings" href="/listings">
            <CalendarDotsIcon size={24} weight="light" /> Listings
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link className={styles.navItem} id="create" href="/create">
                <PlusSquareIcon size={24} weight="light" /> Create
              </Link>
            </li>
            <li>
              <Link className={styles.navItem} id="venues" href="/venues">
                <StorefrontIcon size={24} weight="light" /> Venues
              </Link>
            </li>
          </>
        ) : null}
        <li>
          <AccountMenu session={session} />
        </li>
        <li>
          <button id="mode" onClick={handleClick}>
            <SunIcon size={24} weight="light" />
            {/*<Moon size={24} weight="light" />*/}
          </button>
        </li>
      </ul>
    </nav>
  );
}
