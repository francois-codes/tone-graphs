import { getDataKey } from "./settings";

import * as R from "ramda";

const NA = "NA";
const DATAPOINTS = "datapoints";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inspect = (msg) => R.tap((x) => console.log(msg, x));

const getFirstProp = (data) => R.compose(R.prop(R.__, data), R.head, R.keys)(data);

const toNumberValue = R.compose(Number, R.replace("%", ""));
const toStringValue = (val) => `${val}%`;

const getNearestProp = R.curry((value, data) => {
  const numberValue = toNumberValue(value);
  const numberKeys = R.compose(R.sort(R.subtract), R.map(toNumberValue), R.keys)(data);
  const nearestKeyIndex = R.findLastIndex((k) => k < numberValue, numberKeys);
  const nearestPropName = toStringValue(numberKeys[nearestKeyIndex]);

  return R.prop(nearestPropName, data) || getFirstProp(data);
});

export const getPropOrFirst = (value) =>
  R.cond([
    [R.has(value), R.prop(value)],
    [R.has(NA), R.prop(NA)],
    [R.T, getNearestProp(value)],
  ]);

const groupByProp = (prop) => R.groupBy(R.prop(prop));
const groupByTone = groupByProp("tone");
const groupByGain = groupByProp("gain");

const updateDataPoints = (pedal) =>
  R.evolve(
    {
      datapoints: R.map(
        R.compose(
          (datapoint) => R.assoc(getDataKey(pedal), datapoint.db, datapoint),
          (datapoint) => R.assoc("id", pedal.id, datapoint),
        ),
      ),
    },
    pedal,
  );

export const getGraphData = (select, pedals) =>
  R.compose(
    R.apply(R.concat),
    R.map(R.compose(select, R.mapObjIndexed(groupByGain), groupByTone, R.propOr([], DATAPOINTS), updateDataPoints)),
  )(pedals);
