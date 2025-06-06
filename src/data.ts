



// const user_inputs: UserInputs = {
//   vessel_type: 'container_ship',
//   maxcon: 20000,
//   year: 2008,
//   nv: 10,
//   length: 289,
//   draft: 15,
//   width: 48,
//   height: 25,
//   freeboard: 10,
//   ody: 300,
//   tir: 0.105,
//   coal: 40,
//   t_coal: {
//     low: 0.05,
//     high: 0.10,
//   },
//   m_fuel: {
//     hsfo: 500,
//     mgo: 900,
//     mdo: 900,
//     vlsfo: 600,
//     lng: 1100,
//   },
//   p_fuel: {
//     hsfo: 0.1,
//     mgo: 0.2,
//     mdo: 0.2,
//     vlsfo: 0.2,
//     lng: 0.3,
//   },
//   sub: 0.20,
//   capex: {
//     flettner_rotor: 200000,
//     suction_wing: 150000,
//     rigid_sail: 100000,
//     kite: 50000,
//   },
//   sday: {
//     flettner_rotor: 30,
//     suction_wing: 15,
//     rigid_sail: 15,
//     kite: 5,
//   },
//   cm_1: {
//     flettner_rotor: 30000,
//     suction_wing: 10000,
//     rigid_sail: 10000,
//     kite: 20000,
//   },
//   cm_2: {
//     flettner_rotor: 45000,
//     suction_wing: 15000,
//     rigid_sail: 15000,
//     kite: 30000,
//   },
//   oet: {
//     flettner_rotor: 0,
//     suction_wing: 0,
//     rigid_sail: 0,
//     kite: 0,
//   },
//   nk: {
//     flettner_rotor: 10,
//     suction_wing: 10,
//     rigid_sail: 10,
//     kite: 5,
//   },
//   q: {
//     flettner_rotor: 2,
//     suction_wing: 6,
//     rigid_sail: 4,
//     kite: 1,
//   },
//   a_tech: {
//     flettner_rotor: 500,
//     suction_wing: 500,
//     rigid_sail: 500,
//     kite: 500,
//   },
//   unmount: {
//     flettner_rotor: 0,
//     suction_wing: 0,
//     rigid_sail: 0,
//     kite: 0,
//   },
// };

// const dev_param = {
//   inf: {
//     low: 0.02,
//     high: 0.12,
//   },
//   delta: {
//     hsfo: {
//       low: 0.05,
//       high: 0.25,
//     },
//     mgo: {
//       low: 0.05,
//       high: 0.25,
//     },
//     mdo: {
//       low: 0.05,
//       high: 0.25,
//     },
//     vlsfo: {
//       low: 0.05,
//       high: 0.25,
//     },
//     lng: {
//       low: 0.05,
//       high: 0.25,
//     },
//   },
//   r_air: 1.29,
//   r_water: 1025,
//   c_wind: {
//     gas_carrier: 1.02,
//     tanker: 0.96,
//     container_ship: 0.46,
//     bulk_carrier: 0.96,
//   },
//   c_sea: {
//     gas_carrier: 0.04,
//     tanker: 0.04,
//     container_ship: 0.04,
//     bulk_carrier: 0.04,
//   },
//   c_tech: {
//     flettner_rotor: 3.1,
//     suction_wing: 1.4,
//     rigid_sail: 2.0,
//     kite: 1.2,
//   },
//   power_s: {
//     flettner_rotor: 1,
//     suction_wing: 1,
//     rigid_sail: 1,
//     kite: 1,
//   },
//   tonco_2: {
//     hsfo: 3114,
//     mgo: 3206,
//     mdo: 3206,
//     vlsfo: 3151,
//     lng: 2750,
//   },
//   sfoc: {
//     hsfo: 0.97,
//     mgo: 1.03,
//     mdo: 1.05,
//     vlsfo: 1.00,
//     lng: 1.15,
//   },
//   intercept: 9.316642,
//   alpha: 0.837778,
//   beta: 0.686491,
//   gamma: 0.1452,
// };

interface DevParam {
  vessel_coeficient: number,
  intercept: number, 
  log_lsfo: number,
  tonco_2: {
    hsfo: number,
    mgo: number,
    mdo: number,
    vlsfo: number,
    lng: number,
  },
  year_coeficient: {
    1990: number,
    2000: number, 
    2010: number,
    2015: number,
  },
}

const dev_param: DevParam = {
  vessel_coeficient: -3.00172,
  year_coeficient: {
    1990: 0.32582,
    2000: 0.387301,
    2010: 0.330991,
    2015: 0,
  },
  intercept: 9.316642,
  tonco_2: {
    hsfo: 3114,
    mgo: 3206,
    mdo: 3206,
    vlsfo: 3151,
    lng: 2750,
  },
  log_lsfo: 0.518828,

};



// R<-7 #Refrigerant: (1)R134a, (2)R1234yf, (3)R404A              (4)R290(propane), (5)R744(CO2), (6)R513A, (7)R452A
const R = 7; // Number of refrigerants
 

// # Param developer

 

// P2<- c( 0.971571209 , 0.969905703 , 0.96903187  , 0.971809764 , 0.954954826 , 0.96319383  , 0.971000781 )
const P2 = [0.971571209, 0.969905703, 0.96903187, 0.971809764, 0.954954826, 0.96319383, 0.971000781]; // P2<- (Tamb) temperature coefficient (°C)

// P1<- c( 1.025144054 , 1.025463061 , 1.024725567 , 1.025095166 , 1.025653297 , 1.027336462 , 1.029427679 )
const P1 = [1.025144054, 1.025463061, 1.024725567, 1.025095166, 1.025653297, 1.027336462, 1.029427679]; // P1<- (Tset) temperature coefficient (°C)

// P0<- c( 6.810744155 , 6.874643935 , 6.784852929 , 6.749699246 , 7.946898738 , 6.78735991  , 4.834798211 )
const P0 = [6.810744155, 6.874643935, 6.784852929, 6.749699246, 7.946898738, 6.78735991, 4.834798211]; // P0<- (kWth/kWe) power coefficient (kWth/kWe)
 

// GWP<-c(1530,            0.501, 4728,  0.02,    1,          673,     2292) #refrigerant's GWP    (kg CO2eq/kg)
const GWP = [1530, 0.501, 4728, 0.02, 1, 673, 2292]; // GWP<- (kg CO2eq/kg) refrigerant's GWP (Global Warming Potential)

// TFAC<-c(20.0,             100.0, 6.0,      0.0,      0.0,      64.8,   30.0) #refrigerant's TFA (PFAS) content    (%)
const TFAC = [20.0, 100.0, 6.0, 0.0, 0.0, 64.8, 30.0]; // TFAC<- (%/kg) refrigerant's TFA (PFAS) content (Total Fluorinated Alkyl Substances)
 

// # Physic params

// CTE<-24
const CTE = 24; // (kg CO2eq)/(kWh) carbon intensity of electricity (kg CO2eq/kWh)

// U<-       54         #           (W/°C)               U
const U = 54; // (W/°C) U value of the refrigerated container (thermal transmittance)

// SFOC<-            230      #            (g/kWh)            Specific Fuel Oil Consumption
const SFOC = 230; // (g/kWh) Specific Fuel Oil Consumption (SFOC)

// EMIS<-              2.65     #            (kg CO2)/(L fuel oil)   Specific CO2 emission
const EMIS = 2.65; // (kg CO2)/(L fuel oil) Specific CO2 emission

// FOD<- 950      #           (kg/m3)             Fuel oil density
const FOD = 950; // (kg/m3) Fuel oil density
 





// # Input variables (param users)

interface UserInputs {
  vessel_type: 'gas_carrier' | 'tanker' | 'container_ship' | 'bulk_carrier';
  year: number;
}

const user_inputs: UserInputs = {
  vessel_type: 'container_ship', 
  year: 2000,

};

// # List

// Tset<- 0            #           (°C)      Tset inside
const Tset = 0; // (°C) Tset inside (set temperature inside the refrigerated container)

// CHP<- 35         #           (W/tonne)        cargo heat production
const CHP = 35; // (W/tonne) cargo heat production (respiration heat of the cargo)

// Dtrip<-              21         #            (days)  duration of trip
const Dtrip = 21; // (days) duration of trip
 

 

// # Route params

// Tyear<-             5           #            (trips/year)      no. of trips per year
const Tyear = 5; // (trips/year) no. of trips per year

// Cargo<-            15         #            (tonnes/refer) amount of cargo
const Cargo = 15; // (tonnes/refer) amount of cargo (cargo weight in tonnes per refrigerated container)

// Tamb<-             38         #            (°C)      Temperatura ambiente (outside)
const Tamb = 38; // (°C) Ambient temperature (outside temperature)

 

 

// # Refer configuration

// HSFP<-             1.5       #            (kWe)  Speed evap fan power
const HSFP = 1.5; // (kWe) Speed evap fan power (high speed evaporator fan power)

// LSFP<-              0.4       #            (kWe)  low speed evap fan power
const LSFP = 0.4; // (kWe) Low speed evap fan power (low speed evaporator fan power)

// REFCH<-         5           #            (kg)       refrigerant charge per year
const REFCH = 5; // (kg) Refrigerant charge per year (amount of refrigerant charge in kg)

// RLEAK<-           15         #            (%/year)           refrigerant leak rate
const RLEAK = 15; // (%/year) Refrigerant leak rate (percentage of refrigerant leak per year)
 

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
  COP[r] = P0[r] * (P1[r] ** Tset) * (P2[r] ** Tamb);
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
  IE[r] = CTE * Dtrip * SFOC * EMIS * EPU[r] / FOD;
  DE[r] = REFCH * RLEAK * GWP[r] / (100 * Tyear);
  TEWI[r] = IE[r] + DE[r];
  TFAE[r] = REFCH * RLEAK * TFAC[r] / (100 ** 2 * Tyear);
}

export { user_inputs, dev_param }