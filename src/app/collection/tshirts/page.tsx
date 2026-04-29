import CategoryListing from '@/components/CategoryListing';

export default function TShirtsPage() {
  return (
    <CategoryListing 
      title="T-Shirts"
      description="Our core collection of premium tees. From oversized to tailored fits, crafted with high-GSM combed cotton."
      categoryKeys={["Oversized Fit", "Regular Fit", "Slim Fit", "Vintage Fit"]}
    />
  );
}
