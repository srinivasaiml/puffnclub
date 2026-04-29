import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const collectionsPath = path.join(process.cwd(), 'public', 'collections');
  const categories = ['hoodies', 'jackets', 'shirts', 'tshirts', 'printed-tshirts'];
  
  let allProducts: any[] = [];
  let idCounter = 1000;

  const categoryMap: { [key: string]: string } = {
    'hoodies': 'Hoodies',
    'jackets': 'Jackets',
    'shirts': 'Shirts',
    'tshirts': 'Regular Fit',
    'printed-tshirts': 'Graphic Fit'
  };

  categories.forEach(category => {
    const categoryPath = path.join(collectionsPath, category);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath);
      files.forEach(file => {
        if (file.match(/\.(webp|jpg|jpeg|png|avif)$/i)) {
          const name = file.replace(/\.(webp|jpg|jpeg|png|avif)$/i, '').replace(/-/g, ' ');
          const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
          
          allProducts.push({
            id: idCounter++,
            name: capitalizedName,
            category: categoryMap[category] || category,
            price: "₹1,499", // Default price
            priceNum: 1499,
            images: [`/collections/${category}/${file}`],
            desc: `Premium ${category} from our latest collection. High-quality fabric and modern fit.`,
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["#1a1a1a", "#3d3d3d"],
            rating: 4.8,
            reviews: Math.floor(Math.random() * 50) + 10,
            details: [["Fabric", "100% Cotton"], ["Fit", "Modern Fit"]],
            reviewList: [],
            keywords: [category, name]
          });
        }
      });
    }
  });

  return NextResponse.json(allProducts);
}
