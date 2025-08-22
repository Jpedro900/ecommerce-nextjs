import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    return(
        <div className="grid grid-cols-3 gap-6">
            {products.map((product) =>(
                <ProductCard
                    key={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                />
            ))}
        </div>
    )
}