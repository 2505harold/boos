const poolMySql = require("../database");
const ctrlSevone = {};

ctrlSevone.getDevice = async (req, res) => {
  const data = await poolMySql.query("select * from device_sevone");
  //const params = req.params.device;
  //console.log(params);
  res.json({
    totalElements: data.length,
    content: data
  });
};

ctrlSevone.getObjectDevice = async (req, res) => {
  const data = await poolMySql.query(
    "select * from object_device_sevone where deviceid = ?",
    req.params.id
  );
  res.json({
    totalElements: data.length,
    content: data
  });
};

ctrlSevone.getIndicators = async (req, res) => {
  const { idDevice, idObject } = req.params;
  const data = await poolMySql.query(
    "select * from indicators_object_device_sevone where deviceId = ? and objectId = ?",
    [idDevice, idObject]
  );
  res.json({
    totalElements: data.length,
    content: data
  });
};

ctrlSevone.getData = async (req, res) => {
  const { idDevice, idObject } = req.params;
  var json = [
    {
      value: 0,
      time: 1576178937000, //12/12/2019 14:28:57
      focus: 1
    },
    {
      value: 0,
      time: 1576178997000, //12/12/2019 14:29:57
      focus: 1
    },
    {
      value: 0,
      time: 1576179057000, //12/12/2019 14:30:57
      focus: 1
    },
    {
      value: 0,
      time: 1576179117000, //12/12/2019 14:30:57
      focus: 1
    },
    {
      value: 0,
      time: 1576179177000, //12/12/2019 14:31:57
      focus: 1
    },
    {
      value: 0,
      time: 1576179237000, //12/12/2019 14:33:57
      focus: 1
    },
    {
      value: 0,
      time: 1576179297000, //12/12/2019 14:34:57
      focus: 1
    },
    {
      value: 0,
      time: 1576179357000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179417000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179477000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179537000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179597000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179657000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179717000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179777000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179837000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179897000,
      focus: 1
    },
    {
      value: 0,
      time: 1576179957000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180017000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180077000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180137000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180197000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180257000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180317000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180377000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180437000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180497000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180557000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180617000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180677000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180737000,
      focus: 1
    },
    {
      value: 0,
      time: 1576180797000, //12/12/2019 14:59:57
      focus: 1
    }
  ];
  res.json(json);
};

module.exports = ctrlSevone;
