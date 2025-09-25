// components/VideoSection.tsx

import React from "react";

interface VideoSectionProps {
  videoUrl: string;
  title?: string;
  description?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoUrl,
  title,
  description,
}) => {
  // Convert a standard YouTube link to embed URL
  const getEmbedUrl = (url: string) => {
    const match = url.match(/youtu(?:\.be|be\.com)\/(watch\?v=)?(.+)/);
    if (match && match[2]) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className="w-full bg-gray-100 py-12 px-4 md:px-8">
      {title && (
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-6 text-primary">{title}</h2>
      )}
      {description && (
        <p className="text-center text-lg text-gray-700 mb-8">{description}</p>
      )}
      <div className="w-full aspect-w-32 aspect-h-9 max-w-screen mx-auto">
        <iframe
          src={embedUrl}
          title={title || "Embedded video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full mx-auto min-h-screen rounded-lg shadow-md border border-gray-300"
        />
      </div>
    </section>
  );
};

export default VideoSection;
