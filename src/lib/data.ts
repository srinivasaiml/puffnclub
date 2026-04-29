export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  oldPriceNum?: number;
  discount?: string;
  images: string[];
  desc: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  details: [string, string][];
  reviewList: {
    name: string;
    date: string;
    stars: number;
    text: string;
    images?: string[];
  }[];
  keywords: string[];
}

export const products: Product[] = [
  // HOODIES (10 items)
  {
    id: 101, name: "Classic Black Hoodie", category: "Hoodies", priceNum: 2499, price: "₹2,499",
    desc: "Premium heavy cotton fleece hoodie. The ultimate comfort.",
    images: ["/collections/hoodies/hoodie-1.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#000000"],
    rating: 4.8, reviews: 124, details: [["Fabric", "400 GSM Fleece"], ["Fit", "Oversized"]],
    reviewList: [], keywords: ["hoodie", "black"]
  },
  {
    id: 102, name: "Urban Grey Hoodie", category: "Hoodies", priceNum: 2499, price: "₹2,499",
    desc: "Sleek urban design with a soft interior.",
    images: ["/collections/hoodies/hoodie-2.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#4a4a4a"],
    rating: 4.7, reviews: 89, details: [["Fabric", "Cotton Blend"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["hoodie", "grey"]
  },
  {
    id: 103, name: "Midnight Navy Hoodie", category: "Hoodies", priceNum: 2599, price: "₹2,599",
    desc: "Deep navy blue for a sophisticated street look.",
    images: ["/collections/hoodies/hoodie-3.webp"], sizes: ["M", "L", "XL"], colors: ["#1a1a2e"],
    rating: 4.9, reviews: 56, details: [["Fabric", "Premium Fleece"], ["Fit", "Oversized"]],
    reviewList: [], keywords: ["hoodie", "navy"]
  },
  {
    id: 104, name: "Sandstone Essential Hoodie", category: "Hoodies", priceNum: 2299, price: "₹2,299",
    desc: "Minimalist sandstone tone, perfect for layering.",
    images: ["/collections/hoodies/hoodie-4.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#d2b48c"],
    rating: 4.6, reviews: 34, details: [["Fabric", "Organic Cotton"], ["Fit", "Relaxed"]],
    reviewList: [], keywords: ["hoodie", "sandstone"]
  },
  {
    id: 105, name: "Forest Green Hoodie", category: "Hoodies", priceNum: 2499, price: "₹2,499",
    desc: "Deep forest green in a heavy 400 GSM fleece.",
    images: ["/collections/hoodies/hoodie-5.webp"], sizes: ["M", "L", "XL"], colors: ["#2d4a3e"],
    rating: 4.8, reviews: 45, details: [["Fabric", "400 GSM Fleece"], ["Fit", "Oversized"]],
    reviewList: [], keywords: ["hoodie", "green"]
  },
  {
    id: 106, name: "Charcoal Street Hoodie", category: "Hoodies", priceNum: 2699, price: "₹2,699",
    desc: "Rugged charcoal hoodie for the daily hustle.",
    images: ["/collections/hoodies/hoodie-6.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#333333"],
    rating: 4.7, reviews: 22, details: [["Fabric", "Heavyweight Cotton"], ["Fit", "Boxy"]],
    reviewList: [], keywords: ["hoodie", "charcoal"]
  },
  {
    id: 107, name: "Cloud White Hoodie", category: "Hoodies", priceNum: 2399, price: "₹2,399",
    desc: "Crisp cloud white for a clean, minimalist aesthetic.",
    images: ["/collections/hoodies/hoodie-7.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.5, reviews: 67, details: [["Fabric", "Supima Cotton Blend"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["hoodie", "white"]
  },
  {
    id: 108, name: "Vintage Maroon Hoodie", category: "Hoodies", priceNum: 2599, price: "₹2,599",
    desc: "Pre-washed maroon for that authentic vintage feel.",
    images: ["/collections/hoodies/hoodie-8.webp"], sizes: ["M", "L", "XL"], colors: ["#800000"],
    rating: 4.9, reviews: 12, details: [["Fabric", "Vintage Fleece"], ["Fit", "Relaxed"]],
    reviewList: [], keywords: ["hoodie", "maroon"]
  },
  {
    id: 109, name: "Onyx Pro Hoodie", category: "Hoodies", priceNum: 2899, price: "₹2,899",
    desc: "Professional grade onyx black hoodie. Built for durability.",
    images: ["/collections/hoodies/hoodie-9.webp"], sizes: ["L", "XL", "XXL"], colors: ["#111111"],
    rating: 5.0, reviews: 8, details: [["Fabric", "450 GSM French Terry"], ["Fit", "Pro"]],
    reviewList: [], keywords: ["hoodie", "onyx"]
  },
  {
    id: 110, name: "Sage Minimalist Hoodie", category: "Hoodies", priceNum: 2299, price: "₹2,299",
    desc: "Calming sage green for everyday comfort.",
    images: ["/collections/hoodies/hoodie-10.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#8fbc8f"],
    rating: 4.6, reviews: 29, details: [["Fabric", "Soft Cotton"], ["Fit", "Minimal"]],
    reviewList: [], keywords: ["hoodie", "sage"]
  },

  // JACKETS (12 items)
  {
    id: 201, name: "Stealth Bomber Jacket", category: "Jackets", priceNum: 3499, price: "₹3,499",
    desc: "Matte black stealth bomber. Water-resistant and stylish.",
    images: ["/collections/jackets/jacket-1.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#1a1714"],
    rating: 4.9, reviews: 45, details: [["Fabric", "Nylon Tech"], ["Style", "Bomber"]],
    reviewList: [], keywords: ["jacket", "bomber"]
  },
  {
    id: 202, name: "Urban Tech Parka", category: "Jackets", priceNum: 3999, price: "₹3,999",
    desc: "Technical parka for maximum protection.",
    images: ["/collections/jackets/jacket-2.webp"], sizes: ["M", "L", "XL"], colors: ["#333333"],
    rating: 5.0, reviews: 28, details: [["Fabric", "Weather-Shield"], ["Style", "Parka"]],
    reviewList: [], keywords: ["jacket", "parka"]
  },
  {
    id: 203, name: "Rogue Denim Jacket", category: "Jackets", priceNum: 2899, price: "₹2,899",
    desc: "Classic denim with a modern rogue edge.",
    images: ["/collections/jackets/jacket-3.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#2c3e50"],
    rating: 4.7, reviews: 67, details: [["Fabric", "Premium Denim"], ["Fit", "Tailored"]],
    reviewList: [], keywords: ["jacket", "denim"]
  },
  {
    id: 204, name: "Storm Windbreaker", category: "Jackets", priceNum: 2499, price: "₹2,499",
    desc: "Lightweight windbreaker for the storm chasers.",
    images: ["/collections/jackets/jacket-4.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#111111"],
    rating: 4.6, reviews: 19, details: [["Fabric", "Ripstop Nylon"], ["Style", "Windbreaker"]],
    reviewList: [], keywords: ["jacket", "windbreaker"]
  },
  {
    id: 205, name: "Heritage Trucker Jacket", category: "Jackets", priceNum: 3299, price: "₹3,299",
    desc: "Classic trucker jacket with a heritage feel.",
    images: ["/collections/jackets/jacket-5.webp"], sizes: ["M", "L", "XL"], colors: ["#4b5320"],
    rating: 4.8, reviews: 12, details: [["Fabric", "Heavy Canvas"], ["Style", "Trucker"]],
    reviewList: [], keywords: ["jacket", "trucker"]
  },
  {
    id: 206, name: "Apex Racer Jacket", category: "Jackets", priceNum: 3699, price: "₹3,699",
    desc: "Sleek racer silhouette with premium finish.",
    images: ["/collections/jackets/jacket-6.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#000000"],
    rating: 4.9, reviews: 15, details: [["Fabric", "Synthetic Leather"], ["Style", "Racer"]],
    reviewList: [], keywords: ["jacket", "racer"]
  },
  {
    id: 207, name: "Nomad Field Jacket", category: "Jackets", priceNum: 3199, price: "₹3,199",
    desc: "Versatile field jacket for the modern nomad.",
    images: ["/collections/jackets/jacket-7.jpeg"], sizes: ["M", "L", "XL"], colors: ["#556b2f"],
    rating: 4.7, reviews: 21, details: [["Fabric", "Cotton Drill"], ["Style", "Field"]],
    reviewList: [], keywords: ["jacket", "field"]
  },
  {
    id: 208, name: "Arctic Expedition Jacket", category: "Jackets", priceNum: 4499, price: "₹4,499",
    desc: "Built for the toughest conditions.",
    images: ["/collections/jackets/jacket-8.jpeg"], sizes: ["L", "XL", "XXL"], colors: ["#2c3e50"],
    rating: 5.0, reviews: 5, details: [["Fabric", "Insulated Tech"], ["Style", "Expedition"]],
    reviewList: [], keywords: ["jacket", "arctic"]
  },
  {
    id: 209, name: "Tactical Utility Vest", category: "Jackets", priceNum: 2199, price: "₹2,199",
    desc: "Multi-pocket tactical vest for maximum utility.",
    images: ["/collections/jackets/jacket-9.jpeg"], sizes: ["M", "L", "XL"], colors: ["#1a1a1a"],
    rating: 4.6, reviews: 14, details: [["Fabric", "Ballistic Nylon"], ["Style", "Vest"]],
    reviewList: [], keywords: ["jacket", "vest", "tactical"]
  },
  {
    id: 210, name: "Shadow Coach Jacket", category: "Jackets", priceNum: 2599, price: "₹2,599",
    desc: "Clean shadow black coach jacket.",
    images: ["/collections/jackets/jacket-10.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#333333"],
    rating: 4.5, reviews: 32, details: [["Fabric", "Lightweight Nylon"], ["Style", "Coach"]],
    reviewList: [], keywords: ["jacket", "coach"]
  },
  {
    id: 211, name: "Vortex Flight Jacket", category: "Jackets", priceNum: 3799, price: "₹3,799",
    desc: "Premium flight jacket with modern tactical accents.",
    images: ["/collections/jackets/jacket-11.jpeg"], sizes: ["M", "L", "XL"], colors: ["#111111"],
    rating: 4.8, reviews: 9, details: [["Fabric", "High-Density Poly"], ["Style", "Flight"]],
    reviewList: [], keywords: ["jacket", "flight"]
  },
  {
    id: 212, name: "Element Shield Jacket", category: "Jackets", priceNum: 4299, price: "₹4,299",
    desc: "All-weather shield for urban exploration.",
    images: ["/collections/jackets/jacket-12.jpeg"], sizes: ["L", "XL", "XXL"], colors: ["#2c3e50"],
    rating: 4.9, reviews: 7, details: [["Fabric", "Element-Shield"], ["Style", "Hardshell"]],
    reviewList: [], keywords: ["jacket", "shield"]
  },

  // SHIRTS (22 items)
  {
    id: 301, name: "Linen Breeze Shirt", category: "Shirts", priceNum: 1899, price: "₹1,899",
    desc: "Breathable linen for summer comfort.",
    images: ["/collections/shirts/shirts-1.webp"], sizes: ["M", "L", "XL"], colors: ["#f5f5f0"],
    rating: 4.9, reviews: 34, details: [["Fabric", "100% Linen"], ["Fit", "Tailored"]],
    reviewList: [], keywords: ["shirt", "linen"]
  },
  {
    id: 302, name: "Oxford Essential", category: "Shirts", priceNum: 1699, price: "₹1,699",
    desc: "The classic Oxford staple.",
    images: ["/collections/shirts/shirts-2.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.8, reviews: 112, details: [["Fabric", "Premium Cotton"], ["Style", "Oxford"]],
    reviewList: [], keywords: ["shirt", "oxford"]
  },
  {
    id: 303, name: "Urban Flannel", category: "Shirts", priceNum: 1999, price: "₹1,999",
    desc: "Soft brushed flannel for a rugged look.",
    images: ["/collections/shirts/shirts-3.webp"], sizes: ["M", "L", "XL"], colors: ["#c0392b"],
    rating: 4.7, reviews: 88, details: [["Fabric", "Brushed Cotton"], ["Weight", "Heavy"]],
    reviewList: [], keywords: ["shirt", "flannel"]
  },
  {
    id: 304, name: "Summer Pattern Shirt", category: "Shirts", priceNum: 1599, price: "₹1,599",
    desc: "Vibrant patterns for the vacation vibe.",
    images: ["/collections/shirts/shirts-4.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#ecf0f1"],
    rating: 4.5, reviews: 56, details: [["Fabric", "Light Cotton"], ["Print", "Subtle"]],
    reviewList: [], keywords: ["shirt", "summer"]
  },
  {
    id: 305, name: "Grandad Collar Minimal", category: "Shirts", priceNum: 1649, price: "₹1,649",
    desc: "Clean collarless design for a modern aesthetic.",
    images: ["/collections/shirts/shirts-5.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.8, reviews: 29, details: [["Fabric", "Combed Cotton"], ["Collar", "Grandad"]],
    reviewList: [], keywords: ["shirt", "grandad"]
  },
  {
    id: 306, name: "Formal Crisp Shirt", category: "Shirts", priceNum: 1849, price: "₹1,849",
    desc: "Professional excellence in every stitch.",
    images: ["/collections/shirts/shirts-6.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.9, reviews: 18, details: [["Fabric", "Supima Cotton"], ["Style", "Formal"]],
    reviewList: [], keywords: ["shirt", "formal"]
  },
  {
    id: 307, name: "Casual Weekend Shirt", category: "Shirts", priceNum: 1549, price: "₹1,549",
    desc: "Easy-iron fabric for a hassle-free weekend.",
    images: ["/collections/shirts/shirts-7.jpeg"], sizes: ["M", "L", "XL"], colors: ["#3498db"],
    rating: 4.7, reviews: 31, details: [["Fabric", "Cotton Poly"], ["Fit", "Relaxed"]],
    reviewList: [], keywords: ["shirt", "casual"]
  },
  {
    id: 308, name: "Vintage Plaid", category: "Shirts", priceNum: 1949, price: "₹1,949",
    desc: "Classic plaid on a heavy cotton base.",
    images: ["/collections/shirts/shirts-8.jpeg"], sizes: ["L", "XL", "XXL"], colors: ["#e67e22"],
    rating: 4.6, reviews: 14, details: [["Fabric", "Heavy Cotton"], ["Pattern", "Plaid"]],
    reviewList: [], keywords: ["shirt", "plaid"]
  },
  {
    id: 309, name: "Modern Work Shirt", category: "Shirts", priceNum: 1749, price: "₹1,749",
    desc: "Durable work shirt with reinforced seams.",
    images: ["/collections/shirts/shirts-9.jpeg"], sizes: ["M", "L", "XL"], colors: ["#7f8c8d"],
    rating: 4.8, reviews: 25, details: [["Fabric", "Cotton Drill"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["shirt", "workwear"]
  },
  {
    id: 310, name: "Soft Touch Daily", category: "Shirts", priceNum: 1699, price: "₹1,699",
    desc: "Wardrobe must-have for daily comfort.",
    images: ["/collections/shirts/shirts-10.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#ecf0f1"],
    rating: 4.7, reviews: 38, details: [["Fabric", "Soft Cotton"], ["Fit", "Tailored"]],
    reviewList: [], keywords: ["shirt", "soft"]
  },
  {
    id: 311, name: "Classic Navy Oxford", category: "Shirts", priceNum: 1799, price: "₹1,799",
    desc: "Deep navy Oxford shirt for versatile styling.",
    images: ["/collections/shirts/shirts-11.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#2c3e50"],
    rating: 4.8, reviews: 22, details: [["Fabric", "Oxford Cotton"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["shirt", "navy"]
  },
  {
    id: 312, name: "Dusty Rose Linen", category: "Shirts", priceNum: 1999, price: "₹1,999",
    desc: "Unique dusty rose shade in premium linen blend.",
    images: ["/collections/shirts/shirts-12.webp"], sizes: ["M", "L", "XL"], colors: ["#d8a4a4"],
    rating: 4.9, reviews: 15, details: [["Fabric", "Linen Blend"], ["Color", "Dusty Rose"]],
    reviewList: [], keywords: ["shirt", "linen"]
  },
  {
    id: 313, name: "Midnight Shadow Shirt", category: "Shirts", priceNum: 1899, price: "₹1,899",
    desc: "Stealth black shirt with subtle matte finish.",
    images: ["/collections/shirts/shirts-13.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#111111"],
    rating: 4.7, reviews: 28, details: [["Fabric", "Poplin Cotton"], ["Style", "Matte"]],
    reviewList: [], keywords: ["shirt", "black"]
  },
  {
    id: 314, name: "Olive Drab Utility", category: "Shirts", priceNum: 1949, price: "₹1,949",
    desc: "Military-inspired utility shirt with double pockets.",
    images: ["/collections/shirts/shirts-14.webp"], sizes: ["M", "L", "XL"], colors: ["#556b2f"],
    rating: 4.6, reviews: 19, details: [["Fabric", "Heavy Drill"], ["Style", "Utility"]],
    reviewList: [], keywords: ["shirt", "utility"]
  },
  {
    id: 315, name: "Chambray Nomad", category: "Shirts", priceNum: 1749, price: "₹1,749",
    desc: "Classic blue chambray for the modern explorer.",
    images: ["/collections/shirts/shirts-15.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#7fb3d5"],
    rating: 4.8, reviews: 31, details: [["Fabric", "Chambray Cotton"], ["Fit", "Tailored"]],
    reviewList: [], keywords: ["shirt", "chambray"]
  },
  {
    id: 316, name: "Slate Grey Minimal", category: "Shirts", priceNum: 1699, price: "₹1,699",
    desc: "Clean slate grey shirt for minimalist wardrobes.",
    images: ["/collections/shirts/shirts-16.webp"], sizes: ["M", "L", "XL"], colors: ["#707b7c"],
    rating: 4.7, reviews: 14, details: [["Fabric", "Cotton Sateen"], ["Color", "Slate"]],
    reviewList: [], keywords: ["shirt", "grey"]
  },
  {
    id: 317, name: "Rust Vintage Flannel", category: "Shirts", priceNum: 2099, price: "₹2,099",
    desc: "Warm rust tones in a heavy-duty flannel build.",
    images: ["/collections/shirts/shirts-17.webp"], sizes: ["L", "XL", "XXL"], colors: ["#a04000"],
    rating: 4.9, reviews: 12, details: [["Fabric", "Heavy Flannel"], ["Pattern", "Check"]],
    reviewList: [], keywords: ["shirt", "flannel"]
  },
  {
    id: 318, name: "Forest Green Corduroy", category: "Shirts", priceNum: 2199, price: "₹2,199",
    desc: "Premium corduroy shirt in deep forest green.",
    images: ["/collections/shirts/shirts-18.webp"], sizes: ["M", "L", "XL"], colors: ["#145a32"],
    rating: 5.0, reviews: 8, details: [["Fabric", "Fine Wale Corduroy"], ["Fit", "Boxy"]],
    reviewList: [], keywords: ["shirt", "corduroy"]
  },
  {
    id: 319, name: "Mustard Retro Shirt", category: "Shirts", priceNum: 1849, price: "₹1,849",
    desc: "Bold mustard yellow for a retro pop of color.",
    images: ["/collections/shirts/shirts-19.webp"], sizes: ["S", "M", "L"], colors: ["#d4ac0d"],
    rating: 4.5, reviews: 21, details: [["Fabric", "Viscose Blend"], ["Style", "Retro"]],
    reviewList: [], keywords: ["shirt", "retro"]
  },
  {
    id: 320, name: "Ice Blue Oxford", category: "Shirts", priceNum: 1749, price: "₹1,749",
    desc: "Crisp ice blue for a fresh professional look.",
    images: ["/collections/shirts/shirts-20.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#d6eaf8"],
    rating: 4.8, reviews: 36, details: [["Fabric", "Oxford Cotton"], ["Fit", "Slim"]],
    reviewList: [], keywords: ["shirt", "blue"]
  },
  {
    id: 321, name: "Tan Safari Shirt", category: "Shirts", priceNum: 1999, price: "₹1,999",
    desc: "Adventure-ready safari shirt in rugged tan.",
    images: ["/collections/shirts/shirts-21.jpeg"], sizes: ["M", "L", "XL"], colors: ["#d35400"],
    rating: 4.7, reviews: 11, details: [["Fabric", "Cotton Twill"], ["Style", "Safari"]],
    reviewList: [], keywords: ["shirt", "safari"]
  },
  {
    id: 322, name: "Onyx Evening Shirt", category: "Shirts", priceNum: 2299, price: "₹2,299",
    desc: "Sleek onyx black for evening occasions.",
    images: ["/collections/shirts/shirts-22.jpeg"], sizes: ["M", "L", "XL"], colors: ["#000000"],
    rating: 4.9, reviews: 5, details: [["Fabric", "Mercerized Cotton"], ["Style", "Luxury"]],
    reviewList: [], keywords: ["shirt", "onyx"]
  },

  // T-SHIRTS (26 items)
  {
    id: 401, name: "Midnight Oversized Tee", category: "Oversized Fit", priceNum: 1299, price: "₹1,299",
    desc: "Our flagship oversized tee. 220 GSM combed cotton.",
    images: ["/collections/tshirts/tshirts-1.webp"], sizes: ["S", "M", "L", "XL", "XXL"], colors: ["#1a1a1a"],
    rating: 4.9, reviews: 245, details: [["Fabric", "220 GSM Cotton"], ["Fit", "Oversized"]],
    reviewList: [], keywords: ["tshirt", "oversized"]
  },
  {
    id: 402, name: "Essential White Tee", category: "Regular Fit", priceNum: 999, price: "₹999",
    desc: "Perfect white tee for daily wear.",
    images: ["/collections/tshirts/tshirts-2.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.7, reviews: 156, details: [["Fabric", "180 GSM Cotton"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["tshirt", "regular"]
  },
  {
    id: 403, name: "Graphic Street Art", category: "Graphic Fit", priceNum: 1499, price: "₹1,499",
    desc: "Bold graphic on premium heavyweight cotton.",
    images: ["/collections/tshirts/tshirts-3.webp"], sizes: ["M", "L", "XL"], colors: ["#333333"],
    rating: 4.8, reviews: 92, details: [["Fabric", "240 GSM Cotton"], ["Print", "Screen"]],
    reviewList: [], keywords: ["tshirt", "graphic"]
  },
  {
    id: 404, name: "Vintage Faded Tee", category: "Vintage Fit", priceNum: 1199, price: "₹1,199",
    desc: "Pre-washed for an authentic vintage look.",
    images: ["/collections/tshirts/tshirts-4.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#7f8c8d"],
    rating: 4.6, reviews: 45, details: [["Fabric", "Cotton"], ["Wash", "Vintage"]],
    reviewList: [], keywords: ["tshirt", "vintage"]
  },
  {
    id: 405, name: "Slim Fit Athlete", category: "Slim Fit", priceNum: 1099, price: "₹1,099",
    desc: "Tailored fit that highlights your physique.",
    images: ["/collections/tshirts/tshirts-5.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#2980b9"],
    rating: 4.5, reviews: 28, details: [["Fabric", "Stretch Cotton"], ["Fit", "Slim"]],
    reviewList: [], keywords: ["tshirt", "slim"]
  },
  {
    id: 406, name: "Sunset Graphic", category: "Graphic Fit", priceNum: 1399, price: "₹1,399",
    desc: "Vibrant sunset-inspired print.",
    images: ["/collections/tshirts/tshirts-6.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#e67e22"],
    rating: 4.7, reviews: 68, details: [["Fabric", "100% Cotton"], ["Print", "Graphic"]],
    reviewList: [], keywords: ["tshirt", "graphic"]
  },
  {
    id: 407, name: "Retro Stripe", category: "Vintage Fit", priceNum: 1149, price: "₹1,149",
    desc: "Nineties vibes with comfortable fit.",
    images: ["/collections/tshirts/tshirts-7.webp"], sizes: ["M", "L", "XL"], colors: ["#34495e"],
    rating: 4.6, reviews: 37, details: [["Fabric", "Cotton Blend"], ["Style", "Retro"]],
    reviewList: [], keywords: ["tshirt", "retro"]
  },
  {
    id: 408, name: "Heavy Pocket Pro", category: "Regular Fit", priceNum: 1249, price: "₹1,249",
    desc: "Rugged pocket tee built to last.",
    images: ["/collections/tshirts/tshirts-8.webp"], sizes: ["M", "L", "XL", "XXL"], colors: ["#2c3e50"],
    rating: 4.9, reviews: 84, details: [["Fabric", "250 GSM Cotton"], ["Detail", "Pocket"]],
    reviewList: [], keywords: ["tshirt", "pocket"]
  },
  {
    id: 409, name: "Abstract Expression", category: "Graphic Fit", priceNum: 1549, price: "₹1,549",
    desc: "Unique abstract print on premium boxy fit.",
    images: ["/collections/tshirts/tshirts-9.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.8, reviews: 52, details: [["Fabric", "Heavyweight Cotton"], ["Print", "Art"]],
    reviewList: [], keywords: ["tshirt", "graphic"]
  },
  {
    id: 410, name: "Urban Culture", category: "Oversized Fit", priceNum: 1449, price: "₹1,449",
    desc: "Urban-inspired drop shoulder fit.",
    images: ["/collections/tshirts/tshirts-10.webp"], sizes: ["M", "L", "XL", "XXL"], colors: ["#000000"],
    rating: 4.8, reviews: 41, details: [["Fabric", "220 GSM Cotton"], ["Fit", "Oversized"]],
    reviewList: [], keywords: ["tshirt", "oversized"]
  },
  {
    id: 411, name: "Vortex Signature Tee", category: "Oversized Fit", priceNum: 1399, price: "₹1,399",
    desc: "Signature brand tee with premium detailing.",
    images: ["/collections/tshirts/tshirts-11.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#111111"],
    rating: 4.9, reviews: 32, details: [["Fabric", "240 GSM Cotton"], ["Fit", "Oversized"]],
    reviewList: [], keywords: ["tshirt", "vortex"]
  },
  {
    id: 412, name: "Cyberpunk Graphic", category: "Graphic Fit", priceNum: 1599, price: "₹1,599",
    desc: "Neon-inspired cyberpunk graphic print.",
    images: ["/collections/tshirts/tshirts-12.webp"], sizes: ["M", "L", "XL"], colors: ["#1a1a1a"],
    rating: 4.7, reviews: 18, details: [["Fabric", "Heavyweight Cotton"], ["Print", "Cyber"]],
    reviewList: [], keywords: ["tshirt", "graphic"]
  },
  {
    id: 413, name: "Minimalist Drift Tee", category: "Regular Fit", priceNum: 1099, price: "₹1,099",
    desc: "Clean drift-inspired minimalist design.",
    images: ["/collections/tshirts/tshirts-13.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.6, reviews: 24, details: [["Fabric", "190 GSM Cotton"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["tshirt", "drift"]
  },
  {
    id: 414, name: "Shadowbox Heavy Tee", category: "Oversized Fit", priceNum: 1499, price: "₹1,499",
    desc: "Ultra-heavy cotton tee with shadowbox fit.",
    images: ["/collections/tshirts/tshirts-14.webp"], sizes: ["M", "L", "XL", "XXL"], colors: ["#2c3e50"],
    rating: 4.8, reviews: 15, details: [["Fabric", "280 GSM Cotton"], ["Fit", "Boxy"]],
    reviewList: [], keywords: ["tshirt", "heavy"]
  },
  {
    id: 415, name: "Neon Pulse Graphic", category: "Graphic Fit", priceNum: 1449, price: "₹1,449",
    desc: "Pulse-wave neon graphic for night street style.",
    images: ["/collections/tshirts/tshirts-15.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#111111"],
    rating: 4.7, reviews: 9, details: [["Fabric", "Cotton"], ["Print", "Neon"]],
    reviewList: [], keywords: ["tshirt", "graphic"]
  },
  {
    id: 416, name: "Chrome Core Tee", category: "Regular Fit", priceNum: 1199, price: "₹1,199",
    desc: "Chrome-finished core brand t-shirt.",
    images: ["/collections/tshirts/tshirts-16.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#707b7c"],
    rating: 4.5, reviews: 12, details: [["Fabric", "Liquid Cotton"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["tshirt", "chrome"]
  },
  {
    id: 418, name: "Vanguard Heavyweight", category: "Oversized Fit", priceNum: 1699, price: "₹1,699",
    desc: "Elite heavyweight tee from our Vanguard line.",
    images: ["/collections/tshirts/tshirts-18.webp"], sizes: ["M", "L", "XL", "XXL"], colors: ["#1a1a1a"],
    rating: 5.0, reviews: 6, details: [["Fabric", "300 GSM Cotton"], ["Line", "Vanguard"]],
    reviewList: [], keywords: ["tshirt", "vanguard"]
  },
  {
    id: 419, name: "Digital Nomad Tee", category: "Graphic Fit", priceNum: 1349, price: "₹1,349",
    desc: "Digital glitch graphic for the tech-forward.",
    images: ["/collections/tshirts/tshirts-19.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#333333"],
    rating: 4.7, reviews: 14, details: [["Fabric", "Cotton"], ["Print", "Digital"]],
    reviewList: [], keywords: ["tshirt", "digital"]
  },
  {
    id: 420, name: "Arctic Flux Tee", category: "Regular Fit", priceNum: 1049, price: "₹1,049",
    desc: "Cool arctic tones in a breathable daily fit.",
    images: ["/collections/tshirts/tshirts-20.webp"], sizes: ["S", "M", "L", "XL"], colors: ["#d6eaf8"],
    rating: 4.6, reviews: 21, details: [["Fabric", "Cool-Cotton"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["tshirt", "arctic"]
  },
  {
    id: 421, name: "Summit Ridge Tee", category: "Vintage Fit", priceNum: 1199, price: "₹1,199",
    desc: "Vintage summit ridge graphic print.",
    images: ["/collections/tshirts/tshirts-21.webp"], sizes: ["M", "L", "XL"], colors: ["#5d6d7e"],
    rating: 4.7, reviews: 17, details: [["Fabric", "Slub Cotton"], ["Fit", "Vintage"]],
    reviewList: [], keywords: ["tshirt", "summit"]
  },
  {
    id: 422, name: "Desert Storm Tee", category: "Regular Fit", priceNum: 1149, price: "₹1,149",
    desc: "Dusty desert storm palette for a rugged look.",
    images: ["/collections/tshirts/tshirts-22.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#d35400"],
    rating: 4.5, reviews: 8, details: [["Fabric", "Heavy Cotton"], ["Fit", "Regular"]],
    reviewList: [], keywords: ["tshirt", "desert"]
  },
  {
    id: 423, name: "Obsidian Core Tee", category: "Oversized Fit", priceNum: 1399, price: "₹1,399",
    desc: "Deep obsidian black in our classic oversized fit.",
    images: ["/collections/tshirts/tshirts-23.jpeg"], sizes: ["M", "L", "XL", "XXL"], colors: ["#000000"],
    rating: 4.9, reviews: 13, details: [["Fabric", "240 GSM Cotton"], ["Fit", "Oversized"]],
    reviewList: [], keywords: ["tshirt", "obsidian"]
  },
  {
    id: 424, name: "Clay Earth Tee", category: "Vintage Fit", priceNum: 1249, price: "₹1,249",
    desc: "Natural clay earth tones with a vintage wash.",
    images: ["/collections/tshirts/tshirts-24.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#a04000"],
    rating: 4.8, reviews: 5, details: [["Fabric", "Pigment Dyed Cotton"], ["Fit", "Vintage"]],
    reviewList: [], keywords: ["tshirt", "clay"]
  },
  {
    id: 425, name: "Slate Minimal Tee", category: "Regular Fit", priceNum: 999, price: "₹999",
    desc: "Clean slate grey for an understated daily look.",
    images: ["/collections/tshirts/tshirts-25.jpeg"], sizes: ["S", "M", "L", "XL"], colors: ["#707b7c"],
    rating: 4.6, reviews: 11, details: [["Fabric", "Lightweight Cotton"], ["Fit", "Slim"]],
    reviewList: [], keywords: ["tshirt", "slate"]
  },
  {
    id: 426, name: "Azure Wave Graphic", category: "Graphic Fit", priceNum: 1499, price: "₹1,499",
    desc: "Fluid azure wave graphic on heavy white cotton.",
    images: ["/collections/tshirts/tshirts-26.webp"], sizes: ["M", "L", "XL"], colors: ["#ffffff"],
    rating: 4.7, reviews: 4, details: [["Fabric", "Cotton"], ["Print", "Art"]],
    reviewList: [], keywords: ["tshirt", "azure"]
  },
  {
    id: 427, name: "Carbon Pro Tee", category: "Oversized Fit", priceNum: 1599, price: "₹1,599",
    desc: "Carbon grey pro-grade heavyweight oversized tee.",
    images: ["/collections/tshirts/tshirts-27.jpeg"], sizes: ["L", "XL", "XXL"], colors: ["#1c2833"],
    rating: 5.0, reviews: 2, details: [["Fabric", "320 GSM Cotton"], ["Line", "Pro"]],
    reviewList: [], keywords: ["tshirt", "carbon"]
  }
];

export const testimonials = [
  { text: "Best tee I've ever owned. The fabric weight is insane.", name: "Arjun Mehta", tag: "Verified Buyer", stars: 5 },
  { text: "The oversized fit is PERFECT.", name: "Karan Patel", tag: "Repeat Customer", stars: 5 },
  { text: "Customer support on WhatsApp was super helpful.", name: "Sahil Khan", tag: "First-time Buyer", stars: 5 },
  { text: "The midnight black doesn't fade.", name: "Ishaan Singh", tag: "Fashion Blogger", stars: 5 },
  { text: "Finally an Indian brand doing premium streetwear right.", name: "Nikhil Verma", tag: "Verified Buyer", stars: 5 }
];
