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

function transformData(dataObj: any = user_inputs): any {
  
  const { R, P2, P1, P0, GWP, TFAC, CTE, U, SFOC, EMIS, FOD, vessel_coeficient, 
    year_coeficient, intercept, tonco_2, log_lsfo, alpha, beta } = dev_param;

  const { Tset, CHP, Dtrip, Tyear, Cargo, Tamb, HSFP, LSFP, REFCH, RLEAK, 
    vessel_type, year, maxcon, miles, util } = dataObj;

  // # Preprocessing

  

  // CD1<-ifelse(Tset<=-10,LSFP,HSFP) # (kWth) cooling demand 1 (evap fan heat)
  const CD1 = Tset <= -10 ? LSFP : HSFP; // (kWth) Cooling demand 1 (evaporator fan heat)

  // CD2<-U*(Tamb-Tset)/1000 # (kWth) cooling demand 2 (ambient heat)
  const CD2 = U * (Tamb - Tset) / 1000; // (kWth) Cooling demand 2 (ambient heat)

  // CD3<-CHP*Cargo/1000 # (kWth) cooling demand 3 (respiration)
  const CD3 = CHP * Cargo / 1000; // (kWth) Cooling demand 3 (respiration heat of the cargo)

  // CDT<-CD1+CD2+CD3 # (kWth) cooling demand
  const CDT = CD1 + CD2 + CD3; // (kWth) Total cooling demand (sum of all cooling demands)
  
  // COP<-array(rep(0,R), dim=c(R))  #COP      (kWth/kWe)
  const COP = new Array(R).fill(0); // COP (Coefficient of Performance) (kWth/kWe)

  // EPU<-array(rep(0,R), dim=c(R))  #electric power uptake (kWe)
  const EPU = new Array(R).fill(0); // Electric power uptake (kWe)
  

  // for(r in 1:R){
  //   COP[r]<-P0[r]*(P1[r]^Tset)*(P2[r]^Tamb)
  //   EPU[r]<-CDT/COP[r]+CD1
  // }

  for (let r = 0; r < R; r++) {
    // Calculate COP for each refrigerant
    COP[r] = P0[r] * (P1[r] ** Tset) * (P2[r] ** Tamb);
    // Calculate electric power uptake for each refrigerant
    EPU[r] = CDT / COP[r] + CD1;
  }

  

  // #Variables

  // IE<-array(rep(0,R), dim=c(R))   #indirect emissions (kg CO2eq)
  let IE = new Array(R).fill(0); // Indirect emissions (kg CO2eq)

  // DE<-array(rep(0,R), dim=c(R))   #direct emissions (kg CO2eq)
  let DE = new Array(R).fill(0); // Direct emissions (kg CO2eq)

  // TEWI<-array(rep(0,R), dim=c(R)) #TEWI (kg CO2eq)
  let TEWI = new Array(R).fill(0); // Total Equivalent Warming Impact (TEWI) (kg CO2eq)

  // TFAE<-array(rep(0,R), dim=c(R))  #TFA(PFAS)  (kg CO2eq)
  let TFAE = new Array(R).fill(0); // Total Fluorinated Alkyl Substances Equivalent (TFAE) (kg CO2eq)
  

  // for(r in 1:R){
  //   IE[r]<-CTE*Dtrip*SFOC*EMIS*EPU[r]/FOD
  //   DE[r]<-REFCH*RLEAK*GWP[r]/(100*Tyear)
  //   TEWI[r]<-IE[r]+DE[r]
  //   TFAE[r]<-REFCH*RLEAK*TFAC[r]/(100^2*Tyear)
  //     }
  for (let r = 0; r < R; r++) {
    // Indirect emissions calculation
    IE[r] = CTE * Dtrip * SFOC * EMIS * EPU[r] / FOD;
    // Direct emissions calculation
    DE[r] = REFCH * RLEAK * GWP[r] / (100 * Tyear);
    // Total Equivalent Warming Impact (TEWI) calculation
    TEWI[r] = IE[r] + DE[r];
    // Total Fluorinated Alkyl Substances Equivalent (TFAE) calculation
    TFAE[r] = REFCH * RLEAK * TFAC[r] / (100 ** 2 * Tyear);
  }

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

  function tonnes() {
    // if (user_inputs.vessel_type === 'container_ship') {
      return maxcon * util
        * Math.exp(0.7 + 0.2 * Math.log(maxcon * util + 1));
    // }
    // return user_inputs.maxcap * routes[r_idx].util;
  }

  function fuel_factor() {
    return miles ** (alpha - 1)
      * tonnes() ** (beta - 1);
  }

  function cf_calc() {
    return cf() / fuel_factor();
  }




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

