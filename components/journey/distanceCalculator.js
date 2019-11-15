import { getPreciseDistance, getCompassDirection } from "geolib"

const checkDistance = ({ currLat, currLng }, { lat: pointLat, lng: pointLng }) => {
    const distance = getPreciseDistance(
        {
            latitude: currLat,
            longitude: currLng,
        },
        {
            latitude: pointLat,
            longitude: pointLng,
        }
    )
    return distance
}

const checkAllDistance = (journeyDetails, { currLat, currLng }) => {
    let distanceList = []
    console.log("Curr lat: ", currLat, currLng)
    journeyDetails.legs[0].steps.forEach((obj, idx) => {
        if ("steps" in obj) {
            // If there is a key
            const innerSteps = obj.steps
            innerSteps.forEach((innerStep, innerStepIdx) => {
                const {
                    end_location: { lat, lng },
                } = innerStep
                console.log("Lat: ", lat, "Lng: ", lng)
                const distance = checkDistance(
                    {
                        currLat,
                        currLng,
                    },
                    {
                        lat,
                        lng,
                    }
                )
                distanceList.push({
                    distance: distance,
                    outerStep: idx,
                    innerStep: innerStepIdx,
                })
                console.log("Distance: ", distance)
            })
        } else {
            const {
                end_location: { lat, lng },
            } = obj
            console.log("MRT Lat: ", lat, "Lng: ", lng)
            const distance = checkDistance(
                {
                    currLat,
                    currLng,
                },
                {
                    lat,
                    lng,
                }
            )
            distanceList.push({
                distance: distance,
                innerStep: null,
                outerStep: idx,
            })
            console.log("Distance: ", distance)
        }
    })
    const closeDistanceList = distanceList.filter(obj => {
        const { distance } = obj
        if (distance < 30) {
            return true
        }
        return false
    })
    console.log("Close Distance List: ", closeDistanceList)
    return closeDistanceList
}

export { checkAllDistance }
