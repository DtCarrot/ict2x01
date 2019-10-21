import React, { useRef } from "react"
import { Text } from "native-base"
import { View } from "react-native"
import MapView from "react-native-maps"

const JourneyScreen = () => {
    const mapRef = useRef(null)
    const getLayout = async () => {
        if (mapRef.current !== null) {
            const camera = await mapRef.current.getCamera()
            console.log("Camera: ", camera)
        }
    }
    return (
        <View
            style={{
                flex: 1,
                zIndex: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ecf0f1",
            }}
        >
            <MapView
                ref={mapRef}
                camera={{
                    center: {
                        latitude: 39.2741004,
                        longitude: -76.6502307,
                    },
                    pitch: 90,
                    heading: 72,
                    zoom: 18,
                    altitude: 10,
                }}
                style={{ zIndex: 200, alignSelf: "stretch", flex: 1 }}
                onLayout={() => getLayout()}
                // mapType="satellite"
                initialRegion={{
                    latitude: 39.2741004,
                    longitude: -76.6502307,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.001,
                }}
            ></MapView>
        </View>
    )
}

export default JourneyScreen
