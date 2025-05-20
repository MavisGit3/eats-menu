"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/src/components/use-cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [formErrors, setFormErrors] = useState({
    customerName: "",
    tableNumber: "",
  });
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  useEffect(() => {
    const newSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [items]);

  const validateForm = () => {
    const errors = {
      customerName: "",
      tableNumber: "",
    };
    let isValid = true;

    if (!customerName.trim()) {
      errors.customerName = "Name is required";
      isValid = false;
    }

    if (!tableNumber.trim()) {
      errors.tableNumber = "Table number is required";
      isValid = false;
    } else if (!/^\d+$/.test(tableNumber)) {
      errors.tableNumber = "Table number must be a valid number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      alert(
        `Order placed successfully for ${customerName} at Table ${tableNumber}! Your food will be ready soon.`
      );
      clearCart();
      setCustomerName("");
      setTableNumber("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some delicious items from our menu!
            </p>
            <Link href="/">
              <Button className=" bg-amber-600 hover:bg-amber-800">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Items
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border rounded-lg p-4 shadow-sm"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ">
                      <Image
                        src={
                          item.image || "/placeholder.svg?height=300&width=400"
                        }
                        alt={item.name}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="mx-2 w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 mt-1"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 shadow-sm bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Customer Information
                </h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="customerName">Your Name</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className={
                        formErrors.customerName ? "border-red-500" : ""
                      }
                    />
                    {formErrors.customerName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.customerName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tableNumber">Table Number</Label>
                    <Input
                      id="tableNumber"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Enter your table number"
                      className={formErrors.tableNumber ? "border-red-500" : ""}
                    />
                    {formErrors.tableNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.tableNumber}
                      </p>
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-800 mt-4"
                  onClick={handleCheckout}
                >
                  Place Order
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
