import User from "../models/User.js";
import { sanitizeFeatures } from "./roleFeatures.js";

export const syncAllUserFeatures = async () => {
  const users = await User.find().select("_id role features");
  let updatedCount = 0;

  for (const user of users) {
    const cleaned = sanitizeFeatures(user.features, user.role);
    const hasChanged =
      cleaned.length !== (user.features || []).length ||
      cleaned.some((feature, index) => feature !== user.features[index]);

    if (hasChanged) {
      user.features = cleaned;
      await user.save();
      updatedCount += 1;
    }
  }

  return {
    totalUsers: users.length,
    updatedUsers: updatedCount
  };
};
