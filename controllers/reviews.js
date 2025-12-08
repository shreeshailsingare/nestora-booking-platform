const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async (req,res)=>{
 let listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);
 if (!listing) {
  req.flash("error", "Listing not found");
  return res.redirect("/listings");
}

 newReview.author = req.user ._id;
 console.log(newReview);
 listing.reviews.push(newReview);

 await newReview.save();
 await listing.save();
 req.flash("success","New Review Created!");
 res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    const cleanReviewId = reviewId.trim();
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: cleanReviewId } });
    await Review.findByIdAndDelete(cleanReviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}