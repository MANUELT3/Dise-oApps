import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";

const url = "https://pokeapi.deno.dev/pokemon";

export default function Pokedex() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoading(false);
          setData(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  console.log(data);

  const getContent = () => {
    if (isLoading) {
      return (
        <View>
          <Text style={StyleSheet.text}>Loading data...</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <View>
        <FlatList
          showsVerticalScroll={true}
          data={data}
          renderItem={({ item }) => (
            <View>
              
              <Image style={styles.image} source={{uri: item.imageUrl}}></Image> 
              <Text style={styles.text}>Pokemon: {item.name}</Text>
              <Text>Genus: {item.genus}</Text>
              <Text>Type: {item.types}</Text>
              {/* <Text>Abilitis: {item.abilitis["name"]}</Text> */}
              <Text>Description: {item.description}</Text>
              <Text>Stats-HP: {item.stats.HP}</Text>
              {/* <Text>Locations: {item.locations}</Text> */}
              
            </View>
          )}
        />
      </View>
    );
  };

  return <View>{getContent()}</View>;
}

const styles = StyleSheet.create({
  textProps: {
    fontSize: 36,
  },
  text: {
    fontSize: 20,
  },
  image:{
    width: 100,
    height: 100,
  },
});