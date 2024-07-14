import { createContext, useContext } from 'react';
import Youtube, { YoutubeApi } from '../api/youtube';
import MockYoutube from '../api/mock-youtube';

export const YoutubeApiContext = createContext<YoutubeApi | undefined>(
  undefined,
);

const useMockData = true;
const youtube = useMockData ? new MockYoutube() : new Youtube();
export function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YoutubeApiContext.Provider value={youtube}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
