import { exportAllDeclaration } from "@babel/types";

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


test('Add vouchers with valid inputs', () => {
    const name = '$3 Liho Milk Tea voucher'
    const desc = 'Enjoy $3 Liho Milk Tea at all outlets'
    const pointsRequired = 200
    const noOfRedeemableVouchers = 10
    const result = await addVoucher(name, desc, pointsRequired, noOfRedeemableVouchers)
    expect(result.err).toBe(false)
})

test('Add vouchers with empty name input', () => {
    const name = ''
    const desc = 'Enjoy $3 Liho Milk Tea at all outlets'
    const pointsRequired = 200
    const noOfRedeemableVouchers = 10
    const result = await addVoucher(name, desc, pointsRequired, noOfRedeemableVouchers)
    expect(result.err).toBe(true)
})

test('Add vouchers with point input as string', () => {

    const name = '$3 Liho Milk Tea voucher'
    const desc = 'Enjoy $3 Liho Milk Tea at all outlets'
    const pointsRequired = "200"
    const noOfRedeemableVouchers = 10
    const result = await addVoucher(name, desc, pointsRequired, noOfRedeemableVouchers)

    // There should be no error if admin have successfully added voucher.
    expect(result.err).toBe(true)


})

test('Add vouchers with redemption limit set to -5', () => {
    const name = '$3 Liho Milk Tea voucher'
    const desc = 'Enjoy $3 Liho Milk Tea at all outlets'
    const pointsRequired = 200
    const noOfRedeemableVouchers = -5
    const result = await addVoucher(name, desc, pointsRequired, noOfRedeemableVouchers)
    expect(result.err).toBe(true)
})

test('Add vouchers with non admin user credetnails', () => {

    const commuterEmail = "commuter@gmail.com"
    const commuterPassword = "iamacommutter"
    // Login as a regular user instead of admin
    await loginUser(commuterEmail, commuterPassword)
    // Firebase shall reject if the user is a normal one
    const name = '$3 Liho Milk Tea voucher'
    const desc = 'Enjoy $3 Liho Milk Tea at all outlets'
    const pointsRequired = 200
    const noOfRedeemableVouchers = 10

    // Should trigger exception in adding vouchers to firebase as user have insufficient
    // permission based on ACL control
    const result = await addVoucher(name, desc, pointsRequired, noOfRedeemableVouchers)
    expect(result.err).toBe(true)

})
