import React from "react";
import { Button } from "react-native";
import { RNFFmpeg } from "react-native-ffmpeg";
import * as FileSystem from "expo-file-system";

interface VideoExporterProps {
  images: string[];
  setVideoPath: React.Dispatch<React.SetStateAction<string | null>>;
}

const VideoExporter: React.FC<VideoExporterProps> = ({
  images,
  setVideoPath,
}) => {
  const createVideo = async () => {
    const imageInputs = images
      .map((uri, index) => `-loop 1 -t 2 -i ${uri}`)
      .join(" ");
    const filters = images
      .map((_, index) =>
        index < images.length - 1
          ? `[${index}:v][${
              index + 1
            }:v]xfade=transition=fade:duration=1:offset=2[v${index + 1}];`
          : ""
      )
      .join("");

    const command = `
      ${imageInputs} 
      -filter_complex "${filters}" 
      -map "[v${images.length - 1}]" -r 30 -pix_fmt yuv420p output.mp4
    `;

    const result = await RNFFmpeg.execute(command);
    if (result === 0) {
      const fileUri = FileSystem.documentDirectory + "output.mp4";
      await FileSystem.copyAsync({
        from: "output.mp4",
        to: fileUri,
      });
      setVideoPath(fileUri);
      console.log("Video created and saved at:", fileUri);
    } else {
      console.error("Error while creating video", result);
    }
  };

  return (
    <Button
      title="Create Video"
      onPress={createVideo}
      disabled={images.length < 2}
    />
  );
};

export default VideoExporter;
