import React, { useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { Container, Header, Content, Card, CardItem, Text, Body, Fab } from 'native-base';
import { H1, View, Button, Icon, } from "native-base"
import 'firebase/firestore'
import * as firebase from "firebase"
import { getVoucherList, alertDeleteVoucher } from "../db/adminVoucherService"

const AdminVoucherScreen = ({ navigation }) => {
    const [voucherDetails, setvoucherlist] = useState([])
    var db = firebase.firestore()

    const navigationOptions = {
        title: "Admin Voucher",
    }

    navigateToScreen = route => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        })
        this.props.navigation.dispatch(navigateAction)
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    useEffect(() => {
        const init = async () => {
            const voucherDetails = await getVoucherList()
            setvoucherlist(voucherDetails)
        }
        init()
    }, [])

    return (
        <Content style={styles.content}>
            <Button transparent style={{ marginTop: 20 }} onPress={() => navigation.navigate('Home')}>
                <Icon name="arrow-back" style={{ color: "white" }} />
            </Button>
            <View style={styles.container}>
                <H1 style={styles.title}>Voucher</H1>
            </View>
            {voucherDetails.map(voucherDetails => {
                return (
                    <Card button onPress={() => alert("This is Card Body")}>
                        <CardItem header bordered>
                            <Text>{voucherDetails.Name}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    {voucherDetails.Description}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Text>Quanity: {voucherDetails.Quanity}</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Button>
                                <Text>Edit</Text>
                            </Button>
                            <Button style={{marginLeft:20}} onPress={() => alertDeleteVoucher(voucherDetails.Id)}>
                                <Text>Delete</Text>
                            </Button>
                        </CardItem>

                    </Card>
                )
            })}
            <View style={styles.Fabcontainer}>
                <TouchableOpacity style={styles.fab}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </View>
        </Content>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    Fabcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInput: {
        height: 60,
        width: "90%",
        borderColor: "white",
        // borderWidth: 2,
        backgroundColor: "#fff",
        // marginTop: 20,
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
    fab: {
        height: 50,
        width: 50,
        borderRadius: 200,
        position: 'absolute',
        bottom: 0,
        right: 20,
        zIndex:20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#686cc3',
    },
})
export default AdminVoucherScreen