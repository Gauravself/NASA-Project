const launches = new Map();

let serialFlights = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["Gaurav", "ISRO"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchID(launchId){
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

//Add new launch with some details already at server and rest from client
function addNewLaunches(launch) {
  serialFlights++;
  launches.set(
    serialFlights,
    //Use this Object.assign to join both details in 1 object
    Object.assign(launch, {
      flightNumber: serialFlights,
      customer: ["Gaurav", "ISRO"],
      upcoming: true,
      success: true,
    })
  );
}

//Abort Launch by Id
function abortLaunchId(launchId){
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

module.exports = {
  existsLaunchID,
  getAllLaunches,
  addNewLaunches,  
  abortLaunchId,
};
