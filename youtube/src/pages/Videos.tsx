import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword } = useParams();
  const youtubeApi = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<Video[]>({
    queryKey: ['videos', keyword],
    queryFn: () => youtubeApi!.search(keyword),
  });
  return (
    <>
      <div className=''>Videos {keyword ?? '🔥'}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong {error.message}</p>}
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
