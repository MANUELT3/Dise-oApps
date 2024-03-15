import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

export default function ApiBtc(){

    const [response, setResponse]= useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        fetch()
        .then(res => res.json())
        .then(result => {
            setResponse(result);
            setIsLoading(false);
        }, error =>{
            setError(error);
            setIsLoading(false);

        })
    },[]);     

    const getContents=()=>{
        if (isLoading) {
            return(
                <View>
                    <Text style={styles.textSize} >Loading Data</Text>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
        if (error) {
            return <Text>{error}</Text>
        }

        return(
            <View>
            <Text>Btc to USD: {response["bpi"]["usd"].rate}</Text>
            </View>  
        );
    }

    return(
        <View>
            {getContents()}
        </View>
    );

    const styles = StyleSheet.create({
        textSize:{
            
        }
    })

    
}