const express = require("express");
const router = express.Router();

const installations = require("../utils/solar-pv-installation.json");

filterQueryParams = (req, res, sourceArray) => {
  let toSort = false;
  //   console.log("Filtering... ");
  const filteredData = Object.keys(req.query).reduce(
    (filteredArray, queryKey) => {
      toSort = toSort || queryKey.startsWith("sort");
      const somewhatFiltered = queryKey.startsWith("sort")
        ? filteredArray
        : filteredArray.filter(data => data[queryKey] === req.query[queryKey]);
      return somewhatFiltered;
    },
    sourceArray
  );
  //   console.log("Filtering completed");
  toSort ? handleSort(req, res, filteredData) : res.json(filteredData);
};

// handleSort = (req, res, data) => {
//   console.log(`handling sort within ${data.length} data`);
//   const sortQueryObject = req.query["sort"];
//   const results = Object.keys(sortQueryObject).reduce((sorted, sortKey) => {
//     return sorted.sort((a, b) => {
//       console.log(sortKey, sortQueryObject[sortKey]);
//       if (a[sortKey] === b[sortKey]) return 0;
//       return sortQueryObject[sortKey] === "desc"
//         ? a[sortKey] < b[sortKey]
//           ? 1
//           : -1
//         : a[sortKey] > b[sortKey]
//           ? 1
//           : -1;
//     });
//   }, data);
//   console.log(results);
//   console.log("Sort completed");
//   res.json(results);
// };

// GET method
router.get("/", (req, res) => {
  res.json("Hi from SolarPV Router!");
});
router.get("/list", (req, res) => {
  res.json(installations);
});
router.get("/search", (req, res) => {
  //   console.log("search handler");
  Object.keys(req.query).length === 0
    ? res.json("Hi from SolarPV Router searcher!")
    : filterQueryParams(req, res, installations);
});
router.get("/:year", (req, res) => {
  // console.log("year handler");
  const installationData = installations.filter(
    installation => installation.year === req.params.year
  );
  Object.keys(req.query).length === 0
    ? res.json(installationData)
    : filterQueryParams(req, res, installationData);
});

// PUT method
// POST method
// DELETE method

module.exports = router;
