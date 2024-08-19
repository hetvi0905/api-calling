"use client";
import React, { useRef, useState, useEffect } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "./audioPlayer.css";
import VideoPause from "@/app/svgs/VideoIcon/VideoPause";
import VideoPlay from "@/app/svgs/VideoIcon/VideoPlay";
import { Time } from "@vidstack/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerInstance,
  useMediaStore,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { TimeSlider } from "@vidstack/react";
import { Button } from "@/components/ui/button";
import Chevronlefticon from "@/app/svgs/Chevronlefticon";
import VideoBack from "@/app/svgs/VideoIcon/VideoBack";
import VideoNext from "@/app/svgs/VideoIcon/VideoNext";
import Image from "next/image";
import Link from "next/link";
import CrossIcon from "@/app/svgs/CrossIcon";
import { ContentItem } from "@/lib/store/slices/libraryapi";
interface propsType {
  contentUrl: string;
  thumbnail: string;
  nextMediaId: string;
}

const AudioPlayer = ({ contentUrl, thumbnail, nextMediaId }: propsType) => {
  const player = useRef<MediaPlayerInstance>(null);
  const [showIcons, setShowIcons] = useState<boolean>(true);
  const { playing } = useMediaStore(player);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [nextMedia, setNextMedia] = useState<ContentItem | null>(null);

  useEffect(() => {
    // Fetch the next media data using the nextMediaId
    const fetchNextMedia = async () => {
      try {
        const response = await fetch(`/api/media/${nextMediaId}`);
        const data = await response.json();
        setNextMedia(data);
      } catch (error) {
        console.error("Failed to fetch next media:", error);
      }
    };

    if (nextMediaId) {
      fetchNextMedia();
    }
  }, [nextMediaId]);

  const handleVideoClick = () => {
    try {
      setShowIcons(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (showIcons) {
      timeoutId = setTimeout(() => {
        setShowIcons(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <div onClick={handleVideoClick} onTouchEnd={handleVideoClick}>
      <AspectRatio className="relative" ratio={1 / 1}>
        <MediaPlayer
          src={contentUrl && `${process.env.NEXT_PUBLIC_CDN}/${contentUrl}`}
          viewType="video"
          streamType="on-demand"
          logLevel="warn"
          crossOrigin
          playsInline
          ref={player}
          className="w-full h-full"
          onEnd={() => {
            setShowOverlay(true);
            setShowIcons(true);
          }}
        >
          <div
            className={`absolute text-white font-bold text-[1.8rem] top-[1.3rem] left-0 right-0 text-center z-10`}
          >
            <span>Library</span>
          </div>

          <MediaProvider className="relative">
            <Poster
              className="absolute w-full h-full object-contain bg-black transition-opacity"
              src={thumbnail && `${process.env.NEXT_PUBLIC_CDN}/${thumbnail}`}
              alt="audio"
            />
            <span
              className={`absolute inset-0 flex w-full h-full justify-center items-center space-x-40 ${
                showIcons ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <Button variant="link" className="w-[6rem] h-[6rem]">
                <VideoBack />
              </Button>
              <Button variant="link" className="w-[6rem] h-[6rem]">
                <VideoNext />
              </Button>
            </span>

            <Button
              className={`absolute  flex items-center z-40  w-[5rem h-[5rem] justify-center inset-0 m-auto cursor-pointer rounded-md outline-none ring-inset bg-white/20 data-[focus]:ring-4 ${
                showIcons ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
              variant="link"
              onTouchEnd={() => {
                if (player.current?.paused) {
                  player.current.play();
                } else {
                  player.current?.pause();
                }
              }}
            >
              <div className="w-[5rem] h-[5rem]">
                {playing ? <VideoPlay /> : <VideoPause />}
              </div>
            </Button>

            {showIcons && (
              <TimeSlider.Root className="group absolute bottom-0 inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none justify-center">
                <div className="mx-4 w-full">
                  <TimeSlider.Track className="relative  h-[0.4rem] w-full rounded-full bg-white ">
                    <TimeSlider.TrackFill className="bg-primary60 absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
                    <TimeSlider.Progress className="absolute z-10 h-full w-[var(--slider-progress)]  will-change-[width]" />
                  </TimeSlider.Track>
                </div>
              </TimeSlider.Root>
            )}
            <div
              className={`absolute bottom-[2.5rem] left-[1.2rem] right-[1.2rem] flex justify-between ${
                showIcons ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <div className="flex items-center text-[1.2rem]">
                <Time className="text-white font-normal" type="current" />
                <div className="mx-1 text-white font-normal">/</div>
                <Time className="text-grey30 font-normal" type="duration" />
              </div>
            </div>
          </MediaProvider>

          <DefaultVideoLayout
            icons={defaultLayoutIcons}
            slots={{
              settingsMenu: null,
              googleCastButton: null,
              captionButton: null,
              airPlayButton: null,
              muteButton: null,
              playButton: null,
              timeSlider: null,
              startDuration: null,
              volumeSlider: null,
              pipButton: null,
              fullscreenButton: null,
              endTime: null,
              currentTime: null,
            }}
          />
        </MediaPlayer>
        {showOverlay && nextMedia?.id && (
          <div className="bg-[#000000E6] flex flex-col justify-center pb-[3.6rem] px-[1.6rem] absolute top-0 bottom-0 left-0 right-0 z-[999999999]">
            <div className="flex mb-[1.2rem] justify-between items-center">
              <span className="text-grey50 text-[1.4rem] leading-none font-normal">
                Next in playlist
              </span>
              <div onClick={() => setShowOverlay(false)}>
                <CrossIcon />
              </div>
            </div>
            <div className="flex mb-[1.7rem] gap-[1.3rem]">
              <div>
                {nextMedia?.thumbnail && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN}/${nextMedia?.thumbnail}`}
                    alt={nextMedia?.title}
                    width={140}
                    height={80}
                    className="border-[0.5px] object-cover w-[14rem] h-[8rem] border-white rounded-[8px]"
                  />
                )}
              </div>
              <div>
                <p className="text-white text-[1.6rem] pb-[4px] font-bold leading-tight">
                  {nextMedia?.title}
                </p>
              </div>
            </div>

            <Button variant={"light"} className="text-black w-full">
              Play now
            </Button>
          </div>
        )}
      </AspectRatio>
    </div>
  );
};

export default AudioPlayer;
