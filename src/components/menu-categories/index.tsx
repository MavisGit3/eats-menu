"use client";

import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "All" },
  { id: "appetizers", name: "Appetizers" },
  { id: "main-courses", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

interface MenuCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function MenuCategories({
  activeCategory,
  onCategoryChange,
}: MenuCategoriesProps) {
  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);

    // Scroll to the category section if not "all"
    if (categoryId !== "all") {
      const element = document.getElementById(categoryId);
      if (element) {
        // Add a small delay to ensure the DOM has updated
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          className={
            activeCategory === category.id
              ? " bg-amber-600 hover:bg-amber-800"
              : ""
          }
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
