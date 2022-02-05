import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { TestContext } from '../../App';

export default function HomeScreen(props) {
  const {user} = useContext(TestContext)
  return (
    <View>
      <Text>Home Screen, hello {user.fullname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#FFFFFF"
    }
});
