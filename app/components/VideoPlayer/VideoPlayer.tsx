"use client";
import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { Time } from "@vidstack/react";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { FullscreenButton } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
  useMediaStore,
} from "@vidstack/react";
import { FullscreenExitIcon, FullscreenIcon } from "@vidstack/react/icons";
import { TimeSlider } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

import "./VideoPlayer.css";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VideoPause from "@/app/svgs/VideoIcon/VideoPause";
import VideoPlay from "@/app/svgs/VideoIcon/VideoPlay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Setting from "@/app/svgs/Setting";
import Chevronlefticon from "@/app/svgs/Chevronlefticon";
import VideoBack from "@/app/svgs/VideoIcon/VideoBack";
import VideoNext from "@/app/svgs/VideoIcon/VideoNext";
import CrossIcon from "@/app/svgs/CrossIcon";
import { ContentItem } from "@/lib/store/slices/libraryapi";

interface propsType {
  contentUrl: string;
  nextMedia?: ContentItem;
}

const VideoPlayer = ({ contentUrl, nextMedia }: propsType) => {
  const [showIcons, setShowIcons] = useState<boolean>(true);
  const player = useRef<MediaPlayerInstance>(null);
  const isReady = useRef<boolean>(false);
  const { qualities, quality, autoQuality, canSetQuality, playing } =
    useMediaStore(player);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleQualityChange = (event: MouseEvent, index: number) => {
    event.stopPropagation();
    toggleDialog();

    console.log(canSetQuality, player?.current, player?.current?.qualities);

    if (
      canSetQuality &&
      player?.current &&
      Array.isArray(player?.current?.qualities) &&
      typeof player.current.qualities[index]?.selected === "boolean"
    ) {
      console.log("iniside if block");
      player.current.qualities[index].selected = true;
    }
  };

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
  }, [playing, showIcons]);

  useEffect(() => {
    const callback = () => {
      isReady.current = true;
    };
    player.current?.addEventListener("can-play", callback);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      player.current?.removeEventListener("can-play", callback);
    };
  }, []);

  return (
    <div onClick={handleVideoClick} onTouchEnd={handleVideoClick}>
      <AspectRatio className="relative" ratio={1 / 1}>
        <MediaPlayer
          src={contentUrl && `${process.env.NEXT_PUBLIC_CDN}/${contentUrl}`}
          viewType="video"
          streamType="on-demand"
          aspectRatio="1/1"
          logLevel="warn"
          crossOrigin
          playsInline
          ref={player}
          fullscreenOrientation="landscape"
          className="h-full object-cover"
          onEnd={() => {
            setShowOverlay(true);
            setShowIcons(true);
          }}
        >
          {quality && (
            <div className="absolute top-[1.3rem] right-[1.3rem] z-30">
              <div
                className="w-[2.4rem] text-white h-[2.4rem]"
                onClick={toggleDialog}
              >
                <Setting />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[360px] overflow-hidden z-50 h-max p-0 gap-0">
                  <div className="flex items-center p-4 gap-3">
                    <h2 className="font-bold text-[1.8rem]">
                      Streaming quality
                    </h2>
                    <p className="text-[1.6rem] mt-2 font-normal text-grey60">
                      {autoQuality ? "Auto" : `${quality?.height}p`}
                    </p>
                  </div>
                  <div className="mb-3">
                    <hr className="h-1 bg-grey20 border-0" />
                  </div>
                  <div
                    className="p-4 flex gap-[1.4rem]"
                    onClick={() => {
                      if (player.current?.qualities) {
                        player.current.qualities.autoSelect();
                        toggleDialog();
                      }
                    }}
                  >
                    <span className="text-[1.6rem] font-semibold">
                      Auto <span className="text-grey60">(recommended)</span>
                    </span>
                    {autoQuality && <CheckIcon />}
                  </div>
                  <div>
                    <p className="text-[1.4rem] p-4 font-normal text-grey60">
                      Adjusts with internet speed to give you the best
                      experience
                    </p>
                  </div>
                  {qualities.map((val, index) => (
                    <div
                      key={val?.height}
                      className="p-5 flex  items-center gap-[1.6rem] text-[1.6rem] font-bold"
                      onClick={(event) => handleQualityChange(event, index)}
                    >
                      <span>{val?.height}p</span>
                      {!autoQuality && quality?.height === val.height && (
                        <CheckIcon />
                      )}
                    </div>
                  ))}
                </DialogContent>
              </Dialog>
            </div>
          )}

          <div
            className={`absolute text-white font-bold text-[1.8rem] top-[1.3rem] left-0 right-0 text-center z-10`}
          >
            <span>Library</span>
          </div>

          <MediaProvider className="relative bg-black">
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
                if (!isReady.current) return;
                if (player.current?.paused) {
                  player.current.play();
                } else if (player.current) {
                  player.current?.pause();
                }
              }}
            >
              <div className="w-[5rem] h-[5rem]">
                {playing ? <VideoPlay /> : <VideoPause />}
              </div>
            </Button>

            <TimeSlider.Root
              className={`group absolute bottom-0 inline-flex h-10 w-full cursor-pointer z-50  items-center outline-none justify-center ${
                showIcons ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <div className="mx-[1.2rem] w-full">
                <TimeSlider.Track className="relative h-[0.4rem] w-full rounded-full bg-white ">
                  <TimeSlider.TrackFill className="bg-primary60 absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
                  <TimeSlider.Progress className="absolute z-10 h-full w-[var(--slider-progress)]  will-change-[width]" />
                </TimeSlider.Track>
              </div>
            </TimeSlider.Root>

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

              <div className="text-white">
                <FullscreenButton className="group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none aria-hidden:hidden">
                  <FullscreenIcon className="w-8 h-8 group-data-[active]:hidden" />
                  <FullscreenExitIcon className="w-8 h-8 hidden group-data-[active]:block" />
                </FullscreenButton>
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
                    className="border-[0.5px] object-cover w-[14rem] h-[8rem] border-white rounded-[8px] bg-black"
                  />
                )}
              </div>
              <div>
                <p className="text-white text-[1.6rem] pb-[4px] font-bold leading-tight">
                  {nextMedia?.title}
                </p>
                {/* <span className="text-grey50 text-[1.4rem] leading-none font-normal">
                  12:50
                </span> */}
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

export default VideoPlayer;
