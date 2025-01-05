import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to play the video when component mounts
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          // Log video properties
          console.log('Video properties:', {
            duration: videoRef.current.duration,
            currentTime: videoRef.current.currentTime,
            paused: videoRef.current.paused,
            muted: videoRef.current.muted,
            volume: videoRef.current.volume,
            readyState: videoRef.current.readyState
          });

          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log('Video playback started successfully');
          }
        }
      } catch (err) {
        console.error('Error playing video:', err);
        setError('Error playing video');
      }
    };

    playVideo();

    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <p className="text-white">Loading video...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => {
          console.log('Video loaded successfully');
          setIsLoading(false);
          
          // Try to play again after load
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => console.log('Playback started after load'))
              .catch(e => console.error('Playback failed after load:', e));
          }
        }}
        onPlay={() => console.log('Video play event triggered')}
        onPause={() => console.log('Video paused')}
        onError={(e) => {
          console.error('Video error:', e);
          setError('Error loading video');
          setIsLoading(false);
        }}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ minHeight: '100vh' }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default VideoBackground;