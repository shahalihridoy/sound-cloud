import React from "react";
import {
  PlayButton,
  Progress,
  Timer,
  VolumeControl,
  Cover,
  NextButton,
  PrevButton
} from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";

// you can even use functional components!
export const SoundPlayer = withCustomAudio(props => {
  const { soundCloudAudio, track } = props;

  const handleNextClick = () => {
    soundCloudAudio.audio.volume = 0.2;

    // console.log(soundCloudAudio.pause());
    // soundCloudAudio.audio.currentTime = 240;
    // console.log(props);
    // soundCloudAudio.audio.currentTime = 240;
    // soundCloudAudio.audio.volume = 0.2;

    console.log(soundCloudAudio);
  };

  return (
    <div>
      <Cover
        trackName={track.title}
        backgroundUrl={
          track.imgUrl && track.imgUrl != "/"
            ? `"${track.imgUrl}"`
            : "/assets/images/bg-1.jpg"
        }
        artistName={track.username}
      />
      <div className="flex flex-middle flex-space-between">
        <PrevButton {...props} />
        <PlayButton {...props} />
        <NextButton onNextClick={handleNextClick} />
        <Progress {...props} />
        <Timer className="sb-soundplayer-timer pre pl-16" {...props} />
        <VolumeControl className="flex flex-middle" {...props} />
      </div>
    </div>
  );
});
