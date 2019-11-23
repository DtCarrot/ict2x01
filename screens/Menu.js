import React, { Component, Fragment } from "react"
import { NavigationActions } from "react-navigation"
import PropTypes from "prop-types"
import { Container, List, Content, H2, Text, Left, Body, Icon, Button } from "native-base"
import { StyleSheet, ScrollView, View, Image } from "react-native"
import { DrawerActions } from "react-navigation"
import * as firebase from "firebase"
import { ListItem } from "react-native-elements"
import { checkUserRole, getUserDetails } from "../db/authService"
import dpImage from "../assets/images/boy.png"

class DrawerScreen extends Component {
    state = {
        isAdmin: false,
        name: "",
    }
    async componentWillMount() {
        const { admin: isAdmin, name } = await getUserDetails()
        this.setState({
            isAdmin,
            name,
        })
    }
    navigateToScreen = route => {
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
    navigate = to => {
        switch (to) {
            case "navigate":
                this.navigateToScreen("Home")
                break
            case "leaderboard":
                this.navigateToScreen("Leaderboard")
                break
            case "uservoucher":
                this.navigateToScreen("UserVoucher")
                break
            case "voucher":
                this.navigateToScreen("Voucher")
                break
            case "profile":
                this.navigateToScreen("Profile")
                break
            case "adminVoucher":
                this.navigateToScreen("AdminVoucher")
                break
        }
    }

    renderUserMenuItem = () => {
        return (
            <Fragment>
                <View style={styles.drawerItem}>
                    <Icon style={styles.icon} active name="compass" />
                    <Text onPress={() => this.navigate("navigate")} style={styles.drawerText}>
                        Navigate
                    </Text>
                </View>
                <View style={styles.drawerItem}>
                    <Icon style={styles.icon} active name="basket" />
                    <Text onPress={() => this.navigate("voucher")} style={styles.drawerText}>
                        Market
                    </Text>
                </View>
                <View style={styles.drawerItem}>
                    <Icon style={styles.icon} active name="briefcase" />
                    <Text onPress={() => this.navigate("uservoucher")} style={styles.drawerText}>
                        Inventory
                    </Text>
                </View>
                <View style={styles.drawerItem}>
                    <Icon style={styles.icon} active name="trophy" />
                    <Text onPress={() => this.navigate("leaderboard")} style={styles.drawerText}>
                        Leaderboard
                    </Text>
                </View>
                <View style={styles.drawerItem}>
                    <Icon style={styles.icon} active name="person" />
                    <Text onPress={() => this.navigate("profile")} style={styles.drawerText}>
                        Profile
                    </Text>
                </View>
            </Fragment>
        )
    }

    renderAdminMenuItem = () => {
        return (
            <Fragment>
                <View style={styles.drawerItem}>
                    <Icon style={styles.icon} active name="person" />
                    <Text onPress={() => this.navigate("adminVoucher")} style={styles.drawerText}>
                        Admin Voucher
                    </Text>
                </View>
            </Fragment>
        )
    }

    renderRoleItem = () => {
        const { isAdmin } = this.state
        if (isAdmin) {
            return this.renderAdminMenuItem()
        } else {
            return this.renderUserMenuItem()
        }
    }

    render() {
        const { name } = this.state
        return (
            <Container
                style={{
                    backgroundColor: "F1F1F1",
                }}
            >
                <View
                    style={{
                        paddingTop: 40,
                        paddingBottom: 20,
                        flex: 1,
                    }}
                >
                    <Image
                        source={dpImage}
                        style={{
                            marginBottom: 10,
                            marginTop: 10,
                            borderRadius: 126,
                            width: 126,
                            height: 126,
                            backgroundColor: "#fff",
                            alignSelf: "center",
                            borderWidth: 2,
                            borderColor: "#ececec",
                        }}
                    />
                    <H2
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            color: "#000",
                            fontSize: 25,
                            fontFamily: "Roboto",
                            fontWeight: "200",
                            alignSelf: "center",
                        }}
                    >
                        {name}
                    </H2>
                    {this.renderRoleItem()}
                    <View style={styles.drawerItem}>
                        <Text onPress={() => this.logout()} style={styles.drawerText}>
                            Logout
                        </Text>
                    </View>
                </View>
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
        display: "flex",
        height: 50,
        flexDirection: "row",
        alignContent: "flex-start",
        // borderBottomColor: "#000",
        // borderBottomWidth: 2,
    },
    drawerText: {
        lineHeight: 30,
        marginTop: 8,
        display: "flex",
        color: "#000",
        marginLeft: 20,
        // alignItems: "center",
    },
})
DrawerScreen.propTypes = {
    navigation: PropTypes.object,
}

export default DrawerScreen
