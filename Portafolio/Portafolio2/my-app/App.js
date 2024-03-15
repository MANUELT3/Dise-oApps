import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from './components/ImageViewers.js';
import Button from "./components/Button.js";
import CircleButton from "./components/CircleButton.js";
import IconButtons from "./components/IconButtons.js";

const PlaceholderImage = require("./assets/img/icon.png")
export default function App() {
  const[showAppOptions, setShowAppOptions] = useState(false);
  const[selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      //console.log(result)
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);     
    }else{
      alert("You did not select any image");
    }
  }

const onReset = () => {
  setShowAppOptions(false);
}

const onAddSticker = () => {

}

const onSaveImageAsync = async () => {

}

  return (
    <View style={styles.container}>
      <View style={styles.image_Container}>
        <ImageViewer selectedImage={selectedImage} PlaceholderImageSource={PlaceholderImage}/>
      </View>

      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButtons icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton />
            <IconButtons icon="save-alt" label="save" onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
      <View style={styles.footer_Container}>
        <Button onPress={pickImageAsync} theme="primary" label="Choose a photo"/>
        <Button onPress={()=> setShowAppOptions(true)} label="Use this photo"/>
      </View>
        )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e4053",
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 200,
  },
  textpromps: {
    color: "#fff",
  },
  image_Container:{
    flex: 1,
    paddingtop: 58,
  },
  footer_Container:{
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionContainer:{
    position: 'absolute',
    bottom: 80,
  },
  optionRow:{
    alignItems: 'center',
    flexDirection:'row',
  },
});

