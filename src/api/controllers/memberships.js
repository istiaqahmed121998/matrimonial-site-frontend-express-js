const Membership = require("../../models/Membership");
const Membership_Benefit = require("../../models/Membership_Benefit");
const createMembership = async (req, res, next) => {
  const { membershiptype, accesslimit, price, validity } = req.body;
  const { benefits } = req.body;

  var membership = await Membership.findOne({
    where: { membershiptype: membershiptype },
  });
  if (membership === null) {
    membership = await Membership.create(
      {
        membershiptype,
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
  } else {
    res.status(200).json({
      message: `Membership is already existed`,
      data: membership,
    });
  }
};
const getAllMemberships = async (req, res, next) => {
  const memberships = await Membership.findAll({
    include: [
      {
        model: Membership_Benefit,
        attributes: { exclude: ["membershipId"] },
      },
    ],
  });
  res.status(200).json({
    message: `get all memberships info`,
    data: memberships,
  });
};
module.exports = { createMembership, getAllMemberships };
