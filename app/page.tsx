"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import MenuCategories from "@/src/components/menu-categories";
import MenuItems from "@/src/components/menu-items";
import { menuData } from "@/lib/menu-data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const getFilteredItems = () => {
    if (activeCategory === "all") {
      return {
        appetizers: menuData.appetizers,
        mainCourses: menuData.mainCourses,
        desserts: menuData.desserts,
        beverages: menuData.beverages,
      };
    }

    return {
      appetizers: activeCategory === "appetizers" ? menuData.appetizers : [],
      mainCourses:
        activeCategory === "main-courses" ? menuData.mainCourses : [],
      desserts: activeCategory === "desserts" ? menuData.desserts : [],
      beverages: activeCategory === "beverages" ? menuData.beverages : [],
    };
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Delicious Eats</h1>
          <Link href="/cart">
            <Button className="  bg-amber-600 hover:bg-amber-800 ">
              View Cart
              <ShoppingCart className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4"> <span className="text border-b-2 border-amber-600">Our Menu</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our delicious offerings, made with the freshest ingredients
            and prepared with care.
          </p>
        </div>

        <MenuCategories
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {filteredItems.appetizers.length > 0 && (
          <div className="mt-12" id="appetizers">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Appetizers
            </h3>
            <MenuItems items={filteredItems.appetizers} />
          </div>
        )}

        {filteredItems.mainCourses.length > 0 && (
          <div className="mt-12" id="main-courses">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Main Courses
            </h3>
            <MenuItems items={filteredItems.mainCourses} />
          </div>
        )}

        {filteredItems.desserts.length > 0 && (
          <div className="mt-12" id="desserts">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Desserts</h3>
            <MenuItems items={filteredItems.desserts} />
          </div>
        )}

        {filteredItems.beverages.length > 0 && (
          <div className="mt-12" id="beverages">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Beverages</h3>
            <MenuItems items={filteredItems.beverages} />
          </div>
        )}
      </main>

      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Delicious Eats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
