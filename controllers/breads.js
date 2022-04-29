import { NotFound, Unauthorized, OhNoYouDidnt, AlreadyExists } from '../lib/errors.js';

import Bread from '../models/bread.js';

async function breadIndex(_req, res, next) {
  try {
    const breads = await Bread.find().populate('addedBy');
    return res.status(200).json(breads);
  } catch (err) {
    next(err);
  }
}

async function breadCreate(req, res, next) {
  const { currentUserId } = req;
  
  try {
    const existingBread = await Bread.findOne({ name: req.body.name })

    if(existingBread) throw new AlreadyExists

    const createdBread = await Bread.create({
      ...req.body,
      addedBy: currentUserId,
    });
    if(createdBread.name.includes('tiger')) throw new OhNoYouDidnt

    
    return res.status(201).json(createdBread);
  } catch (err) {
    next(err);
  }
}

async function breadShow(req, res, next) {
  const { breadId } = req.params;
  try {
    const foundBread = await Bread.findById(breadId)
      .populate('addedBy')
      .populate('comments.addedBy');

    if (!foundBread) {
      throw new NotFound;
    }
    return res.status(200).json(foundBread);
  } catch (err) {
    next(err);
  }
}

async function breadEdit(req, res, next) {
  const { breadId } = req.params;
  const { currentUserId } = req;
  try {
    const breadToUpdate = await Bread.findById(breadId);
    if (!breadToUpdate) {
      throw new NotFound;
    }
    if (!breadToUpdate.addedBy.equals(currentUserId)) {
      throw new Unauthorized;
    }
    Object.assign(breadToUpdate, req.body);
    await breadToUpdate.save();
    return res.status(202).json(breadToUpdate);
  } catch (err) {
    next(err);
  }
}

async function breadDelete(req, res, next) {
  const { breadId } = req.params;
  const { currentUserId } = req;
  try {
    const breadToDelete = await Bread.findById(breadId);
    if (!breadToDelete) {
      throw new NotFound;
    }
    if (!breadToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized;
    }
    await breadToDelete.remove();
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function breadCommentCreate(req, res, next) {
  const { breadId } = req.params;
  const { currentUserId } = req;
  try {
    const commentedBread = await Bread.findById(breadId);
    if (!commentedBread) {
      throw new NotFound;
    }
    const createdComment = commentedBread.comments.create({
      ...req.body,
      addedBy: currentUserId,
    });
    commentedBread.comments.push(createdComment);
    await commentedBread.save();
    return res.status(201).json(createdComment);
  } catch (err) {
    next(err);
  }
}

async function breadCommentDelete(req, res, next) {
  const { breadId, commentId } = req.params;
  const { currentUserId } = req;
  try {
    const bread = await Bread.findById(breadId);
    if (!bread) {
      throw new NotFound;
    }
    const commentToDelete = bread.comments.id(commentId);
    if (!commentToDelete) {
      throw new NotFound;
    }
    if (!commentToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized;
    }
    commentToDelete.remove();
    await bread.save();
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

export default {
  index: breadIndex,
  create: breadCreate,
  show: breadShow,
  update: breadEdit,
  remove: breadDelete,
  commentCreate: breadCommentCreate,
  commentDelete: breadCommentDelete,
};
