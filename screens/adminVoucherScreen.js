import React, { useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { Container, Header, Content, Card, CardItem, Text, Body, Fab } from 'native-base';
import { H1, View, Button, Icon, } from "native-base"
import 'firebase/firestore'
import * as firebase from "firebase"
import { getVoucherList } from "../db/adminVoucherService"
import { Alert } from 'react-native'

const AdminVoucherScreen = ({ navigation }) => {
    const [voucherDetails, setvoucherlist] = useState([])
    var db = firebase.firestore()

    const navigationOptions = {
        title: "Admin Voucher",
    }

    const alertDeleteVoucher = async (voucherID) => {
        Alert.alert(
            'Confirmation',
            'Are You Sure?',
            [
                { text: 'NO', onPress: () => null, style: 'cancel' },
                { text: 'Yes', onPress: () => deleteVoucher(voucherID) },
            ]
        );
    }

    const deleteVoucher = async (voucherID) => {
        var db = firebase.firestore()
        try {
            db.collection("Voucher").doc(voucherID).delete().then(async function () {
                const voucherDetails = await getVoucherList()
                setvoucherlist(voucherDetails)
            }).catch(function (error) {
                alert("Error removing document: ", error);
            });
        }
        catch (err) {
            console.log("Failed to delete voucher", err)
        }
    }

    const refreshVoucherList = async () => {
        var db = firebase.firestore()
        try {
            const VoucherListSnapshot = await db.collection('Voucher').get()
            let VoucherCollection = []
            VoucherListSnapshot.docs.map((doc) => {
                if (doc.data().quantity > 0) {
                    VoucherCollection.push({ Name: doc.data().name, Id: doc.id, Description: doc.data().description, Quantity: doc.data().quantity, Point: doc.data().point })
                }

            });
            setvoucherlist(VoucherCollection)
        }
        catch (err) {
            console.log("Failed to retrieve data", err)
        }
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
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={styles.buttonContainer}>
                    <Button transparent style={{ marginTop: 30 }} onPress={() => navigation.navigate('Home')}>
                        <Icon name="arrow-back" style={{ color: "white" }} />
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button transparent style={{ marginTop: 30, marginLeft: 130 }} onPress={() => refreshVoucherList()}>
                        <Icon name="refresh" style={{ color: "white" }} />
                    </Button>
                </View>
            </View>

            <View style={styles.container}>
                <H1 style={styles.title}>Voucher</H1>
            </View>

            <View style ={{flex:1}}>
                <Button transparent style={{marginLeft: 305 }} onPress={() => navigation.navigate('AddVoucher')}>
                    <Icon name="add" style={{ color: "white" }} />
                </Button>
            </View>

            {voucherDetails.map(voucherDetails => {
                return (
                    <Card style={{ width: 335, marginLeft: 10 }}>
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
                            <Text>Quanity: {voucherDetails.Quantity}</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Button
                                transparent
                                onPress={() =>
                                    navigation.navigate('EditVoucher', {
                                        ID: voucherDetails.Id,
                                        Description: voucherDetails.Description,
                                        Name: voucherDetails.Name,
                                        Point: voucherDetails.Point,
                                        Quantity: voucherDetails.Quantity
                                    })}
                            >
                                <Icon name="create" style={{ color: "#446CB3" }} />
                            </Button>
                            <Button
                                transparent
                                style={{ marginLeft: 10 }}
                                onPress={() => alertDeleteVoucher(voucherDetails.Id)}
                            >
                                <Icon name="trash" style={{ color: "#446CB3" }} />
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
        </Content >
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
        marginBottom: 30,
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
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#686cc3',
    },
    buttonContainer: {
        flex: 1,
    }
})
export default AdminVoucherScreen