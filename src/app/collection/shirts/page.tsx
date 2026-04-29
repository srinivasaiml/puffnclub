import CategoryListing from '@/components/CategoryListing';

export default function ShirtsPage() {
  return (
    <CategoryListing 
      title="Premium Shirts"
      description="Crisp linen and tailored cotton. Elevate your wardrobe with our selection of premium casual and formal shirts."
      categoryKeys={["Shirts"]}
    />
  );
}
