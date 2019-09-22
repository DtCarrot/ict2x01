// NavigationService.js

import { NavigationActions, DrawerActions } from "react-navigation"

let _navigator

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    )
}

function toggleDrawer() {
    _navigator.dispatch(DrawerActions.toggleDrawer())
}

// add other navigation functions that you need and export them

export default {
    navigate,
    toggleDrawer,
    setTopLevelNavigator,
}
