import { getDefaultFeaturesByRole } from "../utils/roleFeatures.js";

const authorizeFeatures = (...requiredFeatures) => {
  return (req, res, next) => {
    const userFeatures = req.user?.features?.length
      ? req.user.features
      : getDefaultFeaturesByRole(req.user?.role);

    const hasAccess = requiredFeatures.every((feature) =>
      userFeatures.includes(feature)
    );

    if (!hasAccess) {
      return res.status(403).json({
        message: "Access denied for one or more required features",
        requiredFeatures
      });
    }

    next();
  };
};

export default authorizeFeatures;
