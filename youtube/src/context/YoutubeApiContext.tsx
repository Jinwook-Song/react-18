import { createContext, useContext } from 'react';
import Youtube, { YoutubeApi } from '../api/youtube';
import MockYoutubeClient from '../api/mockYoutubeClient';
import YoutubeClient from '../api/youtubeClient';

export const YoutubeApiContext = createContext<YoutubeApi | undefined>(
  undefined,
);

const useMockData = false;
const client = useMockData ? new MockYoutubeClient() : new YoutubeClient();

// DI
const youtube = new Youtube(client);

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
