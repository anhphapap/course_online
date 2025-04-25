import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Lesson from "./components/Home/Lesson";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import { Icon } from "react-native-paper";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: "Danh sách khóa học" }}
      ></Stack.Screen>
      <Stack.Screen
        name="lesson"
        component={Lesson}
        options={{ title: "Danh sách bài học" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="index"
        component={StackNavigator}
        options={{ tabBarIcon: () => <Icon size={30} source="home" /> }}
      />
      <Tab.Screen
        name="login"
        component={Login}
        options={{ tabBarIcon: () => <Icon size={30} source="account" /> , headerShown: true }}
      />
      <Tab.Screen
        name="register"
        component={Register}
        options={{ tabBarIcon: () => <Icon size={30} source="account-plus" />, headerShown: true }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
