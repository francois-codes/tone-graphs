import * as R from "ramda";
import { useReducer } from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv2json = require("../data/csv2json");

enum ACTIONS {
  SET_NAME,
  SET_DATAPOINTS,
  RESET,
}

type Action = (text: string) => void;

const actionCreator = R.curry((dispatch, type, payload) => dispatch({ type, payload }));

const initialState: Pedal = {
  id: "pedal_preview",
  color: "#343536",
  name: "",
  brand: "",
  image: "",
  datapoints: [],
  selected: true,
  visible: true,
};

function computeDataPoints(text: string): DataPoint[] {
  (text) => console.log("added datapoints", { text });
  return csv2json(text);
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NAME:
      return R.mergeDeepRight(state, { name: action.payload });
    case ACTIONS.SET_DATAPOINTS:
      return R.mergeDeepRight(state, { datapoints: computeDataPoints(action.payload) });
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
};

export function usePreviewData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setName: Action = actionCreator(dispatch, ACTIONS.SET_NAME);
  const setDatapoints: Action = actionCreator(dispatch, ACTIONS.SET_DATAPOINTS);
  const resetState = () => dispatch({ type: ACTIONS.RESET });

  return {
    state,
    setName,
    setDatapoints,
    resetState,
  };
}
