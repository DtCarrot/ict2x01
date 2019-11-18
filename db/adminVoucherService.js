import 'firebase/firestore'
import * as firebase from "firebase"
import { Alert } from 'react-native'

const getVoucherList = async () => {
    var db = firebase.firestore()
    try{
        const VoucherListSnapshot = await db.collection('Voucher').get()
        let VoucherCollection = []
        VoucherListSnapshot.docs.map((doc)=>{
            if(doc.data().quantity > 0)
            {
                VoucherCollection.push({Name:doc.data().name,Id:doc.id,Description:doc.data().description,Quanity:doc.data().quantity,Point:doc.data().point})
            }
            
        });
        console.log(VoucherCollection)
        return VoucherCollection
    }
    catch(err){
        console.log("Failed to retrieve data", err)
    }
}

const deleteVoucher = async(voucherID) =>
{
    var db = firebase.firestore()
    try{
        db.collection("Voucher").doc(voucherID).delete().then(function() {
            Alert.alert(
                'Delete Sucessfully',
                [
                    {text: 'OK', onPress:() => null, style:'cancel'},
                ]
            );
        }).catch(function(error) {
            alert("Error removing document: ", error);
        });
    }
    catch(err){
        console.log("Failed to delete voucher", err)
    }
}

const alertDeleteVoucher = async(voucherID) => {
    Alert.alert(
        'Confirmation',
        'Are You Sure?',
        [
            {text: 'NO', onPress:() => null, style:'cancel'},
            {text: 'Yes', onPress: () => deleteVoucher(voucherID)},
        ]
    );
}
export {getVoucherList, alertDeleteVoucher, deleteVoucher} 