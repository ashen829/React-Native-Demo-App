import React from "react";
import { Button, Text, View } from "react-native";
import HomePage from "./src/screens/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddVehiclePage from "./src/screens/AddVehiclePage";
import VehicleListingPage from "./src/screens/VehicleListingPage";
import AddModelPage from "./src/screens/AddModelPage";

const Stack = createNativeStackNavigator();

const App = () =>{
  console.log('HomePage rendered!');
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{title:'Welcome'}}
      />
      <Stack.Screen
        name="Search Vehicle"
        component={VehicleListingPage}
        options={{title:'Add Your Vehicle'}}
      />
      <Stack.Screen
        name="Add Vehicle"
        component={AddVehiclePage}
        options={{title:'Add Your Vehicle'}}
      />
      <Stack.Screen
        name="Add Make/Models"
        component={AddModelPage}
        options={{title:'Add Make and Models'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;