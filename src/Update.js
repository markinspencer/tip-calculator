const ACTIONS = {
  BILL_VALUE_INPUT: "BILL_VALUE_INPUT",
  TIP_PERCENT_INPUT: "TIP_PERCENT_INPUT"
};

export const billInputAction = bill => {
  return {
    type: ACTIONS.BILL_VALUE_INPUT,
    bill
  };
};

export const tipPercentInputAction = tipPercent => {
  return {
    type: ACTIONS.TIP_PERCENT_INPUT,
    tipPercent
  };
};

const update = (action, model) => {
  switch (action.type) {
    case ACTIONS.BILL_VALUE_INPUT: {
      const { bill } = action;
      return { ...model, bill };
    }

    case ACTIONS.TIP_PERCENT_INPUT: {
      const { tipPercent } = action;
      return { ...model, tipPercent };
    }

    default: {
      return model;
    }
  }
};

export default update;
