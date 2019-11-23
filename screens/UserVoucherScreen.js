import React, { useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity, Alert } from "react-native"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base"
import { H1, View, Button, Icon } from "native-base"
import "firebase/firestore"
import { claimVoucher, getuserVoucherList, getRandomRedeemCode } from "../db/voucherService"
import TopMenu from "../components/shared/TopMenu"

const UserVoucherScreen = ({ navigation }) => {
    const [voucherDetails, setvoucherlist] = useState([])

    const navigationOptions = {
        title: "UserVoucher",
    }

    navigateToScreen = route => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        })
        this.props.navigation.dispatch(navigateAction)
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    const voucherClicked = async voucherID => {
        await claimVoucher(voucherID)
        var redeemCode = await getRandomRedeemCode(7)
        await showRedeemCode(redeemCode)
    }

    const reloadPage = async () => {
        const voucherDetails = await getuserVoucherList()
        setvoucherlist(voucherDetails)
    }

    const alertVoucher = async voucherID => {
        Alert.alert("Confirmation", "Are You Sure?", [
            { text: "NO", onPress: () => null, style: "cancel" },
            { text: "YES", onPress: () => voucherClicked(voucherID) },
        ])
    }

    const showRedeemCode = async redeemCode => {
        Alert.alert("Redeem Code", redeemCode, [{ text: "YES", onPress: () => reloadPage() }])
    }

    useEffect(() => {
        const init = async () => {
            const voucherDetails = await getuserVoucherList()
            console.log("Voucher details: ", voucherDetails)
            setvoucherlist(voucherDetails)
        }
        init()
    }, [])

    return (
        <Content style={styles.content}>
            <TopMenu
                screenTitle="Inventory"
                rightIcon="refresh"
                rightOnPress={reloadPage}
            ></TopMenu>
            {voucherDetails.map(voucherDetails => {
                return (
                    <Card>
                        <CardItem header bordered>
                            <Text>{voucherDetails.Name}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>{voucherDetails.Description}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Text>Quanity: {voucherDetails.Quanity}</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Button onPress={() => alertVoucher(voucherDetails.Id)}>
                                <Text>Click To Claim</Text>
                            </Button>
                        </CardItem>
                    </Card>
                )
            })}
        </Content>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        height: 60,
        width: "90%",
        borderColor: "white",
        backgroundColor: "#fff",
    },
    content: {
        backgroundColor: "#446CB3",
    },
    text: {
        color: "#fff",
        fontSize: 20,
        textTransform: "uppercase",
    },
    item: {
        width: "80%",
    },
    title: {
        color: "#fff",
        fontFamily: "Roboto",
        paddingTop: 20,
        marginBottom: 36,
    },
    button: {
        width: "70%",
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 50,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    smallText: {
        fontSize: 15,
        color: "#000",
    },
})
export default UserVoucherScreen
