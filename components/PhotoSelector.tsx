import React from "react";
import { Button, ScrollView, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface PhotoSelectorProps {
  images: string[]; // Accept images as a prop
  setImages: React.Dispatch<React.SetStateAction<string[]>>; // Accept setImages to update the images
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({ images, setImages }) => {
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Set to false as multiple selection is not supported
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  return (
    <>
      <Button title="Select Photos" onPress={pickImages} />
      <ScrollView horizontal style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default PhotoSelector;
