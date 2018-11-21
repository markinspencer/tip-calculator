import * as R from "ramda";

const ACTIONS = {
  BILL_VALUE_INPUT: "BILL_VALUE_INPUT",
  TIP_PERCENTAGE_INPUT: "TIP_PERCENTAGE_INPUT"
};

export const billValueInputAction = value => {
  return {
    type: ACTIONS.BILL_VALUE_INPUT,
    value
  };
};

export const tipPercentageInputAction = value => {
  return {
    type: ACTIONS.TIP_PERCENTAGE_INPUT,
    value
  };
};

const update = (action, model) => {
  switch (action.type) {
    case ACTIONS.BILL_VALUE_INPUT: {
      if (action.value === "")
        return { ...model, tip: "", bill: "", total: "" };

      const bill = toFloat(action.value);
      return calculateTip({ ...model, bill });
    }

    case ACTIONS.TIP_PERCENTAGE_INPUT: {
      if (action.value === "")
        return { ...model, tip: "", tipPercentage: "", total: "" };

      const tipPercentage = toFloat(action.value);
      return calculateTip({ ...model, tipPercentage });
    }

    default: {
      return model;
    }
  }
};

const calculateTip = model => {
  const { bill, tipPercentage } = model;

  const tip = bill * (tipPercentage / 100);
  const total = bill + tip;

  console.log(bill, tipPercentage, tip, total);
  return {
    bill,
    tipPercentage,
    tip,
    total
  };
};

const toFloat = R.pipe(
  parseFloat,
  R.defaultTo(0)
);

export default update;
