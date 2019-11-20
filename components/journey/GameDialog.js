import React, { Fragment, useState, useRef, useContext, useEffect } from "react"
import { BackHandler, StyleSheet, Modal, View } from "react-native"
import Svg, { Defs, G, Rect, Circle, Path } from "react-native-svg"
import { JourneyContext } from "./JourneyContext"
import { Text, Button, Content } from "native-base"
import ChanceDialog from "./ChanceDialog"
import { chooseGame } from "../../utils/gameCreator"
import JourneyHeader from "./JourneyHeader"
import QuizDialog from "./QuizDialog"

const styles = StyleSheet.create({
    logo: {
        color: "#fff",
        fontFamily: "Roboto",
        flex: 1,
        fontSize: 26,
        paddingTop: 50,
    },
})

const GameDialog = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const {
        gameType,
        gameInProgress,
        gameDialogOpen: open,
        currentAvailChance,
        totalChance,
    } = state
    // Function that will close the open state to false
    const onBackButtonPress = () => {
        console.log("Back button")
        dispatch({
            type: "toggleGameDialog",
            open: false,
        })
    }
    useEffect(() => {
        // If the dialog is open, we need to trigger the
        // start of a game
        if (state.gameDialogOpen) {
            const { type } = chooseGame()
            dispatch({
                type: "startGame",
                gameType: type,
            })
        }
    }, [state.gameDialogOpen])

    const renderGame = () => {
        if (gameType !== "treasurebox") {
            return <ChanceDialog />
        } else {
            return <QuizDialog />
        }
    }
    return (
        <Fragment>
            {state.gameDialogOpen && (
                <Button
                    style={{
                        borderRadius: 500,
                        width: 1000,
                        position: "absolute",
                        zIndex: 9998,
                        height: 1000,
                        backgroundColor: "#C22259",
                        alignSelf: "center",
                        top: -750,
                    }}
                ></Button>
            )}

            <View>
                <Modal
                    onRequestClose={onBackButtonPress}
                    animationType="slide"
                    transparent={true}
                    visible={state.gameDialogOpen}
                >
                    <View
                        style={{
                            backgroundColor:
                                "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 42.36%, rgba(255, 255, 255, 0.552) 83.51%)",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            opacity: 0.8,
                            position: "absolute",
                            alignSelf: "center",
                            justifyContent: "center",
                            top: 0,
                            width: "90%",
                            zIndex: 9000,
                            height: "95%",
                        }}
                    ></View>
                    <View
                        style={{
                            zIndex: 9999,
                            flex: 1,
                            alignItems: "center",
                            // width: "100%",
                            // height: "100%",
                        }}
                    >
                        <JourneyHeader />
                        {gameType !== null && renderGame()}
                    </View>
                </Modal>
            </View>
        </Fragment>
    )
}

// export default withNavigation(GameDialog)
export default GameDialog
