import React, { useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity, Alert } from "react-native"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { Container, Header, Content, Card, CardItem, Text, Body} from 'native-base';
import { H1, View, Button, Icon,} from "native-base"
import 'firebase/firestore'
import { getVoucherList, redeemVoucher,getuserDetail}  from "../db/voucherService"


const UserVoucherScreen = ({ navigation }) => {
    const UserDetails =  navigation.getParam('UserDetails', 'nothing sent');
//   const [voucherDetails, setvoucherlist] = useState([])
//   const [userData, setuserData] = useState([])
//   const [redeemed, setRedeemed] = useState(false)
//   var db = firebase.firestore()

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

  const voucherClicked = async(voucherID) =>{
    await redeemVoucher(voucherID)
    
    navigation.navigate('Voucher')

  }

  const alertVoucher = async(voucherID) =>
{
    Alert.alert(
        'Confirmation',
        'Are You Sure?',
        [
          {text: 'NO', onPress: () => null, style: 'cancel'},
          {text: 'YES', onPress: () => voucherClicked(voucherID)},
        ]
      );

}

  useEffect(() => {
      const init = async () => {
        //   const voucherDetails = await getVoucherList()
        //   const userData = await getuserDetail()   
        //   const redeemed = false       
        //   setvoucherlist(voucherDetails)
        //   setuserData(userData)
        //   setRedeemed(redeemed)
      }
     init()
  }, [])

  return (
      <Content style={styles.content}>
          <Button transparent style={{marginTop:20}} onPress={() => navigation.navigate('Voucher')}>
            <Icon name="arrow-back" style={{color:"white"}} />
          </Button>
          <View style={styles.container}>
              <H1 style={styles.title}>Confirmation</H1>
              <Text style={{color:"white"}}> Is the Following Voucher you wish to claim? </Text>
          </View>
          <Card>
            <CardItem header bordered>
                <Text>{UserDetails.Name}</Text>
            </CardItem>
            <CardItem bordered>
            <Body>
                <Text>
                {UserDetails.Description}
                </Text>
            </Body>
            </CardItem>
            <CardItem bordered>
                <Text>Quanity: {UserDetails.Quanity}</Text>
            </CardItem>
            <CardItem footer bordered>
            <Button onPress={() => alertVoucher(UserDetails.Id)}>
                <Text>{UserDetails.Point} To Claim</Text>
            </Button>
            </CardItem>

        </Card>
      </Content>
  );
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