import React, { Component } from "react"
import { NavigationActions } from "react-navigation"
import PropTypes from "prop-types"
import { Container, List, Content, H2, Text, Left, Body, Icon, Button } from "native-base"
import { StyleSheet, ScrollView, View } from "react-native"
import { DrawerActions } from "react-navigation"
import * as firebase from "firebase"
import { ListItem } from "react-native-elements"
// import styles from "../../styles/index"

class DrawerScreen extends Component {
    navigateToScreen = route => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        })
        this.props.navigation.dispatch(navigateAction)
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }
    logout = async () => {
        await firebase.auth().signOut()
        this.navigateToScreen("SignIn")
    }

    render() {
        return (
            <Container>
                <View
                    style={{
                        backgroundColor: "#000",
                        paddingTop: 40,
                        paddingBottom: 20,
                    }}
                >
                    <H2
                        style={{
                            color: "#fff",
                            marginLeft: 10,
                        }}
                    >
                        Darren Ong
                    </H2>
                </View>
                <Content>
                    <View style={styles.drawerItem}>
                        <Icon style={styles.icon} active name="airplane" />
                        <Text style={{ color: "#000" }}>Airplane</Text>
                    </View>
                    <View style={styles.drawerItem}>
                        <Icon style={styles.icon} active name="airplane" />
                        <Text onPress={this.navigateToScreen("Leaderboard")}>View Leaderboard</Text>
                    </View>
                    <View style={styles.drawerItem}>
                        <Icon style={styles.icon} active name="airplane" />
                        <Text onPress={this.logout}>Logout</Text>
                    </View>
                </Content>
                {/* <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen("Home")}>Home</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen("About")}>About</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen("Contact")}>Contact</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={() => this.logout()}>Contact</Text>
                        </View> */}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 30,
        paddingTop: 10,
        paddingLeft: 10,
    },
    menuItem: {
        marginTop: 20,
    },
    content: {
        flex: 1,
        backgroundColor: "#0ff",
    },
    drawerItem: {
        height: 50,
        flex: 1,
        flexDirection: "row",
        // borderBottomColor: "#000",
        // borderBottomWidth: 2,
    },
})

DrawerScreen.propTypes = {
    navigation: PropTypes.object,
}

export default DrawerScreen
