const Membership = require("../../models/Membership");
const Membership_Benefit = require("../../models/Membership_Benefit");
const createMembership = async (req, res, next) => {
  // const membership = Membership.create(req.body);
  // res.status(200).json({
  //   message: `Membership is create`,
  //   data: membership.toJSON(),
  // });
  const { membershiptype, validation, accesslimit, price, validity } = req.body;
  const { benefits } = req.body;
  const membership = Membership.create(
    {
      membershiptype,
      validation,
      accesslimit,
      price,
      validity,
      membership_benefits: benefits,
    },
    {
      include: [Membership_Benefit],
    }
  );
  res.status(200).json({
    message: `Membership is create`,
    data: membership,
  });
};
const getAllMemberships = async (req, res, next) => {
  const memberships = await Membership.findAll({
    include: [
      {
        model: Membership_Benefit,
        attributes: { exclude: ["membershipId"] },
      },
    ]
  });
  res.status(200).json({
    message: `get all memberships info`,
    data: memberships,
  });
};
module.exports = { createMembership, getAllMemberships };
