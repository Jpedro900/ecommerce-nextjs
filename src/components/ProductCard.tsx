import Image from "next/image";

type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="rounded-2xl shadow-sm border bg-white p-4 transition hover:shadow-md">
      {/* Wrapper de imagem */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50 vw, 33vw"
        />
      </div>

      {/* Conteudo */}
      <h3 className="mt-3 text-sm sm:text-base font-semibold line-clamp-2">
        {name}
      </h3>
      <p className="text-base sm:text-lg font-semibold text-gray-900">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price)}
      </p>
    </div>
  );
}
