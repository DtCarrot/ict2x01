const addVoucher = (name, desc, pointsRequired, noOfRedeemableVouchers) => {
    if(isEmpty(name) || isEmpty(desc)) {
        console.error('Name or descrption field cannot be empty')
        return {
            err: true,
            data: null,
        }
    }
    if(isNaN(pointsRequired) || pointsRequired <= 0) {
        console.error('Points need to be an integer and more than 0')
        return {
            err: true,
            data: null,
        }
    }
    if(isNaN(noOfRedeemableVouchers) || noOfRedeemableVouchers <= 0) {
        return {
            err: true,
            data: null,
        }
    }
    try {
        const db = firebase.firestore()
        const doc = await db
        .collection('vouchers').add({
            name, 
            desc,
            pointsRequired,
            noOfRedeemableVouchers,
        })
        return {
            err: false,
            data: doc.id,
        }
    } catch(err) {
        console.error('Unexpected error in adding voucher')
        return {
            err: true,
            data: null,
        }
    }
}