import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import MockYoutube from '../api/mock-youtube';
import Youtube from '../api/youtube';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<Video[]>({
    queryKey: ['videos', keyword],
    queryFn: () => {
      const youtube = new Youtube();
      // const youtube = new MockYoutube();
      return youtube.search(keyword);
    },
  });
  return (
    <>
      <div className=''>Videos {keyword ?? '🔥'}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
