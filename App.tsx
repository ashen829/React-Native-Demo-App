import React from "react";
import { Button, Text, View } from "react-native";
import HomePage from "./src/screens/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddVehiclePage from "./src/screens/AddVehiclePage";
import VehicleListingPage from "./src/screens/VehicleListingPage";
import AddModelPage from "./src/screens/AddModelPage";
import ViewVehicle from "./src/screens/ViewVehicle";
import EditVehicle from "./src/screens/EditVehicle";

const Stack = createNativeStackNavigator();

const App = () =>{
  console.log('HomePage rendered!');
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#008CBA',
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{title:'Welcome', headerShown : false}}
      />
      <Stack.Screen
        name="Search Vehicle"
        component={VehicleListingPage}
        options={{title:'Search Vehicle'}}
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
      <Stack.Screen
        name="View Vehicle"
        component={ViewVehicle}
        options={{title:'View Vehicle'}}
      />
      <Stack.Screen
        name="Edit Vehicle"
        component={EditVehicle}
        options={{title:'Edit Vehicle'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;