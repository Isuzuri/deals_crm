const createError = require("../helpers/createError");
const { Comment } = require("../models");

const getComment = async (req, res, next) => {
  const deal = req.deal;
  if (!deal) throw createError(404, "Deal not found");

  const { comment_id } = req.params;
  if (!comment_id) throw createError(400, "Bad request");

  if (comment_id) {
    const comment = await Comment.findByPk(comment_id);
    if (!comment) throw createError(404, "Comment not found");
    if (comment.deal_id !== deal.id) throw createError(403, "Comments doesn't belong to this deal");
    req.comment = comment;
  }

  next();
};

module.exports = getComment;
