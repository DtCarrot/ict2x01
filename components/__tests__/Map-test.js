const getRoutes = (lat, lng) => {
    if(isNaN(parseFloat(lat) && isNaN(parseFloat(lng)))) {
        try {
            const apiKey = process.env.REACT_APP_GOOGLE_DIRECTION_API_KEY
            let resp = await fetch(directionUrl)
            let respJson = await resp.json()
            const routesList = respJson.routes.slice(0, 3).map(route => {
                let points = Polyline.decode(route.overview_polyline.points)
                let coords = points.map((point, index) => {
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

            return routesList
        } catch(err) {
            return {
                err: true,
                data: null,
            }
        }
    } else {
        return {
            err: true,
            data: null,
        }
    }
}

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

