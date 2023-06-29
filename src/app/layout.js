import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: `Test website`,
    description: `Test website description`,
}

const RootLayout = async props => {

    const {
        children,
    } = props;

    const session = cookies().get('session');

    return (
        <html lang="en">
            <body className={inter.className}>

                <Providers session={session}>

                    {children}

                </Providers>

            </body>
        </html>
    );

}

export default RootLayout;