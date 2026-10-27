import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Fraunces, Nunito } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import '../app/globals.css';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

const body = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${body.variable} min-h-screen font-body text-[#1c1410]`}>
      <Head>
        <title>DogTracker3000</title>
        <meta
          name="description"
          content="DogTracker3000 keeps a running tally of every hot dog you eat."
        />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
