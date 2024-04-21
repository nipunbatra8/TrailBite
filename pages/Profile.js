import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, ScrollView, RefreshControl } from 'react-native';
import AppleHealthKit from 'react-native-health';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notifee from '@notifee/react-native';
import  { GoogleGenerativeAI } from "@google/generative-ai"
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { FontAwesome6 } from '@expo/vector-icons';

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.ActiveEnergyBurned, AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.Height, AppleHealthKit.Constants.Permissions.Weight, AppleHealthKit.Constants.Permissions.DistanceWalkingRunning, AppleHealthKit.Constants.Permissions.FlightsClimbed],
    write: [],
  },
};

const ProfileScreen = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [calories, setCalories] = useState(0);
  const [steps, setSteps] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBMI] = useState();
  const [distance, setDistance] = useState();
  const [flights, setFlights] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [initialCalories, setInitialCalories] = useState(0);
  const [initialFlights, setInitialFlights] = useState();
  const [initialDistance, setInitialDistance] = useState();


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  async function onDisplayNotification(message) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    const genai = new GoogleGenerativeAI("AIzaSyDpOqUbQKX8YCkWPEoMhjEJ32UW7FaG_Zk");

    const model = genai.getGenerativeModel({ model: "gemini-pro" });

const prompt = message;
// const image = {
//   inlineData: {
//     data: base64EncodedImage /* see JavaScript quickstart for details */,
//     mimeType: "image/png",
//   },
// };

const result = await model.generateContent([prompt]);
console.log(result.response.text());

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: "Some foods you should have now!",
      body: result.response.text(),
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  useEffect(async () => {

    if (Platform.OS !== 'ios') {
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log('Error checking availability');
        return;
      }
      if (!isAvailable) {
        console.log('Apple Health not available');
        return;
      }
      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log('Error getting permissions');
          return;
        }
        setHasPermissions(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const date = new Date();
    const options = {
      startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).toISOString(), // required
      // endDate: new Date().toISOString(), // optional; default now
      // ascending: true, // optional
      // includeManuallyAdded: true, // optional
    };

    AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps');
        return;
      }
      let added = 0;
      results.forEach(element => {
        added += element.value;
      });
      setCalories(Math.floor(added));
    });

    AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          console.log('Error getting the steps');
          return;
        }
        setSteps(results.value);
      });

    AppleHealthKit.getLatestHeight(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      setHeight(Math.floor(results.value));
    });

    AppleHealthKit.getLatestWeight(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      setWeight(results.value);
    });

    setBMI(Math.round(weight/(height*height)*703));

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      setFlights(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      setDistance(Math.floor(results.value*100/1609.34)/100);
    });

    const interval = setInterval(() => {
    if (!hasPermissions) {
      return;
    }

    const date = new Date();
    const options = {
      startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).toISOString(), // required
      // endDate: new Date().toISOString(), // optional; default now
      // ascending: true, // optional
      // includeManuallyAdded: true, // optional
    };

    AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps');
        return;
      }
      let added = 0;
      results.forEach(element => {
        added += element.value;
      });
      if (added > 2300) {onDisplayNotification("What are some good backingpacking foods that are high in Protiens, Total Fats, Electrolytes? Consider all macros!");}
      setCalories(Math.floor(added));
    });

    AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          console.log('Error getting the steps');
          return;
        }
        setSteps(results.value);
      });

    AppleHealthKit.getLatestHeight(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      setHeight(Math.floor(results.value));
    });

    AppleHealthKit.getLatestWeight(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      setWeight(results.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      if (flights > 7) {onDisplayNotification("What are some good backingpacking foods that are high in Carbohydrates, Electrolytes, Sugars? Consider all macros!");}
      setFlights(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log('Error getting the steps:', err);
        return;
      }
      if (distance > 1.5) {onDisplayNotification("What are some good backingpacking foods that are high in Carbohydrates, Total Fats and consider all the macros?");}
      setDistance(Math.floor(results.value*100/1609.34)/100);
    });

    // onDisplayNotification();
    // () => onDisplayNotification();
  //   if(calories - initialCalories > 130){
  //     if (flights - initialFlights > 2){
  //         params = "Carbohydrates, Protiens, Electrolytes, Sugars";
  //         () => onDisplayNotification();
  //     }
  //     else if(distance - initialDistance > 1.3){
  //         params = "Carbohydrates, Total Fats";
  //         () => onDisplayNotification();
  //     }
  //     else{
  //         params = "Protiens, Total Fats, Electrolytes";
  //         console.log("hello");
  //         () => onDisplayNotification();
  //     }
  //   setInitialCalories(calories);
  //   setInitialDistance(distance);
  //   setInitialFlights(flights);
  // }

  }, 30000);
  }, [hasPermissions]);

  

  return (
    <ScrollView
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#545353" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      {/* <Text>Profile Screen</Text> */}
      <View style={{flexDirection:'row', height: "20%"}}>
        <TouchableOpacity onPress={() => onDisplayNotification()} style={{ shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, backgroundColor:"#121212", width: "60%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          {/* <FontAwesome5 name="running" size={24} color="white" /> */}
          <Text style={{color: "#fff", marginTop: "5%", fontFamily: "Helvetica Neue", fontSize: 18, fontWeight: "600", textAlign: "center"}}>Active Calories Burnt: </Text>
          <Text style={{marginTop: "5%", marginBottom:"5%", color: "#fff", fontFamily: "Helvetica Neue", fontSize: 26, fontWeight: "600", textAlign: "center"}}>{calories}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, backgroundColor:"#121212", marginLeft: "5%", width: "30%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          {/* <Ionicons name="footsteps" size={24} color="white" /> */}
          <Text style={{color: "#fff", marginTop: "5%", fontFamily: "Helvetica Neue", fontSize: 18, fontWeight: "600", textAlign: "center"}}>Steps: </Text>
          <Text style={{marginTop: "5%", marginBottom:"5%", color: "#fff", fontFamily: "Helvetica Neue", fontSize: 26, fontWeight: "600", textAlign: "center"}}>{steps}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', height: "20%", marginTop: "5%"}}>
        <TouchableOpacity style={{ shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, backgroundColor:"#121212", width: "28%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          {/* <MaterialCommunityIcons name="human-male-height-variant" size={24} color="white" /> */}
          <Text style={{color: "#fff", marginTop: "5%", fontFamily: "Helvetica Neue", fontSize: 18, fontWeight: "600", textAlign: "center"}}>Height: </Text>
          <Text style={{marginTop: "5%", marginBottom:"5%", color: "#fff", fontFamily: "Helvetica Neue", fontSize: 26, fontWeight: "600", textAlign: "center"}}>{height} in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, backgroundColor:"#121212", marginLeft: "5%", width: "28%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          {/* <FontAwesome6 name="weight-scale" size={24} color="white" /> */}
          <Text style={{color: "#fff", marginTop: "5%", fontFamily: "Helvetica Neue", fontSize: 18, fontWeight: "600", textAlign: "center"}}>Weight: </Text>
          <Text style={{marginTop: "5%", marginBottom:"5%", color: "#fff", fontFamily: "Helvetica Neue", fontSize: 26, fontWeight: "600", textAlign: "center"}}>{weight} lbs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, backgroundColor:"#121212", marginLeft: "5%", width: "28%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          {/* <Ionicons name="speedometer-sharp" size={24} color="white" /> */}
          <Text style={{color: "#fff", marginTop: "5%", fontFamily: "Helvetica Neue", fontSize: 18, fontWeight: "600", textAlign: "center"}}>BMI: </Text>
          <Text style={{marginTop: "5%", marginBottom:"5%", color: "#fff", fontFamily: "Helvetica Neue", fontSize: 26, fontWeight: "600", textAlign: "center"}}>{Math.round(weight/(height*height)*703)}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: "5%", flexDirection:'row', height: "20%"}}>
        <TouchableOpacity style={{ shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, backgroundColor:"#121212", width: "40%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          {/* <MaterialCommunityIcons name="stairs-up" size={24} color="white" /> */}
          <Text style={{color: "#fff", marginTop: "5%", fontFamily: "Helvetica Neue", fontSize: 18, fontWeight: "600", textAlign: "center"}}>Flights Climbed: </Text>
          <Text style={{marginTop: "5%", marginBottom:"5%", color: "#fff", fontFamily: "Helvetica Neue", fontSize: 26, fontWeight: "600", textAlign: "center"}}>{flights}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10, backgroundColor:"#121212", marginLeft: "5%", width: "50%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          {/* <MaterialCommunityIcons name="map-marker-distance" size={24} color="white" /> */}
          <Text style={{color: "#fff", marginTop: "5%", fontFamily: "Helvetica Neue", fontSize: 18, fontWeight: "600", textAlign: "center"}}>Distance Walked: </Text>
          <Text style={{marginTop: "5%", marginBottom:"5%", color: "#fff", fontFamily: "Helvetica Neue", fontSize: 26, fontWeight: "600", textAlign: "center"}}>{distance} miles</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
