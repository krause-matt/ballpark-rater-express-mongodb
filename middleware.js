const { ballparkSchema, reviewSchema } = require("./schemas");
const Ballpark = require("./models/ballparks");
const Review = require("./models/review");
const ExpressErr = require("./utilities/ExpressErr");

module.exports.isRegUser = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.session.returnUrl = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  };
  next();
};

module.exports.isBallparkOwner = async (req, res, next) => {
  const { id } = req.params;
  const ballpark = await Ballpark.findById(id);
  if(!ballpark.author.equals(req.user._id)) {
    req.flash("error", "You do not have editing permissions for this ballpark!");
    return res.redirect(`/ballparks/${id}`)
  }
  next();
};

module.exports.isReviewOwner = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if(!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have editing permissions for this ballpark!");
    return res.redirect(`/ballparks/${id}`)
  }
  next();
};

module.exports.validateBallpark = (req, res, next) => {
  const {error} = ballparkSchema.validate(req.body);
  if (error) {
      const errorMsg = error.details.map(item => item.message).join(", ");
      throw new ExpressErr(errorMsg, 400);
  } else {
      next();
  };
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const errorMsg = error.details.map(item => item.message).join(", ");
      throw new ExpressErr(errorMsg, 400);
  } else {
      next();
  };
};