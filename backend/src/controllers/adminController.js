import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Total sales
    const totalSalesAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    // Order counts
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const approvedOrders = await Order.countDocuments({ status: "Approved" });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

    // User counts
    const totalUsers = await User.countDocuments();
    const newUsers = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } });

    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      { $project: { name: "$product.name", count: 1 } }
    ]);

    // Low stock products (any size <= 5)
    const lowStock = await Product.find({
      $or: [
        { "sizes.4": { $lte: 5 } },
        { "sizes.5": { $lte: 5 } },
        { "sizes.6": { $lte: 5 } },
        { "sizes.7": { $lte: 5 } },
        { "sizes.8": { $lte: 5 } },
        { "sizes.9": { $lte: 5 } },
        { "sizes.10": { $lte: 5 } },
        { "sizes.11": { $lte: 5 } },
        { "sizes.12": { $lte: 5 } }
      ]
    }).select("name sizes images");

    // Recent orders and users
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name");
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalSales,
      totalOrders,
      pendingOrders,
      approvedOrders,
      deliveredOrders,
      totalUsers,
      newUsers,
      topProducts,
      lowStock,
      recentOrders,
      recentUsers,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard stats." });
  }
};