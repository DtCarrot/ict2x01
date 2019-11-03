const getRoutes = (startLat, startLng, endLat, endLng) => {

    if(isNaN(parseFloat(startLat)) && isNaN(parseFloat(startLng))) {
        return {
            err: true,
            data: null,
        }
    }

    if(isNaN(parseFloat(endLat)) && isNaN(parseFloat(endLng))) {
        return {
            err: true,
            data: null,
        }
    }

    const apiKey = process.env.REACT_APP_GOOGLE_DIRECTION_API_KEY
    const startLoc = `${startLat},${startLng}`
    const destinationLoc = `${endLat},${endLng}`
    const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?mode=transit&
        origin=${startLoc}&alternatives=true&destination=${destinationLoc}&key=${apiKey}`

    let resp = null
    try {
         resp = await fetch(directionUrl)
    } catch(err) {
        console.error('Failed in making API call to directions API')
        return {
            err: true,
            data: null,
        }
    }

    let respJson = await resp.json()
    const routesList = respJson.routes
    .map(route => {
        let points = Polyline.decode(route.overview_polyline.points)
        let coords = points
        .map((point, index) => {
            const pointCoords = {
                latitude: point[0],
                longitude: point[1],
            }
            fitCoords.push(pointCoords)
            return pointCoords
        })
        const routeObj = {
            ...route,
            overview_polyline: coords,
        }
        return routeObj
    })
    return routesList
}

expect('Get Routes', () => {

    test('Invoke getRoutes() with invalid value passed to startLat parameter', 
    () => {
        const response = getRoutes("ict2101", 100.222, 100.553, 100.901)
        expect(response.err).not.toBe(null)
    })

    test('Invoke getRoutes() with invalid value passed to endLat parameter', 
    () => {
        const response = getRoutes(102.55, 100.222, "ict2101", 100.901)
        expect(response.err).not.toBe(null)
    })

    test('Invoke getRoutes() with valid parameters', 
    () => {
        const response = getRoutes(1.3321, 103.7744, 1.3005, 103.7805)
        // There shall not be any error
        expect(response.err).toBe(null)
        // There should be at least one route from SIT@NYP to SIT@Dover
        expect(response.data.length.toBeGreaterthanEqual(1))
    })

    test('Invoke getRoutes() with valid parameters', 
    () => {
        // Set invalid API key to check - Expect the fetch to be sent to catch block in getRoutes()
        process.env.REACT_APP_GOOGLE_DIRECTION_API_KEY = "Invalid Key"
        const response = getRoutes(102.55, 100.222, 100.553, 100.901)
        expect(response.err).toBe(null)
    })

})

// const getRoutes = (lat, lng) => {
//     try {
//         const apiKey = process.env.REACT_APP_GOOGLE_DIRECTION_API_KEY
//         let resp = await fetch(directionUrl)
//         let respJson = await resp.json()
//         const routesList = respJson.routes.slice(0, 3).map(route => {
//             let points = Polyline.decode(route.overview_polyline.points)
//             let coords = points.map((point, index) => {
//                 const pointCoords = {
//                     latitude: point[0],
//                     longitude: point[1],
//                 }
//                 fitCoords.push(pointCoords)
//                 return pointCoords
//             })
//             const routeObj = {
//                 ...route,
//                 overview_polyline: coords,
//             }
//             return routeObj
//         })
//         return routesList
//     } catch(err) {
//         console.log(error)
//         return ({
//             err: true, 
//             data: null,
//         })
//     }
// }
// describe('Journey information', () => {
//     // Happy case where user can get GPS coordinate
//     test("User shall get valid GPS information",  () => {

//     }
//     // Unhappy case where user does not grant GPS permissio
//     test("User does not grant GPS position", () => {
//         // Download
//     })
    
//     test("User is unable to get current GPS coordinate", () => {

//     })
// }

