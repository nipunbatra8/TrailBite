import * as React from 'react';
// import * as Location from 'expo-location';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
//import {GOOGLE_MAPS_KEY} from '.env';

export default function PlanScreen() {
  const [startPos, setStartPos] = React.useState({
    latitude: 34.191946,
    longitude: -118.105545
  });
  //34.191946, -118.105545

  const [endPos, setEndPos] = React.useState({
    latitude: 34.193617,
    longitude: -118.089992
  });
  //34.193617, -118.089992

  const [myPos, setMyPos] = React.useState({
    latitude: 34.0703,
    longitude: -118.4469
  });
  //34.193617, -118.089992

  return (
    <View style = {styles.container}>
      <MapView 
      style = {styles.map} 
      // provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: startPos.latitude,
        longitude: startPos.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04
      }}>
        <Marker
          draggable
          coordinate={startPos}
          onDragEnd={(direction) => setStartPos(direction.nativeEvent.coordinate)}
        />
        <Marker
          draggable
          coordinate={endPos}
          onDragEnd={(direction) => setEndPos(direction.nativeEvent.coordinate)}
        />
        <Marker
          coordinate={myPos}
          pinColor='blue'
        />
        <MapViewDirections
          origin = {startPos}
          destination = {endPos}
          apikey='AIzaSyAYuqV3KylrCcR56oIwD_AAm4seq52fkps'
          strokeColor='blue'
          strokeWidth={4}
          mode='WALKING'
        />
      </MapView>


    </View>
  )



};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  map: {
    width: '100%',
    height: '100%'
  }

})