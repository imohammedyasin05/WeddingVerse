const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// @desc    Create a review for a vendor
// @route   POST /api/v1/reviews
// @access  Private
const createReview = async (req, res) => {
  const { vendorId, rating, comment } = req.body;

  if (!vendorId || !rating || !comment) {
    return res.status(400).json({ status: 'error', message: 'Please provide all required fields' });
  }

  try {
    const review = await prisma.review.create({
      data: {
        vendor_id: vendorId,
        user_id: req.user.id,
        rating: parseInt(rating),
        comment,
      },
      include: {
        user: { select: { name: true, avatar_url: true } }
      }
    });

    res.status(201).json({ status: 'success', data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error creating review' });
  }
};

// @desc    Get all reviews for a vendor
// @route   GET /api/v1/reviews/:vendorId
// @access  Public
const getVendorReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { vendor_id: req.params.vendorId },
      include: {
        user: { select: { name: true, avatar_url: true } }
      },
      orderBy: { created_at: 'desc' },
    });

    res.json({ status: 'success', data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error fetching reviews' });
  }
};

module.exports = { createReview, getVendorReviews };
