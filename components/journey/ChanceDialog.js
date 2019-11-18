import React, { Fragment, useState, useRef, useContext, useEffect } from "react"
import { Image, BackHandler, StyleSheet, Modal, View } from "react-native"
import { addPoints } from "../../db/pointsService"
import { Button, Icon, H2, Text, Content } from "native-base"
import Svg, { Defs, G, Rect, Circle, Path } from "react-native-svg"
import { JourneyContext } from "./JourneyContext"
import { withNavigation } from "react-navigation"
import { generateLuckyDrawReward } from "../../utils/gameCreator"
import ShakeEvent from "./shakeEvent"
import FireworkWrapper from "./FireworkWrapper"
import NextGameButton from "./buttons/NextGameButton"
import ContinueNavigateButton from "./buttons/ContinueNavigateButton"

const styles = StyleSheet.create({
    logo: {
        color: "#fff",
        fontFamily: "Roboto",
        flex: 1,
        fontSize: 26,
        paddingTop: 50,
    },
    title: {
        color: "#C22259",
        fontSize: 56,
        marginTop: 60,
        fontFamily: "Roboto_medium",
    },
    subtitle: {
        color: "#000",
        fontSize: 48,
        fontFamily: "Roboto",
        marginTop: -10,
        marginBottom: 30,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
})

const SvgComponent = () => (
    <Svg width="214" height="214" id="Layer_1" data-name="Layer 1" viewBox="0 0 512 512">
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

const ChanceDialog = ({ navigation }) => {
    const { state, dispatch } = useContext(JourneyContext)
    // const [finished, setFinished] = useState(false)
    const [reward, setReward] = useState("")
    const { currentAvailChance, totalChance, finished } = state
    console.log("Finished: ", finished)
    useEffect(() => {
        if (!state.finished) {
            ShakeEvent.addListener(() => {
                // setFinished(true)
                dispatch({
                    type: "endGame",
                })
                const reward = generateLuckyDrawReward()
                if (reward.type === "point") {
                    dispatch({
                        type: "updateRewardChance",
                        currentAvailChance: currentAvailChance - 1,
                        totalChance: totalChance - 1,
                    })
                    const { value } = reward
                    setReward(`${value} points`)
                    addPoints(value)
                }
            })
            console.log("Set hardware back press")
        } else {
            ShakeEvent.removeListener()
        }
    }, [state.gameDialogOpen, state.finished])
    return (
        <Fragment>
            <Text style={styles.title}>LUCKY</Text>
            <Text style={styles.subtitle}>TREASURE</Text>

            {/* <H1 style={styles.logo}>Lucky Draw</H1> */}
            {!finished && (
                <Fragment>
                    <SvgComponent />
                    <Button
                        style={{
                            width: 264,
                            height: 102,
                            marginTop: 40,
                            borderWidth: 2,
                            borderRadius: 20,
                            borderColor: "#c22259",
                            backgroundColor: "#fff",
                        }}
                    >
                        <H2
                            style={{
                                fontSize: 22,
                                lineHeight: 26,
                                flex: 1,
                                textAlign: "center",
                                display: "flex",
                                color: "#c22259",
                            }}
                        >
                            Shake your phone to get some prizes!
                        </H2>
                    </Button>
                </Fragment>
            )}
            {finished && (
                <Fragment>
                    <View
                        style={{
                            zIndex: 300,
                            width: 270,
                            height: 270,
                            marginBottom: 30,
                        }}
                    >
                        <FireworkWrapper position="top-right" />
                        <FireworkWrapper position="top-left" />
                        <FireworkWrapper position="bottom-right" />
                        <FireworkWrapper position="bottom-left" />
                        <Button
                            style={{
                                width: 270,
                                height: 270,
                                backgroundColor: "#c22259",
                                borderRadius: 135,
                                position: "relative",
                                borderColor: "#fff",
                                zIndex: 310,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    position: "relative",
                                    // flexDirection: "column",
                                    marginBottom: 50,
                                }}
                            >
                                <H2
                                    style={{
                                        textAlign: "center",
                                        fontSize: 30,
                                        lineHeight: 35,
                                        fontWeight: "400",
                                        fontFamily: "Roboto",
                                        color: "#fff",
                                        marginBottom: 20,
                                    }}
                                >
                                    You have won
                                </H2>
                                <Button
                                    style={{
                                        marginLeft: 22,
                                        width: 225,
                                        height: 60,
                                        textAlign: "center",
                                        backgroundColor: "#fff",
                                        borderRadius: 20,
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "center",
                                            fontSize: 28,
                                            lineHeight: 33,
                                            fontWeight: "400",
                                            fontFamily: "Roboto",
                                            color: "#c22259",
                                        }}
                                    >
                                        300 POINT
                                    </Text>
                                </Button>
                            </View>
                        </Button>
                    </View>
                    <View
                        style={{
                            marginBottom: 50,
                        }}
                    >
                        {currentAvailChance > 0 && <NextGameButton />}
                        {currentAvailChance <= 0 && <ContinueNavigateButton />}
                    </View>
                </Fragment>
            )}
        </Fragment>
    )
}

export default withNavigation(ChanceDialog)
