import { user_inputs, dev_param } from './data.js';



// const user_inputs: UserInputs = {
//   vessel_type: 'gas_carrier', // Example default value
//   year: 2000, // Example default value
// };


// const vessel_coeficients = {
//   gas_carrier: 0.0,
//   tanker: -0.7069,
//   container_ship: -3.00172,
//   bulk_carrier: -0.96619,
// };

// const vessel_year = {
//   1990: 0.32582,
//   2000: 0.387301,
//   2010: 0.330991,
//   2015: 0,
// };


function cf(
  year: number = user_inputs.year,
): number {
  let log_year = 0;
  switch (true) {
    case year >= 2015:
      log_year = dev_param.year_coeficient[2015];
      break;
    case year >= 2010:
      log_year = dev_param.year_coeficient[2010];
      break;
    case year >= 2000:
      log_year = dev_param.year_coeficient[2000];
      break;
    case year >= 1990:
      log_year = dev_param.year_coeficient[1990];
      break;
    default:
      log_year = dev_param.year_coeficient[1990];
      break;
  }
  const { intercept, log_lsfo, vessel_coeficient } = dev_param;
  return (Math.exp(intercept + log_lsfo) * 2 ** (log_year + vessel_coeficient))
      / (dev_param.tonco_2.vlsfo / 1000);
}



// /**
//  * @function tonnes
//  * @description Calculates the tonnes of cargo for a given route.
//  * @param {number} r_idx - The index of the route.
//  * @returns {number} The tonnes of cargo for the given route.
//  */
// function tonnes(r_idx) {
//   if (user_inputs.vessel_type === 'container_ship') {
//     return user_inputs.maxcon * routes[r_idx].util
//       * Math.exp(0.7 + 0.2 * Math.log(user_inputs.maxcon * routes[r_idx].util + 1));
//   }
//   return user_inputs.maxcap * routes[r_idx].util;
// }

// /**
//  * @function fuel_factor
//  * @param {number} r_idx - The index of the route.
//  * @returns {number} The fuel factor.
//  */
// function fuel_factor(r_idx) {
//   return routes[r_idx].miles ** (dev_param.alpha - 1)
//     * tonnes(r_idx) ** (dev_param.beta - 1);
// }

// /**
//  * @function cf_calc
//  * @param {number} r_idx - The index of the route.
//  * @returns {number} The calculated fuel consumption factor.
//  */
// function cf_calc(r_idx) {
//   return routes[r_idx].cf / fuel_factor(r_idx);
// }

