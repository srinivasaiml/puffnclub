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
  {
    id: 0,
    name: "Midnight Oversized Tee",
    category: "Oversized Fit",
    priceNum: 1299, price: "₹1,299", oldPrice: "₹1,529", oldPriceNum: 1529, discount: "15% OFF",
    desc: "Our flagship oversized tee in a deep midnight wash. 220 GSM combed cotton with a relaxed drop-shoulder silhouette.",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"], colors: ["#1a1a1a", "#3d3d3d", "#5a4a3a"],
    rating: 4.8, reviews: 124,
    details: [["Fabric", "100% Combed Cotton"], ["Weight", "220 GSM"], ["Fit", "Oversized Drop Shoulder"]],
    reviewList: [{ name: "Rahul S.", date: "Feb 2025", stars: 5, text: "Absolutely love the fit. Fabric quality is top notch.", images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=400"] }],
    keywords: ["oversized", "midnight", "black"]
  },
  {
    id: 1,
    name: "Dusty Rose Essential",
    category: "Regular Fit",
    priceNum: 999, price: "₹999", discount: "BESTSELLER",
    desc: "A versatile dusty rose tee that pairs with everything. Slim regular fit with ribbed neckline.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"], colors: ["#c4a08a", "#d4b5a0"],
    rating: 4.6, reviews: 89,
    details: [["Fabric", "100% Combed Cotton"], ["Weight", "200 GSM"]],
    reviewList: [{ name: "Siddharth P.", date: "Feb 2025", stars: 5, text: "The dusty rose color is even better in person.", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400"] }],
    keywords: ["essential", "rose", "pink"]
  },
  {
    id: 2,
    name: "Charcoal Street Fit",
    category: "Street Fit",
    priceNum: 1149, price: "₹1,149", oldPrice: "₹1,349", oldPriceNum: 1349, discount: "15% OFF",
    desc: "Designed for the streets. A slightly cropped boxy fit in rich charcoal with minimal branding.",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"], colors: ["#333333", "#444444"],
    rating: 4.7, reviews: 156,
    details: [["Fabric", "100% Heavy Cotton"], ["Weight", "240 GSM"]],
    reviewList: [{ name: "Aditya R.", date: "Feb 2025", stars: 5, text: "This is THE street tee." }],
    keywords: ["street", "charcoal", "boxy"]
  },
  {
    id: 3,
    name: "Washed Vintage Tee",
    category: "Vintage Fit",
    priceNum: 1099, price: "₹1,099", oldPrice: "₹1,299", oldPriceNum: 1299, discount: "15% OFF",
    desc: "Pre-washed vintage feel with a lived-in softness from day one. Relaxed fit with faded wash.",
    images: [
      "https://images.unsplash.com/photo-1574180563860-563063547b46?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1622443548277-515a4ad707bc?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"], colors: ["#8b7355", "#6b6b6b"],
    rating: 4.9, reviews: 203,
    details: [["Fabric", "100% Cotton"], ["Weight", "210 GSM"]],
    reviewList: [{ name: "Rohan S.", date: "Feb 2025", stars: 5, text: "The vintage wash is so authentic." }],
    keywords: ["vintage", "washed", "faded"]
  },
  {
    id: 4,
    name: "Ice White Minimal",
    category: "Slim Fit",
    priceNum: 899, price: "₹899", discount: "NEW",
    desc: "The perfect white tee, redefined. Crisp ice-white with zero transparency and a tailored slim fit.",
    images: [
      "https://images.unsplash.com/photo-1550991152-12461390acb2?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"], colors: ["#f5f5f0", "#e8e4dc"],
    rating: 4.5, reviews: 67,
    details: [["Fabric", "100% Supima Cotton"], ["Weight", "200 GSM"]],
    reviewList: [{ name: "Aman K.", date: "Feb 2025", stars: 5, text: "Finally a white tee that's not see-through." }],
    keywords: ["white", "minimal", "slim"]
  },
  {
    id: 5,
    name: "Forest Green Heavy",
    category: "Oversized Fit",
    priceNum: 1349, price: "₹1,349", oldPrice: "₹1,549", oldPriceNum: 1549, discount: "15% OFF",
    desc: "Deep forest green in our heaviest 250 GSM cotton. Oversized drop-shoulder fit.",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1588117305388-c263fe279d47?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1516257984877-a03a80ce0a0a?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1614251621021-d922091c6e6e?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["M", "L", "XL", "XXL"], colors: ["#2d4a3e", "#3a5f4e"],
    rating: 4.8, reviews: 91,
    details: [["Fabric", "100% Heavy Cotton"], ["Weight", "250 GSM"]],
    reviewList: [{ name: "Pranav B.", date: "Feb 2025", stars: 5, text: "The forest green is gorgeous." }],
    keywords: ["green", "heavyweight", "oversized"]
  },
  {
    id: 6,
    name: "Sandstone Boxy Tee",
    category: "Regular Fit",
    priceNum: 1049, price: "₹1,049", discount: "NEW",
    desc: "Premium sandstone hue in a modern boxy fit. Heavyweight fabric with soft finish.",
    images: [
      "https://images.unsplash.com/photo-1622445270936-5dcb604970e7?w=1000&auto=format&fit=crop&q=90",
      "https://plus.unsplash.com/premium_photo-1688497831040-753ea826d174?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1618453292459-53424b66bb6a?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1746899603348-ab9afd71e16d?w=1000&auto=format&fit=crop&q=90"
    ],
    sizes: ["S", "M", "L", "XL"], colors: ["#d2b48c", "#c2b280"],
    rating: 4.9, reviews: 42,
    details: [["Fabric", "100% Organic Cotton"], ["Weight", "240 GSM"]],
    reviewList: [{ name: "Varun L.", date: "Mar 2025", stars: 5, text: "The sandstone color is perfect for summer." }],
    keywords: ["sand", "boxy", "organic"]
  },
  {
    id: 7,
    name: "Classic Beige Staple",
    category: "Regular Fit",
    priceNum: 949, price: "₹949", discount: "STAPLE",
    desc: "A timeless beige essential. Comfortable regular fit for everyday wear.",
    images: [
      "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1627910087352-f4e3e28d9f5f?w=1000&auto=format&fit=crop&q=90"
    ],
    sizes: ["S", "M", "L", "XL"], colors: ["#f5f5dc", "#e5e5c0"],
    rating: 4.4, reviews: 58,
    details: [["Fabric", "100% Cotton"], ["Weight", "180 GSM"]],
    reviewList: [{ name: "Kunal M.", date: "Feb 2025", stars: 4, text: "Simple and clean." }],
    keywords: ["beige", "staple", "basic"]
  },
  {
    id: 8,
    name: "Earth Grey Modern",
    category: "Graphic Fit",
    priceNum: 1399, price: "₹1,399", discount: "LIMITED",
    desc: "Muted earth grey with a subtle graphic print. High-density screen print.",
    images: [
      "https://images.unsplash.com/photo-1693443687750-611ad77f3aba?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1711641066067-3c1d03492345?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1711641066085-5236bf7afcd8?w=1000&auto=format&fit=crop&q=90",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=1000&auto=format&fit=crop&q=90"
    ],
    sizes: ["M", "L", "XL"], colors: ["#7d7d7d", "#5c5c5c"],
    rating: 4.8, reviews: 36,
    details: [["Fabric", "100% Combed Cotton"], ["Print", "High Density Screen Print"]],
    reviewList: [{ name: "Rishabh G.", date: "Mar 2025", stars: 5, text: "The print quality is top tier." }],
    keywords: ["grey", "graphic", "limited"]
  },
  {
    id: 9,
    name: "Artistic Print Tee",
    category: "Graphic Fit",
    priceNum: 1499, price: "₹1,499", discount: "ARTIST SERIES",
    desc: "Featuring a unique artistic print. High-quality screen printing on premium cotton.",
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e78394a9?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1530173336844-44b43653457a?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"], colors: ["#ffffff", "#f5f5f5"],
    rating: 4.9, reviews: 34,
    reviewList: [{ name: "Dev J.", date: "Feb 2025", stars: 5, text: "The print is amazing." }],
    keywords: ["graphic", "art", "print"],
    details: [["Fabric", "100% Combed Cotton"], ["Print", "Screen Printed"]]
  },
  {
    id: 10,
    name: "Street Culture Graphic",
    category: "Graphic Fit",
    priceNum: 1549, price: "₹1,549", discount: "STREETWEAR",
    desc: "Iconic street culture graphic. Boxy fit for the ultimate urban look.",
    images: [
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a7c?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1503341509153-d83d730332f9?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["M", "L", "XL"], colors: ["#000000", "#111111"],
    rating: 4.7, reviews: 28,
    details: [["Fabric", "Heavyweight Cotton"], ["Fit", "Boxy"]],
    reviewList: [{ name: "Ishaan B.", date: "Jan 2025", stars: 5, text: "Love the street vibe." }],
    keywords: ["streetwear", "graphic", "urban"]
  },
  {
    id: 11,
    name: "Vintage Aesthetic Tee",
    category: "Vintage Fit",
    priceNum: 1199, price: "₹1,199", discount: "VINTAGE",
    desc: "Retro-inspired aesthetic. Faded colors and soft-touch fabric.",
    images: [
      "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1603251578711-3290ae1a0187?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"], colors: ["#795548", "#8d6e63"],
    rating: 4.6, reviews: 19,
    details: [["Fabric", "Cotton Blend"], ["Style", "Vintage"]],
    reviewList: [{ name: "Yash R.", date: "Feb 2025", stars: 4, text: "Nice retro feel." }],
    keywords: ["vintage", "aesthetic", "retro"]
  },
  {
    id: 12,
    name: "Ocean Blue Relaxed",
    category: "Regular Fit",
    priceNum: 1049, price: "₹1,049", discount: "NEW",
    desc: "Calming ocean blue in a relaxed fit. Premium lightweight cotton.",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1622443548277-515a4ad707bc?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1550991152-12461390acb2?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"], colors: ["#2196f3", "#1976d2"],
    rating: 4.7, reviews: 22,
    details: [["Fabric", "100% Cotton"], ["Weight", "180 GSM"]],
    reviewList: [{ name: "Arun V.", date: "Feb 2025", stars: 5, text: "Perfect for the beach." }],
    keywords: ["blue", "ocean", "relaxed"]
  },
  {
    id: 13,
    name: "Abstract Art Print",
    category: "Graphic Fit",
    priceNum: 1699, price: "₹1,699", discount: "PREMIUM ART",
    desc: "Abstract art print on premium 220 GSM cotton.",
    images: [
      "https://images.unsplash.com/photo-1574180563860-563063547b46?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1614251621021-d922091c6e6e?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1588117305388-c263fe279d47?auto=format&fit=crop&q=90&w=1000",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=90&w=1000"
    ],
    sizes: ["M", "L", "XL"], colors: ["#ffffff", "#000000"],
    rating: 5.0, reviews: 15,
    details: [["Fabric", "100% Combed Cotton"], ["Print", "Digital"]],
    reviewList: [{ name: "Kabir S.", date: "Feb 2025", stars: 5, text: "High quality print." }],
    keywords: ["abstract", "art", "premium"]
  }
];

export const testimonials = [
  { text: "Best tee I've ever owned. The fabric weight is insane.", name: "Arjun Mehta", tag: "Verified Buyer", stars: 5 },
  { text: "The oversized fit is PERFECT.", name: "Karan Patel", tag: "Repeat Customer", stars: 5 },
  { text: "Customer support on WhatsApp was super helpful.", name: "Sahil Khan", tag: "First-time Buyer", stars: 5 },
  { text: "The midnight black doesn't fade.", name: "Ishaan Singh", tag: "Fashion Blogger", stars: 5 },
  { text: "Finally an Indian brand doing premium streetwear right.", name: "Nikhil Verma", tag: "Verified Buyer", stars: 5 }
];
