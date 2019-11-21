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
    journeyDetails.legs[0].steps.forEach((obj, idx) => {
        if ("steps" in obj) {
            // If there is a key
            const innerSteps = obj.steps
            innerSteps.forEach((innerStep, innerStepIdx) => {
                const {
                    end_location: { lat, lng },
                } = innerStep
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
            })
        } else {
            const {
                end_location: { lat, lng },
            } = obj
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
        }
    })
    const closeDistanceList = distanceList.filter(obj => {
        const { distance } = obj
        if (distance < 30) {
            return true
        }
        return false
    })
    return closeDistanceList
}

const checkReachedDestination = (journeyDetails, { currLat, currLng }) => {
    const {
        end_location: { lat: endLat, lng: endLng },
    } = journeyDetails.legs[0]
    const distance = getPreciseDistance(
        {
            latitude: currLat,
            longitude: currLng,
        },
        {
            latitude: endLat,
            longitude: endLng,
        }
    )
    console.log("Distance away: ", distance)
    // Reached destination
    if (distance < 30) {
        console.log("Reached destination")
        return true
    }
    console.log("Have not reached destination")
    return false
}

const computeTimeAndDistanceLeft = journeyDetails => {
    let distanceLeft = 0
    let durationLeft = 0
    journeyDetails.legs[0].steps.forEach((obj, idx) => {
        if ("steps" in obj) {
            // If there is a key
            const innerSteps = obj.steps
            innerSteps.forEach((innerStep, innerStepIdx) => {
                const {
                    distance: { value: distance },
                    duration: { value: duration },
                } = innerStep
                distanceLeft += distance
                durationLeft += duration
            })
        } else {
            const {
                distance: { value: distance },
                duration: { value: duration },
            } = obj
            distanceLeft += distance
            durationLeft += duration
        }
    })
    return {
        distanceLeft,
        durationLeft,
    }
}

export { checkAllDistance, checkReachedDestination, computeTimeAndDistanceLeft }
