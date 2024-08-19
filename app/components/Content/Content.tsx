import React from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

interface ContentProps {
  paramId: string;
  isPhilosophy?: boolean;
}

const Content: React.FC<ContentProps> = ({ paramId, isPhilosophy }) => {
  return (
    <div>
      <AudioPlayer paramId={paramId} />
    </div>
  );
};

export default Content;
