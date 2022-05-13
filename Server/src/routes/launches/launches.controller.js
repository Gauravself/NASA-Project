const {
  getAllLaunches,
  addNewLaunches,
  existsLaunchID,
  abortLaunchId,
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

function httpAbortLaunch(req,res){
  //Take launchid
  const launchId = +req.params.id;
  //if launchId not exits
  if(!existsLaunchID(launchId)){
    return res.status(400).json({
      error:'Invalid Launch, Launch Not Found',
    })    
  }  
  const aborted = abortLaunchId(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
