import React, { Fragment, useState, useRef, useContext, useEffect } from "react"
import { BackHandler, StyleSheet, Modal, View } from "react-native"
import { H1, H2, Text, Content } from "native-base"
import Svg, { Defs, G, Rect, Circle, Path } from "react-native-svg"
import { JourneyContext } from "./JourneyContext"
import LottieView from "lottie-react-native"
import { withNavigation } from "react-navigation"
import ShakeEvent from "./shakeEvent"

const styles = StyleSheet.create({
    logo: {
        color: "#fff",
        fontFamily: "Roboto",
        flex: 1,
        fontSize: 26,
        paddingTop: 50,
    },
    subtitle: {
        width: 220,
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 20,
    },
})

const SvgComponent = () => (
    <Svg width="50%" height="50%" id="Layer_1" data-name="Layer 1" viewBox="0 0 512 512">
        <Defs></Defs>
        <Path
            fill="#efc17f"
            d="M469.33,234.67v256A21.4,21.4,0,0,1,448,512H64a21.4,21.4,0,0,1-21.33-21.33v-256Z"
        />
        <Rect fill="#ffd38d" y={106.67} width={512} height={128} rx={21.33} ry={21.33} />
        <Path
            fill="#6d4135"
            d="M298.67,0A63.26,63.26,0,0,0,256,16.43,63.26,63.26,0,0,0,213.33,0a64.05,64.05,0,0,0-64,64,63.26,63.26,0,0,0,16.43,42.67h47.57V512h85.33V106.67h47.57A63.26,63.26,0,0,0,362.67,64,64.05,64.05,0,0,0,298.67,0ZM192,64a21.33,21.33,0,0,1,42.67,0V85.33H213.33A21.4,21.4,0,0,1,192,64ZM298.67,85.33H277.33V64a21.33,21.33,0,1,1,21.33,21.33Z"
        />
        <G opacity="0.1">
            <Path d="M490.67,106.67H346.24A63.26,63.26,0,0,0,362.67,64a64.05,64.05,0,0,0-64-64A63.26,63.26,0,0,0,256,16.43V512H448a21.4,21.4,0,0,0,21.33-21.33v-256h21.33A21.4,21.4,0,0,0,512,213.33V128A21.4,21.4,0,0,0,490.67,106.67Zm-192-64a21.33,21.33,0,0,1,0,42.67H277.33V64A21.4,21.4,0,0,1,298.67,42.67Z" />
        </G>
    </Svg>
)

const GameDialog = ({ navigation }) => {
    const animationRef = useRef(null)
    const { state, dispatch } = useContext(JourneyContext)
    const { gameDialogOpen: open } = state
    const [isAwarded, setReward] = useState(false)
    // const [text, setText] = useState(null)
    const onBackButtonPress = () => {
        console.log("Back button")
        dispatch({
            type: "toggleGameDialog",
            open: false,
        })
    }
    useEffect(() => {
        if (state.gameDialogOpen) {
            ShakeEvent.addListener(() => {
                setReward(true)
            })
            console.log("Set hardware back press")
        } else {
            ShakeEvent.removeListener()
        }
    }, [state.gameDialogOpen])
    return (
        <View>
            <Modal
                onRequestClose={onBackButtonPress}
                animationType="slide"
                transparent={true}
                visible={open}
            >
                {/* // <TreasureBox width={120} height={120} style={{ marginTop: 20 }} /> */}
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#009990",
                        margin: 15,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <H1 style={styles.logo}>Lucky Draw</H1>
                    {isAwarded && (
                        <Fragment>
                            <Content
                                style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                    maxHeight: 100,
                                }}
                            >
                                <H2 style={styles.subtitle}>
                                    Shake to stand a chance to get a prize!
                                </H2>
                            </Content>
                            <SvgComponent />
                        </Fragment>
                    )}
                    {!isAwarded && (
                        <Fragment>
                            <Content
                                contentContainerStyle={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                style={{
                                    borderColor: "#fff",
                                    flex: 1,
                                    marginBottom: 50,
                                }}
                            >
                                <Content
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: 40,
                                        width: 200,
                                        height: 200,
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "center",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        Shaken!
                                    </Text>
                                </Content>
                            </Content>
                        </Fragment>
                    )}
                </View>
            </Modal>
        </View>
    )
}

export default withNavigation(GameDialog)
