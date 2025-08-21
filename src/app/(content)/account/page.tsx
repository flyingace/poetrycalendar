'use server';

import { signup } from '@/app/actions/auth';
import { SessionData } from '@auth0/nextjs-auth0/types';
import { auth0 } from '@/lib/auth0';

export default async function AccountPage() {
  const session: SessionData | null = await auth0.getSession();
  console.log(JSON.stringify(session));
  console.log('sub: ', session?.sub);
  return (
    <div>
      <h1>Account</h1>

      <form action={signup}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="email">Organization</label>
          <input
            id="organization"
            name="organization"
            placeholder="Organization"
          />
        </div>
        <div>
          <input type="checkbox" id="terms" name="terms" /> By selecting this
          box I am indicating that I have read and agree to the Terms of Service
          and Privacy Policy.
        </div>
        {/*<input type="hidden" name="account" value={session.sub} />*/}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
