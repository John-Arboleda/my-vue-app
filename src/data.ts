
const user_inputs = {
  vessel_type: 'container_ship',
  maxcon: 20000,
  year: 2008,
  nv: 10,
  length: 289,
  draft: 15,
  width: 48,
  height: 25,
  freeboard: 10,
  ody: 300,
  tir: 0.105,
  coal: 40,
  t_coal: {
    low: 0.05,
    high: 0.10,
  },
  m_fuel: {
    hsfo: 500,
    mgo: 900,
    mdo: 900,
    vlsfo: 600,
    lng: 1100,
  },
  p_fuel: {
    hsfo: 0.1,
    mgo: 0.2,
    mdo: 0.2,
    vlsfo: 0.2,
    lng: 0.3,
  },
  sub: 0.20,
  capex: {
    flettner_rotor: 200000,
    suction_wing: 150000,
    rigid_sail: 100000,
    kite: 50000,
  },
  sday: {
    flettner_rotor: 30,
    suction_wing: 15,
    rigid_sail: 15,
    kite: 5,
  },
  cm_1: {
    flettner_rotor: 30000,
    suction_wing: 10000,
    rigid_sail: 10000,
    kite: 20000,
  },
  cm_2: {
    flettner_rotor: 45000,
    suction_wing: 15000,
    rigid_sail: 15000,
    kite: 30000,
  },
  oet: {
    flettner_rotor: 0,
    suction_wing: 0,
    rigid_sail: 0,
    kite: 0,
  },
  nk: {
    flettner_rotor: 10,
    suction_wing: 10,
    rigid_sail: 10,
    kite: 5,
  },
  q: {
    flettner_rotor: 2,
    suction_wing: 6,
    rigid_sail: 4,
    kite: 1,
  },
  a_tech: {
    flettner_rotor: 500,
    suction_wing: 500,
    rigid_sail: 500,
    kite: 500,
  },
  unmount: {
    flettner_rotor: 0,
    suction_wing: 0,
    rigid_sail: 0,
    kite: 0,
  },
};

const dev_param = {
  inf: {
    low: 0.02,
    high: 0.12,
  },
  delta: {
    hsfo: {
      low: 0.05,
      high: 0.25,
    },
    mgo: {
      low: 0.05,
      high: 0.25,
    },
    mdo: {
      low: 0.05,
      high: 0.25,
    },
    vlsfo: {
      low: 0.05,
      high: 0.25,
    },
    lng: {
      low: 0.05,
      high: 0.25,
    },
  },
  r_air: 1.29,
  r_water: 1025,
  c_wind: {
    gas_carrier: 1.02,
    tanker: 0.96,
    container_ship: 0.46,
    bulk_carrier: 0.96,
  },
  c_sea: {
    gas_carrier: 0.04,
    tanker: 0.04,
    container_ship: 0.04,
    bulk_carrier: 0.04,
  },
  c_tech: {
    flettner_rotor: 3.1,
    suction_wing: 1.4,
    rigid_sail: 2.0,
    kite: 1.2,
  },
  power_s: {
    flettner_rotor: 1,
    suction_wing: 1,
    rigid_sail: 1,
    kite: 1,
  },
  tonco_2: {
    hsfo: 3114,
    mgo: 3206,
    mdo: 3206,
    vlsfo: 3151,
    lng: 2750,
  },
  sfoc: {
    hsfo: 0.97,
    mgo: 1.03,
    mdo: 1.05,
    vlsfo: 1.00,
    lng: 1.15,
  },
  intercept: 9.316642,
  alpha: 0.837778,
  beta: 0.686491,
  gamma: 0.1452,
};

// function setVesselType(vessel_type) {
//   if (vessel_type === 'container_ship') {
//     delete user_inputs.maxcap;
//     user_inputs.maxcon = 20000;
//     dev_param.beta = 0.686491;
//   } else {
//     delete user_inputs.maxcon;
//     user_inputs.maxcap = 140000;
//     dev_param.beta = 0.490780;
//   }
// }

export { user_inputs, dev_param }