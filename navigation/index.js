import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "native-base";
import AccountScreen from "../screens/AccountScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import Calendar from "../screens/Tabs/CalendarTab";
import Classes from "../screens/Tabs/ClassesTab";
import HomeTab from "../screens/Tabs/HomeTab";
import TabTwoScreen from "../screens/Tabs/PlaceholderTab";

const BottomTab = createBottomTabNavigator();

const TabBarIcon = (props) => {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const BottomTabNavigator = ({ navigation }) => {
    return (
        <BottomTab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                tabBarActiveTintColor: 'purple',
            }}
        >
            <BottomTab.Screen
                name="HomeTab"
                component={HomeTab}
                options={() => ({
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={"purple"} />
                    ),
                    tabBarLabelStyle: { color: "purple" },
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("Account")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="user-circle"
                                size={35}
                                color={"purple"}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Calendar"
                component={Calendar}
                options={{
                    title: "Calendar",
                    tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={'purple'} size={25} />,
                }}
            />
            <BottomTab.Screen
                name="Classes"
                component={Classes}
                options={{
                    title: "Classes",
                    tabBarIcon: ({ color }) => <TabBarIcon name="tablet" color={'purple'} />,
                }}
            />
        </BottomTab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />*/}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Account" component={AccountScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default Navigation = () => {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}