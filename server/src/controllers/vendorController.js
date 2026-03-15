const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockVendors = [
  { id: '1', name: "Luxe Lens Photography", category: "Photography", city: "New York", rating: 4.9, price_range: "$$$", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800", description: "Award winning photography." },
  { id: '2', name: "Elegance Venues", category: "Venue", city: "Los Angeles", rating: 4.8, price_range: "$$$$", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800", description: "Breathtaking venues." },
  { id: '3', name: "Bella Bridal Makeup", category: "Makeup", city: "Miami", rating: 4.7, price_range: "$$", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800", description: "Flawless bridal makeup." },
  { id: '4', name: "Grand Planning Events", category: "Planning", city: "Chicago", rating: 5.0, price_range: "$$$", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800", description: "Perfectly executed plans." },
  { id: '5', name: "Floral Petals Decor", category: "Decoration", city: "Denver", rating: 4.6, price_range: "$$", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800", description: "Beautiful floral displays." },
  { id: '6', name: "Gourmet Catering Co.", category: "Catering", city: "Houston", rating: 4.9, price_range: "$$$", image: "https://images.unsplash.com/photo-1555244162-803834f800af?auto=format&fit=crop&w=800", description: "World class fine dining." },
  { id: '7', name: "Vintage Memories", category: "Photography", city: "Austin", rating: 4.5, price_range: "$$", image: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?auto=format&fit=crop&w=800", description: "Vintage style photography." },
  { id: '8', name: "The Crystal Ballroom", category: "Venue", city: "Las Vegas", rating: 4.9, price_range: "$$$$", image: "https://images.unsplash.com/photo-1519167758481-830219979316?auto=format&fit=crop&w=800", description: "Luxury ballrooms." },
  { id: '9', name: "Glamour Glow", category: "Makeup", city: "Atlanta", rating: 4.8, price_range: "$$$", image: "https://images.unsplash.com/photo-1512496015851-a1cbfc37b7ed?auto=format&fit=crop&w=800", description: "Glowing, natural makeup." },
  { id: '10', name: "Dream Day Organizers", category: "Planning", city: "Seattle", rating: 4.7, price_range: "$$", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800", description: "Stress-free coordination." },
  { id: '11', name: "Royal Drape & Floral", category: "Decoration", city: "Dallas", rating: 4.6, price_range: "$$$", image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800", description: "Elegant modern draping." },
  { id: '12', name: "Feast & Fête", category: "Catering", city: "Boston", rating: 4.9, price_range: "$$$", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800", description: "Artisan menus." },
  { id: '13', name: "Golden Hour Studios", category: "Photography", city: "San Francisco", rating: 5.0, price_range: "$$$$", image: "https://images.unsplash.com/photo-1537633552985-df8429e802ea?auto=format&fit=crop&w=800", description: "Stunning outdoor portraits." },
  { id: '14', name: "Oceanview Resort", category: "Venue", city: "San Diego", rating: 4.8, price_range: "$$$$", image: "https://images.unsplash.com/photo-1521336575822-6e4ae1a21398?auto=format&fit=crop&w=800", description: "Seafront marriage." },
  { id: '15', name: "Flawless Faces", category: "Makeup", city: "Portland", rating: 4.6, price_range: "$", image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800", description: "Affordable expert artistry." },
  { id: '16', name: "Perfect Moment Planners", category: "Planning", city: "Nashville", rating: 4.9, price_range: "$$$", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800", description: "Country and modern planning." },
  { id: '17', name: "Moonlight Events", category: "Decoration", city: "Orlando", rating: 4.5, price_range: "$$", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800", description: "Lighting and magical setup." },
  { id: '18', name: "Savor the Moment", category: "Catering", city: "Phoenix", rating: 4.7, price_range: "$$$", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800", description: "Exotic and rich flavors." },
  { id: '19', name: "Storybook Films", category: "Photography", city: "Denver", rating: 4.8, price_range: "$$$", image: "https://images.unsplash.com/photo-1536730707374-fb23ed2e6fe2?auto=format&fit=crop&w=800", description: "Cinematic filming." },
  { id: '20', name: "The Rustic Barn", category: "Venue", city: "Austin", rating: 4.7, price_range: "$$", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800", description: "Rustic charm venue." }
];

// @desc    Get all vendors with filtering
// @route   GET /api/v1/vendors
// @access  Public
const getVendors = async (req, res) => {
  res.json({ status: 'success', count: mockVendors.length, data: mockVendors });
};

// @desc    Get single vendor by ID
// @route   GET /api/v1/vendors/:id
// @access  Public
const getVendorById = async (req, res) => {
  const vendor = mockVendors.find(v => v.id === req.params.id);
  
  if (vendor) {
    // Add missing details for VendorDetails view
    const enrichedVendor = {
      ...vendor,
      images: [vendor.image, "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800"],
      services: [{ name: "Standard Package", price: "$2,500" }, { name: "Premium Coverage", price: "$4,500" }],
      reviews: [{ id: 1, user: "Sarah & James", rating: 5, comment: "Absolutely incredible! The best team we could ever ask for.", date: "Oct 2025" }]
    };
    res.json({ status: 'success', data: enrichedVendor });
  } else {
    res.status(404).json({ status: 'error', message: 'Vendor not found' });
  }
};

module.exports = { getVendors, getVendorById };
