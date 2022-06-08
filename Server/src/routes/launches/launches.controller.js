const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchID,
  abortLaunchId,
} = require("../../models/launches.model");

const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  return res.status(200).json(await getAllLaunches(skip, limit));
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Bad Request, Missing Data or Invalid Data",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  //Take launchid
  const launchId = +req.params.id;
  //if launchId not exits
  const isExists = await existsLaunchID(launchId);
  if (!isExists) {
    return res.status(400).json({
      error: "Invalid Launch, Launch Not Found",
    });
  }
  const aborted = await abortLaunchId(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch Not Aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
