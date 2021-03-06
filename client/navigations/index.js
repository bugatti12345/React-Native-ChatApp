import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useTheme, Button, Icon } from 'native-base';
import Auth from '../screens/Auth/Auth';
import Rooms from '../screens/Rooms/Rooms';
import Profile from '../screens/Profile/Profile';
import Chat from '../screens/Chat/Chat';
import Setting from '../screens/Setting/Setting';
import Search from '../screens/Search/Search';
import ChatSetting from '../screens/ChatSetting/ChatSetting';
import { AuthContext } from '../context/AuthContext';
import { navigationRef } from './navigationRef';
import AddMenu from '../components/Rooms/AddMenu';
import { Ionicons } from '@expo/vector-icons';
import { ChatSettingBtn } from '../components/Chat/ChatSettingBtn';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ChatFregment() {
    return (
        <Stack.Navigator screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
            <Stack.Screen
                name="Rooms"
                component={Rooms}
                options={{
                    title: 'Chat',
                    headerRight: () => (
                        <AddMenu />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

function MainActivity() {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: colors.blueGray['700'],
                tabBarInactiveTintColor: colors.blueGray['400']
            })}
        >
            <Tab.Screen name="Chat" component={ChatFregment} options={{
                title: 'Chat',
                tabBarIcon: ({ size, focused, color }) => {
                    return (
                        <MaterialCommunityIcons name="chat-outline" size={size} color={color} />

                    );
                },
                headerShown: false
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                title: 'Profile',
                tabBarIcon: ({ size, focused, color }) => {
                    return (
                        <Feather name="user" size={size} color={color} />
                    );
                },
            }} />
        </Tab.Navigator>
    )
}


export default function NavBarBottom() {
    const user = useContext(AuthContext)
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                initialRouteName: 'Main',
                headerBackImage: () => <Icon
                    size={6}
                    color="blueGray.900"
                    as={
                        <Ionicons name="chevron-back" />
                    }
                />,
            }}>
                {
                    user.userId ?
                        <>
                            <Stack.Screen name="Main" component={MainActivity} options={{ headerShown: false }} />
                            <Stack.Screen
                                name="ChatList"
                                component={Chat}
                                options={(
                                    { route }) => ({
                                        title: route.params.name,
                                        headerRight: () => <ChatSettingBtn />
                                    }
                                )}
                            />
                            <Stack.Screen
                                name="Setting"
                                component={Setting}
                            />
                            <Stack.Screen
                                name="Search"
                                component={Search}
                            />
                            <Stack.Screen
                                name="ChatSetting"
                                component={ChatSetting}
                                options={{
                                    title: 'Setting'
                                }}
                            />
                        </>
                        :
                        <Stack.Screen name="Login" component={Auth} options={{ headerShown: false }} />

                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}