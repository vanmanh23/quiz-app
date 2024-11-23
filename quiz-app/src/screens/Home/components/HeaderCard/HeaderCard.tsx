// components/Header.js
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Menu, Divider, Provider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeadProps{
  isLogin: boolean
  onRegister: () => void
  onSignIn: () => void
  onSignOut: () => void
  onAchievement: () => void
}

export function HeaderCard ({onRegister, onSignIn, onSignOut, onAchievement, isLogin}: HeadProps) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const isSignedIn = isLogin;

  return (
    <Provider>
      <View style={styles.header}>
        <Image source={require('../../../../../assets/logo.jpg')} style={styles.logo} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu} icon={'account'}>
              Profile
            </Button>
          }
          style={{ zIndex: 20 }}
        >
          {isSignedIn ? (
            <>
              <View style={styles.menuOption}>
              <Icon name="trophy-variant" size={25} color="#f1c40f" />
              <Menu.Item title="Achievement"  onPress={() => onAchievement()}/>
              </View>
              <Divider />
              <View style={styles.menuOption}>
              <Icon name="logout" size={30}  />
              <Menu.Item title="Sign Out" onPress={() => onSignOut()}/>
              </View>
            </>
          ) : (
            <>
            <View style={styles.menuOption}>
            <Icon name="login" size={20} />
            <Menu.Item title="Sign In" onPress={() => onSignIn()}/>
            </View>
            <Divider />
            <View style={styles.menuOption}>
            <Icon name="account-plus" size={20} />
            <Menu.Item title="Register" onPress={() => onRegister()}/>
            </View>  
            </>
          )}
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#a8b1ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  menuButton: {
    fontSize: 16,
    color: '#007bff',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  }
});


