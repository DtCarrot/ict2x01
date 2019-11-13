import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import {
  Container,
  List,
  Content,
  H2,
  Text,
  Left,
  Body,
  Icon,
  Button
} from "native-base";
import { StyleSheet, ScrollView, View } from "react-native";
import { DrawerActions } from "react-navigation";
import * as firebase from "firebase";
import { ListItem } from "react-native-elements";
// import styles from "../../styles/index"

class DrawerScreen extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  logout = async () => {
    await firebase.auth().signOut();
    this.navigateToScreen("SignIn");
  };
  navigate = to => {
    switch (to) {
      case "navigate":
        this.navigateToScreen("Home");
        break;
      case "leaderboard":
        this.navigateToScreen("Leaderboard");
        break;
      case "voucher":
        this.navigateToScreen("Voucher");
        break;
      case "profile":
        this.navigateToScreen("Profile");
        break;
    }
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor: "F1F1F1"
        }}
      >
        <View
          style={{
            paddingTop: 40,
            paddingBottom: 20,
            flex: 1
          }}
        >
          <View
            style={{
              borderRadius: 126,
              width: 126,
              height: 126,
              backgroundColor: "#c4c4c4",
              alignSelf: "center"
            }}
          ></View>
          <H2
            style={{
              marginTop: 20,
              marginBottom: 20,
              color: "#000",
              fontSize: 25,
              fontFamily: "Roboto",
              fontWeight: "200",
              marginLeft: 10,
              alignSelf: "center"
            }}
          >
            Darren Ong
          </H2>
          <View style={styles.drawerItem}>
            <Icon style={styles.icon} active name="compass" />
            <Text
              onPress={() => this.navigate("navigate")}
              style={styles.drawerText}
            >
              Navigate
            </Text>
          </View>
          <View style={styles.drawerItem}>
            <Icon style={styles.icon} active name="paper" />
            <Text
              onPress={() => this.navigate("voucher")}
              style={styles.drawerText}
            >
              Vouchers
            </Text>
          </View>
          <View style={styles.drawerItem}>
            <Icon style={styles.icon} active name="trophy" />
            <Text
              onPress={() => this.navigate("leaderboard")}
              style={styles.drawerText}
            >
              Leaderboard
            </Text>
          </View>
          <View style={styles.drawerItem}>
            <Icon style={styles.icon} active name="person" />
            <Text
              onPress={() => this.navigate("profile")}
              style={styles.drawerText}
            >
              Profile
            </Text>
          </View>
          <View style={styles.drawerItem}>
            <Text onPress={() => this.logout()} style={styles.drawerText}>
              Logout
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 10
  },
  menuItem: {
    marginTop: 20
  },
  content: {
    flex: 1,
    backgroundColor: "#0ff"
  },
  drawerItem: {
    display: "flex",
    height: 50,
    flexDirection: "row",
    alignContent: "flex-start"
    // borderBottomColor: "#000",
    // borderBottomWidth: 2,
  },
  drawerText: {
    lineHeight: 30,
    marginTop: 8,
    display: "flex",
    color: "#000",
    marginLeft: 20
    // alignItems: "center",
  }
});
DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;
