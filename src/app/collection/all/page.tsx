import CategoryListing from '@/components/CategoryListing';

export default function ShopAllPage() {
  return (
    <CategoryListing 
      title="Shop All"
      description="Explore our entire collection of premium essentials. From heavyweight hoodies to minimalist tees, everything you need for the modern wardrobe."
      categoryKeys={["Hoodies", "Jackets", "Shirts", "Oversized Fit", "Regular Fit", "Slim Fit", "Vintage Fit", "Graphic Fit"]}
    />
  );
}
