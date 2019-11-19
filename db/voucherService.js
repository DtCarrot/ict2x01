import 'firebase/firestore'
import * as firebase from "firebase"
import React, { Component } from 'react';
import { Text, Alert, TouchableOpacity, } from 'react-native';
//import VoucherScreen from '../screens/VoucherScreen';

const getVoucherList = async () => {
    var db = firebase.firestore()
    try {
        const VoucherListSnapshot = await db.collection("Voucher").get()
        let VoucherCollection = []
        VoucherListSnapshot.docs.map((doc) => {
            if (doc.data().quantity > 0) {
                VoucherCollection.push({ Name: doc.data().name, Id: doc.id, Description: doc.data().description, Quanity: doc.data().quantity, Point: doc.data().point })
            }

        });
        return VoucherCollection
    }
    catch (err) {
        console.log("Failed to retrieve data", err)

    }
}

const alertVoucher = async (voucherID) => {
    Alert.alert(
        'Confirmation',
        'Are You Sure?',
        [
            { text: 'NO', onPress: () => null, style: 'cancel' },
            { text: 'YES', onPress: () => redeemVoucher(voucherID) },
        ]
    );

}

const getuserDetail = async () => {
    var db = firebase.firestore()
    var userId = firebase.auth().currentUser.uid
    try {
        const userData = await db.collection("user").doc(userId).get()
        if (userData.exists) {
            const userDetails = { Points: userData.data().useablePoint }
            return userDetails
        }
        else {
        }
    } catch (err) {
        console.log("Failed to retrieve data", err)
    }
}

const getuserVoucherList = async () => {
    var db = firebase.firestore()
    var userId = firebase.auth().currentUser.uid
    try {
        const VoucherListSnapshot = await db.collection("user").doc(userId).collection("voucher").get()
        let VoucherCollection = []
        VoucherListSnapshot.docs.map((doc) => {
            if (doc.data().quantity > 0) {
                VoucherCollection.push({ Name: doc.data().name, Id: doc.id, Description: doc.data().description, Quanity: doc.data().quantity })
            }

        });
        return VoucherCollection
    } catch (err) {
        console.log("Failed to retrieve data", err)
    }
}

const getRandomRedeemCode = async (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const claimVoucher = async (voucherID) => {
    var db = firebase.firestore()
    var userId = firebase.auth().currentUser.uid
    try {
        const VoucherListSnapshot = await db.collection("user").doc(userId).collection("voucher").doc(voucherID).get()
        if (VoucherListSnapshot.data().quantity > 0) {
            db.collection("user").doc(userId).collection("voucher").doc(voucherID).update({ quantity: VoucherListSnapshot.data().quantity - 1 })
        }
    } catch (err) {
        console.log("Failed to retrieve data", err)
    }


}

const redeemVoucher = async (voucherID) => {
    var db = firebase.firestore()
    var userId = firebase.auth().currentUser.uid
    const userData = await db.collection("user").doc(userId).get()
    try {
        const voucherData = await db.collection("Voucher").doc(voucherID).get()
        if (voucherData.exists) {
            if (voucherData.data().quantity > 0) {
                if (userData.data().useablePoint < voucherData.data().point) {
                    alert("You Does not have Enough point")
                }
                else {
                    var a = userData.data().useablePoint
                    var b = voucherData.data().point
                    db.collection("user").doc(userId).update({ useablePoint: a - b })
                    db.collection("Voucher").doc(voucherID).update({ quantity: voucherData.data().quantity - 1 })

                    const userVoucher = await db.collection('user').doc(userId).collection('voucher').doc(voucherID).get()
                    if (userVoucher.exists) {
                        db.collection('user').doc(userId).collection('voucher').doc(voucherID).update({ quantity: userVoucher.data().quantity + 1 })
                    }
                    else {
                        let data = {
                            description: voucherData.data().description,
                            name: voucherData.data().name,
                            quantity: 1
                        };
                        db.collection('user').doc(userId).collection('voucher').doc(voucherID).set(data)
                    }
                }
            }
        }
        else {

        }
    } catch (err) {
        console.log("Failed to retrieve data", err)
    }
}
export { getVoucherList, redeemVoucher, alertVoucher, getuserDetail, getuserVoucherList, claimVoucher,getRandomRedeemCode } 