import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

interface VideoPreviewProps {
  images: string[];
}

const { width } = Dimensions.get("window");

const VideoPreview: React.FC<VideoPreviewProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleGestureEvent = (event) => {
    const { translationX, state } = event.nativeEvent;

    if (state === State.END) {
      const threshold = width / 3;
      const newIndex =
        translationX < -threshold
          ? Math.min(currentIndex + 1, images.length - 1)
          : translationX > threshold
          ? Math.max(currentIndex - 1, 0)
          : currentIndex;

      translateX.value = withTiming(-width * newIndex, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });

      setCurrentIndex(newIndex);
    }
  };

  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewTitle}>Preview</Text>
      {/* <PanGestureHandler onGestureEvent={handleGestureEvent}> */}
      <Animated.View
        style={[
          styles.imageContainer,
          { width: width * images.length },
          animatedStyle,
        ]}
      >
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Animated.Image source={{ uri }} style={styles.previewImage} />
          </View>
        ))}
      </Animated.View>
      {/* </PanGestureHandler> */}
      <Text style={styles.indexIndicator}>
        {currentIndex + 1} / {images.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  imageWrapper: {
    width: width,
  },
  previewImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  indexIndicator: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
});

export default VideoPreview;
