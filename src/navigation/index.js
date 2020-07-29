import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from "@screens/Home";
import modules from "@screens";
import { Login, Register, ForgetPassword } from "@auth";
import Profile from '@screens/Profile'
import MeetingHistory from '@screens/MeetingHistory'
import SocialLogin from '@screens/SocialLogin'
import Calling from '@screens/common/Calling'
import ScheduleMeeting from '@screens/ScheduleMeeting'
const AnimationConfigs = {
    screenOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gesturesEnabled: false,
        animationEnabled:false//
    },
};
const Stack = createStackNavigator();
function Router() {
    return (
        <NavigationContainer  {...AnimationConfigs}>
            <Stack.Navigator initialRouteName={"modules"} headerMode="none">                
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="MeetingHistory" component={MeetingHistory} />
                <Stack.Screen name="SocialLogin" component={SocialLogin} />
                <Stack.Screen name="modules" component={modules} />
                <Stack.Screen name="Calling" component={Calling} />
                <Stack.Screen name="ScheduleMeeting" component={ScheduleMeeting} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Router;