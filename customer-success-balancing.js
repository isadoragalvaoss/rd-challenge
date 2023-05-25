/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

function handleErrors(errors) {
  const { customerSuccess, customers, customerSuccessAway } = errors;
  const hasErrors = customerSuccess && customers && customerSuccessAway;

  if (!hasErrors) {
    throw new Error("Missing arguments for customerSuccessBalancing function.");
  }

  customerSuccess.forEach((css) => {
    const hasProperties = css.id && css.score;
    if (!hasProperties) {
      throw new Error(
        "Invalid CustomerSuccess object. Missing id or score property."
      );
    }
  });

  customers.forEach((customer) => {
    const hasProperties = customer.id && customer.score;
    if (!hasProperties) {
      throw new Error("Invalid Customer object. Missing id or score property.");
    }
  });
}

function getAvailableCustomerSuccess(allCustomerSuccess) {
  const { customerSuccess, customerSuccessAway } = allCustomerSuccess;
  return customerSuccess
    .filter((css) => !customerSuccessAway.includes(css.id))
    .map(({ id, score }) => ({ id, score, customers: [] }))
    .sort((a, b) => a.score - b.score);
}

function assignCustomersToCustomerSuccess(customers, availableCustomerSuccess) {
  let customerSuccessIndex = 0;
  const sortedCustomers = customers.sort((a, b) => a.score - b.score);

  sortedCustomers.forEach((customer) => {
    const customerSuccessIndexWithinBounds =
      customerSuccessIndex < availableCustomerSuccess.length;

    if (customerSuccessIndexWithinBounds) {
      const customerSuccess = availableCustomerSuccess[customerSuccessIndex];

      if (customer.score <= customerSuccess.score) {
        customerSuccess.customers.push(customer.id);
      } else customerSuccessIndex++;
    }
  });
}

function findHighestCustomerSuccessId(availableCustomerSuccess) {
  let maxCustomers = 0;
  let maxCustomerSuccessId = 0;

  availableCustomerSuccess.forEach((customerSuccess) => {
    const customersLength = customerSuccess.customers.length;

    if (customersLength > maxCustomers) {
      maxCustomers = customersLength;
      maxCustomerSuccessId = customerSuccess.id;
    } else if (customersLength === maxCustomers) {
      maxCustomers = 0;
    }
  });

  return maxCustomers === 0 ? 0 : maxCustomerSuccessId;
}

function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  handleErrors({ customerSuccess, customers, customerSuccessAway });

  const availableCustomerSuccess = getAvailableCustomerSuccess({
    customerSuccess,
    customerSuccessAway,
  });

  assignCustomersToCustomerSuccess(customers, availableCustomerSuccess);

  return findHighestCustomerSuccessId(availableCustomerSuccess);
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = mapEntities([60, 40, 95, 75]);
  const customers = mapEntities([90, 70, 20, 40, 60, 10]);
  const csAway = [2, 4];
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 9", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
  ];

  expect(() => customerSuccessBalancing(css, customers)).toThrow(
    "Missing arguments for customerSuccessBalancing function."
  );
});

test("Scenario 10", () => {
  const css = [{ id: 1 }, { id: 2 }];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
  ];
  const csAway = [2, 4];

  expect(() => customerSuccessBalancing(css, customers, csAway)).toThrow(
    "Invalid CustomerSuccess object. Missing id or score property."
  );
});

test("Scenario 11", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
  ];
  const customers = [{ score: 90 }, { score: 20 }];
  const csAway = [2, 4];

  expect(() => customerSuccessBalancing(css, customers, csAway)).toThrow(
    "Invalid Customer object. Missing id or score property."
  );
});
