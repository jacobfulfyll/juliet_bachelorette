import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${inter.variable} ${playfair.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
