'use client';

import { MouseEvent } from 'react';
import styles from './Navigation.module.scss';
import {
  CalendarDotsIcon,
  PlusSquareIcon,
  StorefrontIcon,
  SunIcon,
  UserCircleIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';

export default function Navigation() {
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
        <li>
          <Link className={styles.navItem} id="account" href="/account">
            <UserCircleIcon size={24} weight="light" /> Account
          </Link>
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
