import BackgroundMusicPlayer from "@/components/BackgroundMusicPlayer";
import PhotoSelector from "@/components/PhotoSelector";
import VideoExporter from "@/components/VideoExporter";
import VideoPreview from "@/components/VideoPreview";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Feature1Screen() {
  const [images, setImages] = useState<string[]>([]);
  const [videoPath, setVideoPath] = useState<string | null>(null);
  console.log("Images", images);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Photo Sequence Video</Text>
      <Text style={styles.subTitle}>Require Native modolues for this</Text>
      <PhotoSelector images={images} setImages={setImages} />
      {images.length > 0 && (
        <>
          <VideoPreview images={images} />
          <BackgroundMusicPlayer />
          {/* <VideoExporter images={images} setVideoPath={setVideoPath} /> */}
        </>
      )}
      {videoPath && <Text>Video saved at: {videoPath}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingTop: 200,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
});
