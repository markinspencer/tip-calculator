import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import { billValueInputAction, tipPercentageInputAction } from "./Update";

const { div, h1, pre, label, input, span } = hh(h);

const inputSet = (dispatch, labelText, value, inputAction) => {
  return div({ className: "mb3 w-60" }, [
    label({ className: "db mb1 b f5" }, labelText),
    input(
      {
        className: "pa2 tr db",
        value: value,
        oninput: e => dispatch(inputAction(e.target.value))
      },
      value
    )
  ]);
};

const labelSet = (labelText, value) =>
  div({ className: "w-60 mv2" }, [
    span({ className: "b" }, labelText),
    span({ className: "fr" }, `$${value}`)
  ]);

const view = (dispatch, model) => {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Tip Calculator"),
    inputSet(dispatch, "Bill Amount", model.bill, value =>
      billValueInputAction(value)
    ),
    inputSet(dispatch, "Tip %", model.tipPercentage, value =>
      tipPercentageInputAction(value)
    ),
    labelSet("Tip:", model.tip),
    labelSet("Total:", model.total),
    pre(JSON.stringify(model, null, 2)) //Only for development
  ]);
};

export default view;
