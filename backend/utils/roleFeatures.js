export const ROLE_FEATURES = {
  admin: [
    "dashboard:admin",
    "users:read",
    "users:create",
    "users:delete",
    "users:features:update",
    "students:read",
    "students:create",
    "students:update",
    "students:delete",
    "faculty:read",
    "faculty:create",
    "faculty:update",
    "faculty:delete",
    "courses:read",
    "courses:create",
    "courses:update",
    "courses:delete",
    "subjects:read",
    "subjects:create",
    "attendance:read",
    "results:read:any"
  ],
  faculty: [
    "dashboard:faculty",
    "profile:read",
    "students:read",
    "faculty:read",
    "courses:read",
    "subjects:read",
    "attendance:mark",
    "attendance:read",
    "results:create",
    "results:read:any"
  ],
  student: [
    "dashboard:student",
    "results:read:self",
    "profile:read"
  ]
};

export const ALL_FEATURES = Array.from(
  new Set(Object.values(ROLE_FEATURES).flat())
);

export const getDefaultFeaturesByRole = (role) => ROLE_FEATURES[role] || [];

export const sanitizeFeatures = (features = [], role = "student") => {
  const allowedForRole = getDefaultFeaturesByRole(role);
  if (!Array.isArray(features) || !features.length) {
    return allowedForRole;
  }

  const unique = Array.from(new Set(features));
  return unique.filter((feature) => allowedForRole.includes(feature));
};
