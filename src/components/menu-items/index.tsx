"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "../use-toast";
import { useCart } from "../use-cart";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface MenuItemsProps {
  items: MenuItem[];
}

export default function MenuItems({ items }: MenuItemsProps) {
  const { toast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <div className="grid grid-cols-1 m-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 -mt-6">
            <Image
              src={item.image || "/placeholder.svg?height=300&width=400"}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
              <span className="text-lg font-bold text-amber-600">
                {formatPrice(item.price)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <Button
              className="w-full bg-amber-600 hover:bg-amber-800"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
