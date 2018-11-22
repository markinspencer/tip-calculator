import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import { billInputAction, tipPercentInputAction } from "./Update";

const { div, h1, pre, label, input, span } = hh(h);

const round = places =>
  R.pipe(
    num => num * 10 ** places,
    Math.round,
    num => num * 10 ** (-1 * places)
  );

const formatCurrency = R.curry((symbol, places, number) => {
  return R.pipe(
    R.defaultTo(0),
    round(places),
    num => num.toFixed(places),
    R.concat(symbol)
  )(number);
});

const calcTipAndTotal = (billAmount, tipPercent) => {
  const bill = parseFloat(billAmount);
  const tip = (bill * parseFloat(tipPercent)) / 100 || 0;
  return [tip, bill + tip];
};

const inputSet = (labelText, value, inputAction) => {
  return div({ className: "mb3 w-60" }, [
    label({ className: "db mb1 b f5" }, labelText),
    input(
      {
        className: "pa2 tr db",
        value: value,
        oninput: e => inputAction(e.target.value)
      },
      value
    )
  ]);
};

const labelSet = (labelText, value) =>
  div({ className: "w-60 mv2" }, [
    span({ className: "b" }, labelText),
    span({ className: "fr" }, value)
  ]);

const view = (dispatch, model) => {
  const { bill, tipPercent } = model;

  const [tip, total] = calcTipAndTotal(bill, tipPercent);
  const toMoney = formatCurrency("$", 2);

  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Tip Calculator"),
    inputSet("Bill Amount", model.bill, value =>
      dispatch(billInputAction(value))
    ),
    inputSet("Tip %", model.tipPercent, value =>
      dispatch(tipPercentInputAction(value))
    ),
    labelSet("Tip:", toMoney(tip)),
    labelSet("Total:", toMoney(total)),
    pre(JSON.stringify(model, null, 2)) //Only for development
  ]);
};

export default view;
