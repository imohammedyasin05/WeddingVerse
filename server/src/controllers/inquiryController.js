const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Create a new inquiry
// @route   POST /api/v1/inquiries
// @access  Private
const createInquiry = async (req, res) => {
  const { vendor_id, service_id, event_date, message } = req.body;

  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        user_id: req.user.id,
        vendor_id,
        service_id: service_id || null,
        event_date: event_date ? new Date(event_date) : null,
        message,
        status: 'pending',
      },
    });
    res.status(201).json({ status: 'success', data: inquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error creating inquiry' });
  }
};

// @desc    Get user inquiries
// @route   GET /api/v1/inquiries/my
// @access  Private
const getMyInquiries = async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      where: { user_id: req.user.id },
      include: {
        vendor: { select: { id: true, business_name: true, cover_image_url: true } },
        service: { select: { id: true, name: true, price: true } }
      },
      orderBy: { created_at: 'desc' },
    });
    res.json({ status: 'success', data: inquiries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error fetching user inquiries' });
  }
};

module.exports = { createInquiry, getMyInquiries };
