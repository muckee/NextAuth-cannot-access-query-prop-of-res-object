'use client';

import { signIn, useSession } from 'next-auth/react';

const Page = async () => {

    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return (<>

        {(!loading && !session) && <Link
            href={'api/auth/signin'}
            onClick={signIn}
        >
            <button type='button'>
                Sign in
            </button>
        </Link>}

    </>);
}

export default Page;

