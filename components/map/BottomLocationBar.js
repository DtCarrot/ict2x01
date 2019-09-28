import React from "react"
import { Button, Text, View, Content, List, ListItem, Left, H3 } from "native-base"
import { StyleSheet } from "react-native"

const BottomLocationBar = () => {
    const renderRoutes = () => {
        return (
            <List>
                <ListItem style={{ borderBottom: 0 }}>
                    <Left>
                        <Text>Hello World</Text>
                    </Left>
                </ListItem>
            </List>
        )
    }
    return (
        <View style={styles.box}>
            <Content style={{ flex: 1 }}>
                {/* <Text style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
                    Routes
                </Text> */}

                <H3 style={{ marginTop: 10, fontSize: 18, marginLeft: 20, color: "#000" }}>
                    Routes
                </H3>
                {renderRoutes()}
                <Button
                    block
                    danger
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 10,
                    }}
                >
                    <Text>Start Navigation</Text>
                </Button>
            </Content>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#fff",
        flex: 1,
        position: "absolute",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        display: "flex",
        width: "100%",
        bottom: 0,
        zIndex: 9999,
    },
})

export default BottomLocationBar
