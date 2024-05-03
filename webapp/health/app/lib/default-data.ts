const england_2020 = {
    "life_satisfaction": 86.9,
    "healthy_eating": 97.3,
    "physical_activity": 100.5,
    "green_space": 99.9,
    "gp_distance": 99.4,
    "pharmacy_distance": 100,
    "sport_facility_distance": 99.5,
    "air_pollution": 114.6,
    "noise_complaints": 100.8,
    "road_safety": 102.8
}

const england_2019 = {
    "life_satisfaction": 100.7,
    "healthy_eating": 95.6,
    "physical_activity": 102.2,
    "green_space": 99.9,
    "gp_distance": 99.4,
    "pharmacy_distance": 100,
    "sport_facility_distance": 99.5,
    "air_pollution": 98.9,
    "noise_complaints": 100.8,
    "road_safety": 101.1
}

const england_2018 = {
    "life_satisfaction": 103.5,
    "healthy_eating": 96.1,
    "physical_activity": 100.3,
    "green_space": 99.9,
    "gp_distance": 99.8,
    "pharmacy_distance": 100.1,
    "sport_facility_distance": 99.6,
    "air_pollution": 99.3,
    "noise_complaints": 99.4,
    "road_safety": 100.8
}

const england_2017 = {
    "life_satisfaction": 102,
    "healthy_eating": 101.2,
    "physical_activity": 99.7,
    "green_space": 100,
    "gp_distance": 99.8,
    "pharmacy_distance": 100.1,
    "sport_facility_distance": 99.8,
    "air_pollution": 100,
    "noise_complaints": 99.4,
    "road_safety": 100.4
}

const england_2016 = {
    "life_satisfaction": 101.7,
    "healthy_eating": 100,
    "physical_activity": 100,
    "green_space": 100,
    "gp_distance": 99.9,
    "pharmacy_distance": 100,
    "sport_facility_distance": 100,
    "air_pollution": 95.5,
    "noise_complaints": 99.6,
    "road_safety": 100.1
}

const england_2015 = {
    "life_satisfaction": 100,
    "healthy_eating": 100,
    "physical_activity": 100,
    "green_space": 100,
    "gp_distance": 100,
    "pharmacy_distance": 100,
    "sport_facility_distance": 100,
    "air_pollution": 100,
    "noise_complaints": 100,
    "road_safety": 100
}

export const england_data = {
    2015: england_2015,
    2016: england_2016,
    2017: england_2017,
    2018: england_2018,
    2019: england_2019,
    2020: england_2020
}

export function get_england_array() {
    let result: (number[])[] = [];
    for (const key_t in england_data) {
        // console.log(key_t);
        const key = parseInt(key_t) as keyof typeof england_data;
        result.push(england_data[key] && get_inner_array(england_data[key]));
    }

    console.log(result);
    return result;
}

export function get_inner_array(x: typeof england_2015) {
    let result: (number)[] = [];
    for (const key_t in england_2015) {
        const key = key_t as keyof typeof england_2015;
        result.push(x[key]);
    }

    return result;
}

export const Keys: string[] = [
    "Life Satisfaction",
    "Healthy Eating",
    "Physical Activity",
    "Green Space",
    "Air Pollution",
    "Noise Complaints",
    "Road Safety"
]

export const standard_deviations = {
    2015: {
        "year": 2015,
        "life_satisfaction": 10.3106,
        "healthy_eating": 9.8802,
        "physical_activity": 9.6753,
        "green_space": 8.6016,
        "gp_distance": 10.3484,
        "pharmacy_distance": 9.5672,
        "sport_facility_distance": 10.1438,
        "air_pollution": 9.4486,
        "noise_complaints": 9.1127,
        "road_safety": 9.4775
    },
    2016: {
        "year": 2016,
        "life_satisfaction": 9.7558,
        "healthy_eating": 9.8804,
        "physical_activity": 9.6749,
        "green_space": 8.6015,
        "gp_distance": 10.3865,
        "pharmacy_distance": 9.5685,
        "sport_facility_distance": 10.1228,
        "air_pollution": 11.8897,
        "noise_complaints": 9.0471,
        "road_safety": 9.4892
    },
    2017: {
        "year": 2017,
        "life_satisfaction": 9.8004,
        "healthy_eating": 9.7739,
        "physical_activity": 10.2841,
        "green_space": 8.6015,
        "gp_distance": 10.4282,
        "pharmacy_distance": 9.5673,
        "sport_facility_distance": 10.0882,
        "air_pollution": 13.0658,
        "noise_complaints": 9.1724,
        "road_safety": 9.7175
    },
    2018: {
        "year": 2018,
        "life_satisfaction": 10.1304,
        "healthy_eating": 10.4171,
        "physical_activity": 10.6372,
        "green_space": 8.6019,
        "gp_distance": 10.4205,
        "pharmacy_distance": 9.5393,
        "sport_facility_distance": 10.0375,
        "air_pollution": 12.9352,
        "noise_complaints": 9.4793,
        "road_safety": 9.759
    },
    2019: {
        "year": 2019,
        "life_satisfaction": 9.8352,
        "healthy_eating": 10.8037,
        "physical_activity": 11.0193,
        "green_space": 8.6025,
        "gp_distance": 10.497,
        "pharmacy_distance": 9.5094,
        "sport_facility_distance": 10.0348,
        "air_pollution": 11.8233,
        "noise_complaints": 9.7657,
        "road_safety": 9.8417
    },
    2020: {
        "year": 2020,
        "life_satisfaction": 11.5855,
        "healthy_eating": 10.1449,
        "physical_activity": 11.6036,
        "green_space": 8.603,
        "gp_distance": 10.4979,
        "pharmacy_distance": 9.5098,
        "sport_facility_distance": 10.0357,
        "air_pollution": 9.3945,
        "noise_complaints": 9.7658,
        "road_safety": 9.8203
    }
}
