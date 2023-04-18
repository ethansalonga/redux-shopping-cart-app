import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-shopping-cart-358b9-default-rtdb.firebaseio.com/cartItems.json"
      )
      const data = await res.json()
      return data
    }

    try {
      const cartData = await fetchHandler()
      dispatch(cartActions.replaceData(cartData))
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request to fetch data failed",
          type: "error",
        })
      )
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending request",
        type: "warning",
      })
    )

    const sendRequest = async () => {
      // Send state as Sending request
      const res = await fetch(
        "https://redux-shopping-cart-358b9-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      )

      const data = await res.json()
      // Send state as Success
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent request to database successfully",
          type: "success",
        })
      )
    }

    try {
      await sendRequest()
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request failed",
          type: "error",
        })
      )
    }
  }
}
