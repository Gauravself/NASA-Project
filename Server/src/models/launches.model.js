const launches = new Map();

let serialFlights = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["Gaurav", "ISRO"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunches(launch) {
  serialFlights++;
  launches.set(
    serialFlights,
    Object.assign(launch, {
      flightNumber: serialFlights,
      customer: ["Gaurav", "ISRO"],
      upcoming: true,
      success: true,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
};
