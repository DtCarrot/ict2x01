import React, { Fragment } from "react"
import { StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Text, Content, H1, View, Button, Icon } from "native-base"
import { withNavigation } from "react-navigation"

const TopMenu = ({
    left,
    center,
    extraRightIcon,
    extraRightOnPress,
    rightIcon,
    rightOnPress,
    screenTitle,
    navigation,
}) => {
    return (
        <LinearGradient
            colors={["#966FD6", "#6B3BB9"]}
            start={[0, 0]}
            end={[1, 1]}
            location={[-0.1, 0.8251]}
            style={styles.timeBtn}
        >
            <View
                style={{
                    paddingTop: 25,
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                }}
            >
                <View>
                    <Button
                        transparent
                        style={{ marginTop: extraRightIcon ? 5 : 10 }}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Icon name="arrow-back" style={{ color: "white" }} />
                    </Button>
                </View>
                <View style={styles.center}>
                    <H1 style={styles.title}>{screenTitle}</H1>
                </View>

                <View style={styles.right}>
                    {rightIcon && !extraRightIcon && (
                        <Button
                            transparent
                            style={{ marginTop: 10 }}
                            onPress={() => rightOnPress()}
                        >
                            <Icon name={rightIcon} style={{ color: "white" }} />
                        </Button>
                    )}
                </View>
                {rightIcon && extraRightIcon && (
                    <Fragment>
                        <View style={styles.rightMultiple}>
                            <Button
                                transparent
                                style={{ marginTop: -10 }}
                                onPress={() => rightOnPress()}
                            >
                                <Icon name={rightIcon} style={{ color: "white" }} />
                            </Button>
                            <Button
                                transparent
                                style={{ marginTop: -10 }}
                                onPress={() => extraRightOnPress()}
                            >
                                <Icon name={extraRightIcon} style={{ color: "white" }} />
                            </Button>
                        </View>
                    </Fragment>
                )}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    item: {
        width: "80%",
    },
    title: {
        color: "#fff",
        fontFamily: "Roboto",
        marginTop: 5,
        fontSize: 25,
        alignItems: "center",
        textTransform: "uppercase",
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
    left: {
        width: 100,
        height: 60,
        flex: 1,
    },
    center: {
        alignItems: "center",
        flexGrow: 2,
        justifyContent: "center",
        flex: 1,
    },
    right: {
        width: 100,
        height: 60,
        flex: 1,
        alignItems: "flex-end",
    },
    rightMultiple: {
        width: 100,
        height: 60,
        marginTop: -10,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
    },
})

export default withNavigation(TopMenu)
