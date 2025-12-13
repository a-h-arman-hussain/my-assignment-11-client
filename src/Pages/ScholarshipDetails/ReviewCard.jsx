const ReviewCard = ({ review }) => (
  <div className="p-5 border rounded-lg shadow-md bg-base-100 flex gap-4 hover:shadow-xl transition">
    <img
      src={review.reviewerImage}
      alt="avatar"
      className="w-14 h-14 rounded-full"
    />
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between">
        <h3 className="text-neutral font-semibold">{review.studentName}</h3>
        <span className="text-warning font-bold">⭐ {review.rating}</span>
      </div>
      <p className="text-muted text-sm">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
      <p className="text-neutral">{review.comment}</p>
    </div>
  </div>
);
export default ReviewCard;
