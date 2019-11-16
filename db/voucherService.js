import 'firebase/firestore'
import * as firebase from "firebase"

const getVoucherList = async () => {
    var db = firebase.firestore()
    try{
        const VoucherListSnapshot = await db.collection('Voucher').get()
        let VoucherCollection = []
        VoucherListSnapshot.docs.map((doc)=>{
            if(doc.data().quantity >0)
            {
                VoucherCollection.push({Name:doc.data().name,Id:doc.id,Description:doc.data().description,Quanity:doc.data().quantity,Point:doc.data().point})
            }
            
        });
        return VoucherCollection
    }
    catch(err){
        console.log("Failed to retrieve data", err)

    }
}
export { getVoucherList} 