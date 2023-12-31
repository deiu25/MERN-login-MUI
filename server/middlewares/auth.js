const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;  

    if (!token) {
        return next(new ErrorHandler("Login first to access this resource.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

//Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { //roles = ["admin", "user"]
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource.`, 403)
            );
        }
        next();
    }
}

// Compare this snippet from backend\middlewares\auth.js: