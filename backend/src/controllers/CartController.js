import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get current user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart." });
  }
};

// Add or update item in cart
export const addToCart = async (req, res) => {
  const { product, quantity, size } = req.body;
  if (!product || !quantity || !size) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    // Check product and size stock
    const prod = await Product.findById(product);
    if (!prod) return res.status(404).json({ message: "Product not found." });

    // Check if the size exists and has enough stock
    const availableQty = prod.sizes[size];
    if (availableQty === undefined) {
      return res.status(400).json({ message: "Size not available." });
    }

    // Calculate already-in-cart quantity for this product+size
    let cart = await Cart.findOne({ user: req.user._id });
    let alreadyInCart = 0;
    if (cart) {
      const item = cart.items.find(
        (item) => item.product.toString() === product && item.size === size
      );
      if (item) alreadyInCart = item.quantity;
    }

    if (quantity + alreadyInCart > availableQty) {
      return res.status(400).json({ message: `Only ${availableQty - alreadyInCart} left in stock for size ${size}` });
    }

    // Proceed as before
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product && item.size === size
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity, size });
    }
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart." });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item." });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart." });
  }
};