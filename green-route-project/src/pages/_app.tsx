import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from '@/context/AppContext';
import { APIProvider } from '@vis.gl/react-google-maps'; // <-- import APIProvider
import '../styles/map.css';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </APIProvider>
  );
}
