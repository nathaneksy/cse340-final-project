export function checkLogin(req, res, next) {
  if (req.session.user) {
    return next();
  }

  res.status(401).send("Please log in first.");
}

export function checkEmployee(req, res, next) {
  if (
    req.session.user &&
    (req.session.user.role === "employee" ||
      req.session.user.role === "owner")
  ) {
    return next();
  }

  res.status(403).send("Employee access required.");
}

export function checkOwner(req, res, next) {
  if (
    req.session.user &&
    req.session.user.role === "owner"
  ) {
    return next();
  }

  res.status(403).send("Owner access required.");
}