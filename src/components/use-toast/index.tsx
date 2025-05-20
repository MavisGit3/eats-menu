"use client"

import { useState, useEffect } from "react"

interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
}

interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void
  dismiss: (id: string) => void
}

export function useToast(): ToastContextValue {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, duration = 3000 }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, duration }

    setToasts((prevToasts) => [...prevToasts, newToast])

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, duration)
    }

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    let toastContainer = document.getElementById("toast-container")

    if (!toastContainer) {
      toastContainer = document.createElement("div")
      toastContainer.id = "toast-container"
      toastContainer.className = "fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      document.body.appendChild(toastContainer)
    }

    toastContainer.innerHTML = ""

    toasts.forEach((toast) => {
      const toastElement = document.createElement("div")
      toastElement.className =
        "bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs animate-in slide-in-from-right-5"
      toastElement.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-gray-900">${toast.title}</h3>
            ${toast.description ? `<p class="text-sm text-gray-600">${toast.description}</p>` : ""}
          </div>
          <button class="text-gray-400 hover:text-gray-600" data-toast-id="${toast.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `

      const closeButton = toastElement.querySelector(`button[data-toast-id="${toast.id}"]`)
      if (closeButton) {
        closeButton.addEventListener("click", () => dismiss(toast.id))
      }

      toastContainer.appendChild(toastElement)
    })

    return () => {
      toasts.forEach((toast) => {
        const closeButton = document.querySelector(`button[data-toast-id="${toast.id}"]`)
        if (closeButton) {
          closeButton.removeEventListener("click", () => dismiss(toast.id))
        }
      })
    }
  }, [toasts])

  return { toast, dismiss }
}
