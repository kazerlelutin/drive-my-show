import { useState } from "react";
import Media from "../../interfaces/medias.interface";
import MediaPreview from "../MediaPreview/MediaPreview";

interface props {
  readonly media: Media;
  readonly token: string;
}

export default function MediasTitleForBroadcast({ media, token }: props) {
  const [isOpen, setIsOpen] = useState<Media | "clear">(undefined);

  return (
    <>
      {isOpen && (
        <MediaPreview
          media={isOpen}
          token={token}
          onClose={() => setIsOpen(undefined)}
        />
      )}
      <div onClick={()=>setIsOpen(media)}>{media.title}</div>
    </>
  );
}
