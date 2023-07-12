import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button, Linking, View} from 'react-native';

const Stack = createStackNavigator();

const navigationREf = createNavigationContainerRef();

const Home = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Open Profile"
        onPress={() => {
          (navigationREf.current as any)?.navigate('Profile');
        }}
      />
    </View>
  );
};

const Profile = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Go Back"
        onPress={() => {
          if (navigationREf.current?.canGoBack()) {
            navigationREf.current.goBack();
            return;
          }
          (navigationREf.current as any)?.navigate('Home');
        }}
      />
    </View>
  );
};

export default () => {
  console.log('appName');
  return (
    <NavigationContainer
      ref={navigationREf}
      linking={{
        prefixes: ['localhost'],
        config: {
          screens: {
            Home: {
              path: '/',
            },
            Profile: {
              path: '/profile',
            },
          },
        },
      }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
