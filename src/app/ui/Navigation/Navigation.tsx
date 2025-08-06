'use client';

import { MouseEvent } from 'react';
import styles from './Navigation.module.scss';
import {
  CalendarDots,
  PlusSquare,
  Storefront,
  Sun,
  UserCircle,
} from '@phosphor-icons/react';

export default function Navigation() {
  function handleClick(evt: MouseEvent<HTMLButtonElement>) {
    console.log(`${evt.currentTarget.id} was clicked`);
  }

  return (
    <nav>
      <ul className={styles.navItems}>
        <li>
          <button id="events" onClick={handleClick}>
            <CalendarDots size={24} weight="light" /> Events
          </button>
        </li>
        <li>
          <button id="create" onClick={handleClick}>
            <PlusSquare size={24} weight="light" /> Create
          </button>
        </li>
        <li>
          <button id="venues" onClick={handleClick}>
            <Storefront size={24} weight="light" /> Venues
          </button>
        </li>
        <li>
          <button id="account" onClick={handleClick}>
            <UserCircle size={24} weight="light" /> Account
          </button>
        </li>
        <li>
          <button id="mode" onClick={handleClick}>
            <Sun size={24} weight="light" />
            {/*<Moon size={24} weight="light" />*/}
          </button>
        </li>
      </ul>
    </nav>
  );
}
