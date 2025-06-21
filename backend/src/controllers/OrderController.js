import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Place a new order from user's cart
export const placeOrder = async (req, res) => {
  try {
    const { address, phone } = req.body;
    if (!address || !phone) {
      return res.status(400).json({ message: "Shipping address and phone are required." });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Prepare order items and check stock
    let total = 0;
    for (const item of cart.items) {
      const prod = await Product.findById(item.product._id);
      const availableQty = prod.sizes[item.size];
      if (availableQty === undefined || availableQty < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${prod.name} (size ${item.size})` });
      }
      total += prod.price * item.quantity;
    }

    // Deduct stock for each item
    for (const item of cart.items) {
      const prod = await Product.findById(item.product._id);
      prod.sizes[item.size] -= item.quantity;
      await prod.save();
    }

    // Before creating the order, add this check:
    for (const item of cart.items) {
      if (!item.product || !item.product.price) {
        return res.status(400).json({ message: "Invalid product in cart. Please remove and re-add the item." });
      }
    }

    console.log("Cart items before order:", cart.items);


    // Create order
    const order = new Order({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        price: item.product.price,
      })),
      shippingInfo: { address, phone },
      total,
      status: "Pending",
    });
    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ message: "Failed to place order." });
  }
};

// Get all orders for current user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};

// Get order by ID (for user)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order." });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all orders." });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status." });
  }
};