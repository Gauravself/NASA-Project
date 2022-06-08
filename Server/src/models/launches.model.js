const axios = require("axios");
const { response } = require("../app");
const { updateOne, updateMany } = require("./launches.mongo");
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

// const launches = new Map();

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  console.log("Downloading Launch Data");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status != 200) {
    console.log("Problem occured in downloading data");
    throw new Error("Launch data download failed");
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customer: customers,
    };
    await saveLaunch(launch);
  }
}

const loadLaunchData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch already exists");
  } else {
    await populateLaunches();
  }
};

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

const LATEST_FLIGHT_NUM = 100;

//Get latest Launches flightNumber
async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne({}).sort("-flightNumber");
  if (!latestLaunch) {
    return LATEST_FLIGHT_NUM;
  }
  return latestLaunch.flightNumber;
}

//Get All Launches from DB
async function getAllLaunches(skip, limit) {
  return await launches
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

//Save new Launches to DB
async function saveLaunch(launch) {
  try {
    await launches.findOneAndUpdate(
      {
        //Check if data already exists
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Launch saving to DB failed with Err -> ${err}`);
  }
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new error("No Matching Planet Found");
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    customer: ["Gaurav", "ISRO"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function existsLaunchID(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

//Abort Launch by Id
async function abortLaunchId(launchId) {
  // const aborted = launches.get(launchId);
  // aborted.success = false;
  // aborted.upcoming = false;
  // return aborted;
  const abortF = await launches.updateOne(
    { flightNumber: launchId },
    { $set: { success: false, upcoming: false } }
  );
  return abortF.modifiedCount === 1;
}

module.exports = {
  loadLaunchData,
  existsLaunchID,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchId,
};
