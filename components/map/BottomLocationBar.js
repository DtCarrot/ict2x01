import React, { Fragment, useContext, useEffect, useState } from "react"
import { Icon, Button, Text, View, Content, List, ListItem, Left, Right, H3 } from "native-base"
import { StyleSheet } from "react-native"
import { RouteContext } from "../routes/RouteContext"
import { withNavigation } from "react-navigation"

const TRANSPORT_MODE = {
    BUS: ["BUS"],
    TRAIN: [
        "METRO_RAIL",
        "RAIL",
        "SUBWAY",
        "TRAM",
        "HEAVY_RAIL",
        "COMMUTER_TRAIN",
        "HIGH_SPEED_TRAIN",
        "LONG_DISTANCE_TRAIN",
    ],
    WALKING: ["WALKING"],
}

const BottomLocationBar = ({ navigation }) => {
    const { state, dispatch } = useContext(RouteContext)
    const [selectedRouteIdx, setSelectedRouteIdx] = useState(0)
    // Reset the index if the routeDetails state have changed
    useEffect(() => {
        setSelectedRouteIdx(0)
    }, [state.routeDetails])
    const renderTransportIcons = (leg, textColor) => {
        let currentModes = []
        leg.steps.forEach(path => {
            // console.log("Paths: ", path)
            const { travel_mode } = path
            switch (travel_mode) {
                case "WALKING":
                    const exists = currentModes.find(currMode => currMode === "WALKING")
                    if (typeof exists === "undefined") {
                        currentModes.push("WALKING")
                    }

                    break
                case "TRANSIT":
                    console.log("Path: ", path)
                    const vehicleType = path.transit_details.line.vehicle.type
                    for (var transportMethod in TRANSPORT_MODE) {
                        const transportSubMode = TRANSPORT_MODE[transportMethod]
                        console.log(transportSubMode)
                        console.log("Travel mode: ", vehicleType)
                        const found = transportSubMode.find(subMode => vehicleType === subMode)
                        console.log("Found: ", found)
                        if (typeof found !== "undefined") {
                            const exists = currentModes.find(
                                currMode => currMode === transportMethod
                            )
                            if (typeof exists === "undefined") {
                                currentModes.push(transportMethod)
                            }
                        }
                    }
            }
        })
        console.log("Current modes: ", currentModes)
        return currentModes.map(currMode => {
            const modeStyle = {
                color: textColor,
            }
            switch (currMode) {
                case "BUS":
                    return <Icon style={modeStyle} name="bus" />
                case "TRAIN":
                    return <Icon style={modeStyle} name="train" />
                case "WALKING":
                    return <Icon style={modeStyle} name="man" />
            }
        })
    }
    const renderRouteText = (leg, selected) => {
        // const textColor = selected ? "#fff" : "transparent"
        const textColor = "#000"
        return (
            <Fragment>
                <Left>{renderTransportIcons(leg, textColor)}</Left>
                <Right style={{ width: 140 }}>
                    <Text style={{ color: textColor }}>{leg.duration.text}</Text>
                </Right>
            </Fragment>
        )
    }
    const renderRoutes = routeDetails => {
        return (
            <List
                style={{
                    marginRight: 10,
                    marginLeft: 10,
                    marginBottom: 5,
                }}
            >
                {routeDetails.map((route, idx) => (
                    <ListItem
                        itemDivider
                        noIndent
                        onPress={() => setSelectedRouteIdx(idx)}
                        style={{
                            // borderBottom: 0,
                            borderWidth: selectedRouteIdx === idx ? 2 : 0,
                            borderRadius: 2,
                            borderColor: selectedRouteIdx === idx ? "#000" : "transparent",
                        }}
                    >
                        {renderRouteText(route.legs[0], selectedRouteIdx === idx)}
                    </ListItem>
                ))}
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
                {state.routeDetails !== null && renderRoutes(state.routeDetails)}
                <Button
                    block
                    danger
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 10,
                    }}
                    onPress={() =>
                        navigation.navigate("Journey", {
                            journeyRoute: state.routeDetails[selectedRouteIdx],
                        })
                    }
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

export default withNavigation(BottomLocationBar)
