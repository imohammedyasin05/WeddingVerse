-- WeddingVerse PostgreSQL Seed Data
-- 20 Sample Vendors across categories

-- Note: In production, passwords would be hashed (e.g. bcrypt). Here we use a dummy hash.
-- Using UUID v4 format for primary keys

-- 1. Insert 20 Users for Vendors
INSERT INTO users (id, name, email, password_hash, role) VALUES
('b0e9a111-7c51-4d1a-9f5b-111111111111', 'Aryan Sharma', 'aryan@snappoint.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111112', 'Priya Singh', 'priya@weddingsbypriya.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111113', 'Neha Gupta', 'neha@glamup.in', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111114', 'Rohan Desai', 'rohan@royalevents.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111115', 'Vikram Patel', 'info@tajpalace.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111116', 'Sonia Khanna', 'sonia@tastybites.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111117', 'Kabir Das', 'kabir@cinematicweddings.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111118', 'Anita Reddy', 'anita@perfectplanners.in', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111119', 'Riya Kapoor', 'riya@flawlessbrides.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111120', 'Karan Verma', 'karan@floralfantasy.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111121', 'Aakash Mehra', 'booking@grandoberoi.in', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111122', 'Ravi Iyer', 'ravi@spicykitchen.in', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111123', 'Manish Malhotra', 'manish@timelessframes.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111124', 'Simran Kaur', 'simran@dreamday.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111125', 'Pooja Bhatia', 'pooja@makeupmagic.in', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111126', 'Amit Shah', 'amit@royaldecor.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111127', 'Sameer Jain', 'events@marriott.in', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111128', 'Tara Menon', 'tara@gourmetcaterers.com', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111129', 'Dev Anand', 'dev@classicshots.in', 'dummyhash123', 'vendor'),
('b0e9a111-7c51-4d1a-9f5b-111111111130', 'Zara Ali', 'zara@bespokeweddings.com', 'dummyhash123', 'vendor');

-- 2. Insert 20 Vendors
INSERT INTO vendors (id, user_id, business_name, slug, category, city, description, cover_image_url, price_range, avg_rating, total_reviews) VALUES
('c1f8b222-8d62-5e2b-0g6c-222222222221', 'b0e9a111-7c51-4d1a-9f5b-111111111111', 'Snap Point Photography', 'snap-point', 'Photographer', 'Mumbai', 'Capturing your special moments with cinematic brilliance.', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80', 'premium', 4.8, 45),
('c1f8b222-8d62-5e2b-0g6c-222222222222', 'b0e9a111-7c51-4d1a-9f5b-111111111112', 'Weddings by Priya', 'weddings-by-priya', 'Wedding Planner', 'Delhi', 'Bespoke wedding planning for modern couples.', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80', 'luxury', 4.9, 30),
('c1f8b222-8d62-5e2b-0g6c-222222222223', 'b0e9a111-7c51-4d1a-9f5b-111111111113', 'GlamUp MUA', 'glamup-mua', 'Makeup Artist', 'Bangalore', 'Professional bridal makeup artist specializing in natural looks.', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80', 'mid', 4.7, 56),
('c1f8b222-8d62-5e2b-0g6c-222222222224', 'b0e9a111-7c51-4d1a-9f5b-111111111114', 'Royal Events & Decor', 'royal-events', 'Decorator', 'Mumbai', 'Transforming your venue into a magical dreamscape.', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80', 'premium', 4.6, 28),
('c1f8b222-8d62-5e2b-0g6c-222222222225', 'b0e9a111-7c51-4d1a-9f5b-111111111115', 'The Taj Palace', 'taj-palace', 'Venue', 'Delhi', 'Heritage venue with grand banquet halls and royal lawns.', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80', 'luxury', 5.0, 110),
('c1f8b222-8d62-5e2b-0g6c-222222222226', 'b0e9a111-7c51-4d1a-9f5b-111111111116', 'Tasty Bites Catering', 'tasty-bites', 'Catering', 'Pune', 'Authentic Indian spreads tailored for large weddings.', 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80', 'mid', 4.5, 34),
('c1f8b222-8d62-5e2b-0g6c-222222222227', 'b0e9a111-7c51-4d1a-9f5b-111111111117', 'Cinematic Weddings', 'cinematic-weddings', 'Photographer', 'Bangalore', 'Candid photography and 4K wedding films.', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80', 'premium', 4.9, 82),
('c1f8b222-8d62-5e2b-0g6c-222222222228', 'b0e9a111-7c51-4d1a-9f5b-111111111118', 'Perfect Planners', 'perfect-planners', 'Wedding Planner', 'Chennai', 'End-to-end wedding execution and coordination.', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', 'premium', 4.8, 41),
('c1f8b222-8d62-5e2b-0g6c-222222222229', 'b0e9a111-7c51-4d1a-9f5b-111111111119', 'Flawless Brides', 'flawless-brides', 'Makeup Artist', 'Mumbai', 'Airbrush makeup and elegant hairstyling for brides.', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80', 'premium', 4.9, 90),
('c1f8b222-8d62-5e2b-0g6c-222222222230', 'b0e9a111-7c51-4d1a-9f5b-111111111120', 'Floral Fantasy', 'floral-fantasy', 'Decorator', 'Jaipur', 'Exquisite floral arrangements and mandap designs.', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80', 'mid', 4.6, 22),
('c1f8b222-8d62-5e2b-0g6c-222222222231', 'b0e9a111-7c51-4d1a-9f5b-111111111121', 'Grand Oberoi Resort', 'grand-oberoi', 'Venue', 'Jaipur', 'Luxury destination wedding resort with palace views.', 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80', 'luxury', 4.8, 65),
('c1f8b222-8d62-5e2b-0g6c-222222222232', 'b0e9a111-7c51-4d1a-9f5b-111111111122', 'Spicy Kitchen', 'spicy-kitchen', 'Catering', 'Delhi', 'Premium vegetarian and vegan catering menus.', 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80', 'budget', 4.3, 19),
('c1f8b222-8d62-5e2b-0g6c-222222222233', 'b0e9a111-7c51-4d1a-9f5b-111111111123', 'Timeless Frames', 'timeless-frames', 'Photographer', 'Kolkata', 'Traditional and contemporary wedding photography.', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80', 'mid', 4.5, 33),
('c1f8b222-8d62-5e2b-0g6c-222222222234', 'b0e9a111-7c51-4d1a-9f5b-111111111124', 'Dream Day Planners', 'dream-day', 'Wedding Planner', 'Goa', 'Beach wedding specialists and coordination experts.', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80', 'mid', 4.7, 50),
('c1f8b222-8d62-5e2b-0g6c-222222222235', 'b0e9a111-7c51-4d1a-9f5b-111111111125', 'Makeup Magic', 'makeup-magic', 'Makeup Artist', 'Hyderabad', 'High-definition makeup and skin prep for your big day.', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80', 'budget', 4.4, 25),
('c1f8b222-8d62-5e2b-0g6c-222222222236', 'b0e9a111-7c51-4d1a-9f5b-111111111126', 'Royal Decor', 'royal-decor', 'Decorator', 'Delhi', 'Grand setups, lighting, and extravagant entry concepts.', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80', 'luxury', 4.9, 105),
('c1f8b222-8d62-5e2b-0g6c-222222222237', 'b0e9a111-7c51-4d1a-9f5b-111111111127', 'Marriott Banquets', 'marriott-banquets', 'Venue', 'Mumbai', '5-star halls with attached accommodation for guests.', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80', 'premium', 4.7, 78),
('c1f8b222-8d62-5e2b-0g6c-222222222238', 'b0e9a111-7c51-4d1a-9f5b-111111111128', 'Gourmet Caterers', 'gourmet-caterers', 'Catering', 'Bangalore', 'Multi-cuisine fusion buffets and live counters.', 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80', 'premium', 4.6, 62),
('c1f8b222-8d62-5e2b-0g6c-222222222239', 'b0e9a111-7c51-4d1a-9f5b-111111111129', 'Classic Shots', 'classic-shots', 'Photographer', 'Pune', 'Black and white aesthetic and documentary style weddings.', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80', 'budget', 4.2, 14),
('c1f8b222-8d62-5e2b-0g6c-222222222240', 'b0e9a111-7c51-4d1a-9f5b-111111111130', 'Bespoke Weddings', 'bespoke-weddings', 'Wedding Planner', 'Mumbai', 'Curated experiences for intimate and elite weddings.', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', 'luxury', 4.9, 112);
