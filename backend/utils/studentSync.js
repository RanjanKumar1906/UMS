import Student from "../models/Student.js";
import User from "../models/User.js";

const buildAutoRoll = (userId) => `AUTO-${String(userId).slice(-8).toUpperCase()}`;

export const syncStudentProfiles = async () => {
  const studentUsers = await User.find({ role: "student" }).select("_id name email");
  let linkedCount = 0;
  let createdCount = 0;

  for (const user of studentUsers) {
    const byUser = await Student.findOne({ user: user._id });
    if (byUser) continue;

    const byEmail = await Student.findOne({ email: user.email });
    if (byEmail) {
      byEmail.user = user._id;
      await byEmail.save();
      linkedCount += 1;
      continue;
    }

    await Student.create({
      user: user._id,
      name: user.name,
      email: user.email,
      rollNo: buildAutoRoll(user._id),
      department: "General",
      year: 1
    });
    createdCount += 1;
  }

  return {
    totalStudentUsers: studentUsers.length,
    linkedProfiles: linkedCount,
    createdProfiles: createdCount
  };
};
