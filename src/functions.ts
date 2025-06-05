import { user_inputs } from './data.js';


const vessel_coeficients = {
  gas_carrier: 0.0,
  tanker: -0.7069,
  container_ship: -3.00172,
  bulk_carrier: -0.96619,
};

const vessel_year = {
  1990: 0.32582,
  2000: 0.387301,
  2010: 0.330991,
  2015: 0,
};

/* eslint-disable prefer-destructuring */
/**
 * @function cf
 * @description Calculates the fuel consumption of a vessel based on its type and year.
 * @param {number} [v_coeff=vessel_coeficients[user_inputs.vessel_type]] -
 * The coefficient of the vessel type.
 * @param {number} [year=user_inputs.year] - The year of the vessel.
 * @returns {number} The fuel consumption of the vessel.
 */
function cf(
  v_coeff = vessel_coeficients[user_inputs.vessel_type],
  year = user_inputs.year,
) {
  let log_year = 0;
  switch (true) {
    case year >= 2015:
      log_year = vessel_year[2015];
      break;
    case year >= 2010:
      log_year = vessel_year[2010];
      break;
    case year >= 2000:
      log_year = vessel_year[2000];
      break;
    case year >= 1990:
      log_year = vessel_year[1990];
      break;
    default:
      log_year = vessel_year[1990];
      break;
  }
  const { intercept } = dev_param;
  const log_lsfo = 0.518828;
  return (Math.exp(intercept + log_lsfo) * 2 ** (log_year + v_coeff))
      / (dev_param.tonco_2.vlsfo / 1000);
}
