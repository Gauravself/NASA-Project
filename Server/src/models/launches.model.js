const { updateOne, updateMany } = require("./launches.mongo");
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

// const launches = new Map();

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
async function getAllLaunches() {
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

//Save new Launches to DB
async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new error("No Matching Planet Found");
  }
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
  return await launches.findOne({
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
  existsLaunchID,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchId,
};
