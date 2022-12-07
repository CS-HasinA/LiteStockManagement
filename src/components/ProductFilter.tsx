import Input from "./Input";

interface ProductFilterProps {
  productSearch: string;
  setProductSearch: (productSearch: string) => void;
  placeholder?: string;
}

export default function ProductFilter({
  productSearch,
  setProductSearch,
  placeholder,
}: ProductFilterProps) {
  if (!placeholder) placeholder = "Find a product by name";

  return (
    <div className="mb-5">
      <div>
        <Input
          placeholder={placeholder}
          type="text"
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
