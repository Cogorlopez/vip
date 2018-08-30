import { GET_ERRORS } from "./types";
import axios from "axios";

//Authentication via AD
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5050/api/users/adlogin", userData, {
      crossdomain: true
    })
    .then(res => {
      res.data === true
        ? this.props.history.push("/drawingsearch")
        : dispatch({
            type: GET_ERRORS,
            payload: res
          });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
