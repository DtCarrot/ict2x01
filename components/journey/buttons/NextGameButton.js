import React, { useContext } from "react"
import { Button, Text, Icon } from "native-base"
import { JourneyContext } from "../JourneyContext"
import { chooseGame } from "../../../utils/gameCreator"
const NextGameButton = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const nextGame = () => {
        const { type: gameType } = chooseGame()
        dispatch({
            type: "startGame",
            gameType,
        })
    }
    return (
        <Button
            onPress={nextGame}
            style={{
                marginTop: 30,
                width: 180,
                height: 56,
                borderRadius: 20,
                backgroundColor: "#c22259",
                zIndex: 300,
                position: "relative",
            }}
            iconRight
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "200",
                    fontFamily: "Roboto",
                }}
            >
                Next Game
            </Text>
            <Icon
                style={{
                    fontSize: 32,
                }}
                name="ios-arrow-round-forward"
            />
        </Button>
    )
}
export default NextGameButton
