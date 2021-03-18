const Agent = require("../models/agents");

exports.createAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);

    await agent.save((err, agent) => {
      if (err) {
        res.status(400).json({
          err: "Error saving Agent in DB",
        });
      }

      res.json({ agent, msg: "Agent Added Successfully" });
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    await Agent.find()
      .then((agents) => {
        if (agents == "") {
          res.json({
            err: "No Agents in DB",
          });
        }

        res.json(agents);
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            err: "Error in Finding Agents",
          });
        }
      });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

exports.getSingleAgent = async (req, res) => {
  try {
    const id = req.params.id;

    const agent = await Agent.findById(id);
    if (!agent) {
      res.status(400).json({
        err: "No Agent in DB",
      });
    }
    res.json(agent);
  } catch (error) {
    res.json({
      err: error,
    });
  }
};
