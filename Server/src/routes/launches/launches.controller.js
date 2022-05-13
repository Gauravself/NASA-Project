const {
  getAllLaunches,
  addNewLaunches,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if(!launch.launchDate || !launch.mission || !launch.rocket || !launch.target){
      return res.status(400).json({
          error:'Bad Request, Missing Data or Invalid Data'
      })
  }
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunches(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
