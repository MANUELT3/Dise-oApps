import { StyleSheet, Image } from "react-native";

export default function ImageViewer({PlaceholderImageSource, selectedImage}){
  const imageSource = selectedImage ? {uri:selectedImage} : PlaceholderImageSource;
    return(
      <Image style={styles.image} source={imageSource}/>
    );

}

const styles = StyleSheet.create({
    image:{
      width: 320,
      height: 440,
      borderRadius: 18,
    },
  });