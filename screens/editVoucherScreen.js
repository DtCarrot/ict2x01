import React, { useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { Container, Header, Content, Card, CardItem, Text, Body, Fab } from 'native-base';
import { H1, View, Button, Icon } from "native-base"
import 'firebase/firestore'
import * as firebase from "firebase"
import { Alert } from 'react-native'

const EditVoucherScreen = ({ navigation }) => {
    const [newVoucherName, setNewVoucherName] = useState("")
    const [newVoucherDescription, setNewVoucherDescription] = useState("")
    const [newVoucherPoint, setNewVoucherPoint] = useState("")
    const [newVoucherQuantity, setNewVoucherQuantity] = useState("")
    const [quantityErrorMessage, setQuantityErrorMessage] = useState("")
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("")
    const [nameErrorMessage, setNameErrorMessage] = useState("")
    const [pointErrorMessage, setPointErrorMessage] = useState("")
    const voucherID = navigation.getParam('ID', 'Error');
    const voucherDescription = navigation.getParam('Description', 'Error');
    const voucherName = navigation.getParam('Name', 'Error');
    const voucherPoint = navigation.getParam('Point', 'Error');
    const voucherQuantity = navigation.getParam('Quantity', 'Error');
    var db = firebase.firestore()

    const navigationOptions = {
        title: "Admin Edit Voucher",
    }

    const alertEditVoucher = async (voucherID) => {
        Alert.alert(
            'Confirmation',
            'Are You Sure?',
            [
                { text: 'NO', onPress: () => null, style: 'cancel' },
                { text: 'Yes', onPress: () => editVoucher(voucherID) },
            ]
        );
    }

    const editVoucher = async (voucherID) => {
        let errCounter = 0
        setNameErrorMessage("")
        setDescriptionErrorMessage("")
        setPointErrorMessage("")
        setQuantityErrorMessage("")

        if (newVoucherName == "") {
            setNameErrorMessage("Please enter a voucher name")
            errCounter += 1
        }
        if (newVoucherDescription == "") {
            setDescriptionErrorMessage("Please enter a voucher description")
            errCounter += 1
        }
        if (isNaN(newVoucherPoint)) {
            setPointErrorMessage("Please enter an integer")
            errCounter += 1
        }
        if (newVoucherPoint == "") {
            setPointErrorMessage("Please enter an integer")
            errCounter += 1
        }
        if (isNaN(newVoucherQuantity)) {
            setQuantityErrorMessage("Please enter an integer")
            errCounter += 1
        }
        if (newVoucherQuantity == "") {
            setQuantityErrorMessage("Please enter an integer")
            errCounter += 1
        }
        if (errCounter == 0) {
            try {
                await db.collection("Voucher")
                    .doc(voucherID)
                    .update({
                        name: newVoucherName,
                        description: newVoucherDescription,
                        point: newVoucherPoint,
                        quantity: newVoucherQuantity,
                    })
                navigation.navigate('AdminVoucher')
            } catch (err) {
                console.log("Failed to update data", err)
            }
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
        setNewVoucherName(voucherName)
        setNewVoucherDescription(voucherDescription)
        let stringVoucherPoint = voucherPoint.toString()
        let stringVoucherQuantity = voucherQuantity.toString()
        setNewVoucherPoint(stringVoucherPoint)
        setNewVoucherQuantity(stringVoucherQuantity)
    }, [])

    return (
        <Content style={styles.content}>
            <Button
                transparent
                style={{ marginTop: 30 }}
                onPress={() => navigation.navigate("Home")}
            >
                <Icon name="arrow-back" style={{ color: "white" }} />
            </Button>
            <View style={styles.container}>
                <H1 style={styles.title}>Edit Voucher</H1>
                <View style={styles.inputContainer}>
                    <View style={{ alignSelf: "flex-start", width: 120 }}>
                        <Text style={styles.fieldTitle}>Name:</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Voucher Name'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onChangeText={(newVoucherName) => setNewVoucherName(newVoucherName)}
                            value={newVoucherName}
                        />
                    </View>
                </View>
                <View style={styles.ErrorText}>
                    <Text style={{ color: "#e50000" }}>{nameErrorMessage}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ alignSelf: "flex-start", width: 120 }}>
                        <Text style={styles.fieldTitle}>Point:</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Voucher Point'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onChangeText={(newVoucherPoint) => setNewVoucherPoint(newVoucherPoint)}
                            value={newVoucherPoint}
                        />
                    </View>
                </View>
                <View style={styles.ErrorText}>
                    <Text style={{ color: "#e50000" }}>{pointErrorMessage}</Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ alignSelf: "flex-start", width: 120 }}>
                        <Text style={styles.fieldTitle}>Quantity:</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Voucher Quantity'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onChangeText={(newVoucherQuantity) => setNewVoucherQuantity(newVoucherQuantity)}
                            value={newVoucherQuantity}
                        />
                    </View>
                </View>
                <View style={styles.ErrorText}>
                    <Text style={{ color: "#e50000" }}>{quantityErrorMessage}</Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ alignSelf: "flex-start", width: 120 }}>
                        <Text style={styles.fieldTitle}>Description:</Text>
                    </View>
                    <View>
                        <TextInput
                            multiline={true}
                            style={styles.inputDescription}
                            placeholder={'Voucher Description'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onChangeText={(newVoucherDescription) => setNewVoucherDescription(newVoucherDescription)}
                            value={newVoucherDescription}
                        />
                    </View>
                </View>
                <View style={styles.ErrorText}>
                    <Text style={{ color: "#e50000" }}>{descriptionErrorMessage}</Text>
                </View>
                <Button
                    style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                    }}
                    onPress={() => alertEditVoucher(voucherID)}
                >
                    <Text style={styles.text}>Confirm</Text>
                </Button>
            </View>
        </Content>
    );
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: "#446CB3",
    },

    fieldTitle: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 17,
        textAlign: 'left',
    },

    title: {
        color: "#fff",
        fontFamily: "Roboto",
        paddingTop: 20,
        marginBottom: 56,
    },
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        width: 220,
        height: 220
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    ErrorText: {
        marginBottom:25,
    },
    inputContainer: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    input: {
        width: 150,
        height: 25,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        marginLeft: 10
    },
    inputDescription: {
        width: 150,
        height: 115,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        marginLeft: 10,
        textAlignVertical: 'top',
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        width: 50,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#e66e12',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: '#446CB3',
        fontSize: 16,
        textAlign: 'center'
    },
    smallText: {
        fontSize: 15,
        color: "#000",
    }
})
export default EditVoucherScreen