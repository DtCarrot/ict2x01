import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import NavigationService from "../../navigation/NavigationService"
import SearchBar from "../../components/search/SearchBar"
import { Text, View, Input, Item, Button, Icon, Badge } from "native-base"
import { SearchBarContext } from "../search/SearchBarContext"
import BottomLocationBar from "./BottomLocationBar"
import { LinearGradient } from "expo-linear-gradient"
const BottomBar = () => {
    const { state, dispatch } = useContext(SearchBarContext)
    if (state.selectedPlaceObj !== null) {
        return <BottomLocationBar />
    }
    return (
        <LinearGradient
            colors={["#966FD6", "#6B3BB9"]}
            start={[0, 0]}
            end={[1, 1]}
            location={[-0.1, 0.8251]}
            style={styles.wrapper}
        >
            <View style={styles.left}>
                <Badge
                    style={{
                        marginTop: 10,
                        marginLeft: 10,
                        width: 40,
                        height: 40,
                        backgroundColor: "transparent",
                        borderRadius: 40,
                        borderColor: "#fff",
                        borderWidth: 1,
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        onPress={() => {
                            console.log("Toggle drawer")
                            NavigationService.toggleDrawer()
                        }}
                        style={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 26,
                            color: "#fff",
                        }}
                        name="ios-menu"
                    />
                </Badge>
            </View>
            <View style={styles.center}>
                <SearchBar />
            </View>
            <View style={styles.right}>
                <Button transparent>{/* <Text>Cancel</Text> */}</Button>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 40,
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 990,
        backgroundColor: "#000",
        width: "96%",
        left: "2%",
        right: "2%",
        marginBottom: 15,
        height: 60,
        bottom: 0,
    },
    left: {
        width: 150,
        height: 60,
        flex: 1,
    },
    center: {
        alignItems: "center",
        flex: 1,
    },
    right: {
        width: 150,
        height: 60,
        flex: 1,
    },
})
export default BottomBar
