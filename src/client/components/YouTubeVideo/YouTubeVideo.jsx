import "./YouTubeVideo.scss";

export function YouTubeVideo({ link }) {
  return (
    <div className="youTubeVideo">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${link}?enablejsapi=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
