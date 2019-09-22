import React, { Component } from "react"
import { NavigationActions } from "react-navigation"
import PropTypes from "prop-types"
import { ScrollView, Text, View } from "react-native"
import { DrawerActions } from "react-navigation"
import * as firebase from "firebase"
// import styles from "../../styles/index"
const styles = {
    menuItem: {
        marginTop: 20,
    },
}

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
            <View>
                <ScrollView>
                    <View>
                        <View style={styles.menuItem}>
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
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

DrawerScreen.propTypes = {
    navigation: PropTypes.object,
}

export default DrawerScreen
