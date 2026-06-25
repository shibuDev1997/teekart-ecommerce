import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../../services/apiService";
import { Product, Order } from "../../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Grid as GridIcon,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
} from "lucide-react";
import {
  Tabs,
  Tab,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  IconButton,
  Avatar,
} from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

export const AdminDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState(0);

  // dialog states
  const [productDialog, setProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // new product form state
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodOriginal, setProdOriginal] = useState(0);
  const [prodCategory, setProdCategory] = useState<"boys" | "girls">("boys");
  const [prodSizes, setProdSizes] = useState("S,M,L,XL");
  const [prodColors, setProdColors] = useState("Black,White");
  const [prodStock, setProdStock] = useState(true);

  // Fetch Dashboard Stats via React Query
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => apiService.getDashboardStats(),
  });

  // Fetch Products via React Query
  const { data: productsData, isLoading: loadingProducts } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => apiService.getProducts({ limit: 100 }),
  });

  // Fetch Users
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => apiService.getUsers(),
  });

  // Fetch Orders
  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => apiService.getOrders(),
  });

  // Mutations
  const createProdMutation = useMutation({
    mutationFn: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => apiService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      setProductDialog(false);
      resetForm();
    },
  });

  const updateProdMutation = useMutation({
    mutationFn: (data: { id: string; updates: Partial<Product> }) =>
      apiService.updateProduct(data.id, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      setProductDialog(false);
      resetForm();
    },
  });

  const deleteProdMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: (data: { id: string; status: Order["status"] }) =>
      apiService.updateOrderStatus(data.id, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const resetForm = () => {
    setEditingProduct(null);
    setProdName("");
    setProdDesc("");
    setProdPrice(0);
    setProdOriginal(0);
    setProdCategory("boys");
    setProdSizes("S,M,L,XL");
    setProdColors("Black,White");
    setProdStock(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdPrice(product.price);
    setProdOriginal(product.originalPrice || 0);
    setProdCategory(product.category);
    setProdSizes(product.sizes.join(","));
    setProdColors(product.colors.join(","));
    setProdStock(product.inStock);
    setProductDialog(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: prodName,
      description: prodDesc,
      price: prodPrice,
      originalPrice: prodOriginal || undefined,
      category: prodCategory,
      sizes: prodSizes.split(",").map((s) => s.trim()),
      colors: prodColors.split(",").map((c) => c.trim()),
      inStock: prodStock,
      featured: editingProduct ? editingProduct.featured : false,
      trending: editingProduct ? editingProduct.trending : false,
      images: editingProduct
        ? editingProduct.images
        : ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"],
    };

    if (editingProduct) {
      updateProdMutation.mutate({ id: editingProduct.id, updates: productData });
    } else {
      createProdMutation.mutate(productData);
    }
  };

  const COLORS_PIE = ["#5A827E", "#B9D4AA"];

  if (loadingStats || loadingProducts || loadingUsers || loadingOrders) {
    return <LoadingSpinner fullPage message="Loading admin console panel..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Console</h1>
          <p className="text-sm text-gray-500 mt-1">Manage shop catalog, orders, promotions, and metrics.</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setProductDialog(true);
          }}
          variant="contained"
          startIcon={<Plus className="h-4 w-4" />}
          className="bg-sage-dark hover:bg-emerald-700 text-white rounded-2xl normal-case font-bold py-2.5 px-5 shadow-lg shadow-sage-dark/10"
        >
          Add New Product
        </Button>
      </div>

      {/* Tabs */}
      <Box className="border-b border-gray-250 dark:border-slate-800 mb-6">
        <Tabs value={tabIndex} onChange={(_e, v) => setTabIndex(v)}>
          <Tab label="Dashboard Metrics" className="normal-case font-bold" />
          <Tab label="Product Inventory" className="normal-case font-bold" />
          <Tab label="Order Management" className="normal-case font-bold" />
          <Tab label="User Directory" className="normal-case font-bold" />
        </Tabs>
      </Box>

      {/* Tab Panel 0: Overview Metrics */}
      {tabIndex === 0 && stats && (
        <div className="space-y-8">
          {/* KPI metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 dark:text-white">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
                  <h3 className="text-2xl font-extrabold">₹{stats.revenue}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 dark:text-white">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Orders</p>
                  <h3 className="text-2xl font-extrabold">{stats.ordersCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 dark:text-white">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Users</p>
                  <h3 className="text-2xl font-extrabold">{stats.usersCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 dark:text-white">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Products</p>
                  <h3 className="text-2xl font-extrabold">{stats.productsCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <GridIcon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sales bar chart */}
            <Card className="lg:col-span-2 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 dark:bg-slate-800 dark:text-white">
              <h3 className="font-bold text-base mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sage-dark" /> Sales Revenue (Last 6 Months)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.salesByMonth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} unit="₹" />
                    <ChartTooltip cursor={{ fill: "rgba(0,0,0,0.02)" }} />
                    <Bar dataKey="amount" fill="#5A827E" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Category distribution pie chart */}
            <Card className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 dark:bg-slate-800 dark:text-white flex flex-col justify-between">
              <h3 className="font-bold text-base mb-2">Category Distribution</h3>
              <div className="h-60 relative flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.categoryDistribution}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                    >
                      {stats.categoryDistribution.map((_entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS_PIE[idx % COLORS_PIE.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {stats.categoryDistribution.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS_PIE[idx] }}
                    ></span>
                    <span>{entry.category}: {entry.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Orders Overview */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <TableContainer component={Paper} className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 overflow-hidden">
              <Table>
                <TableHead className="bg-gray-50 dark:bg-slate-900/60">
                  <TableRow>
                    <TableCell className="font-bold dark:text-gray-300">Order ID</TableCell>
                    <TableCell className="font-bold dark:text-gray-300">Customer</TableCell>
                    <TableCell className="font-bold dark:text-gray-300">Items Count</TableCell>
                    <TableCell className="font-bold dark:text-gray-300">Total Price</TableCell>
                    <TableCell className="font-bold dark:text-gray-300">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recentOrders.map((ord) => (
                    <TableRow key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <TableCell className="font-mono font-semibold dark:text-gray-100">{ord.id}</TableCell>
                      <TableCell className="dark:text-gray-300">{ord.shippingAddress.fullName}</TableCell>
                      <TableCell className="dark:text-gray-300">{ord.items.length}</TableCell>
                      <TableCell className="font-bold dark:text-gray-300">₹{ord.total}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                            ord.status === "delivered"
                              ? "bg-emerald-100 text-emerald-700"
                              : ord.status === "processing"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}

      {/* Tab Panel 1: Product inventory */}
      {tabIndex === 1 && productsData && (
        <div className="space-y-4">
          <TableContainer component={Paper} className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 overflow-hidden">
            <Table>
              <TableHead className="bg-gray-50 dark:bg-slate-900/60">
                <TableRow>
                  <TableCell className="font-bold dark:text-gray-300">Image</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Name</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Category</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Price</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Stock Status</TableCell>
                  <TableCell className="font-bold dark:text-gray-300 text-center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsData.data.map((prod) => (
                  <TableRow key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <TableCell>
                      <img src={prod.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg bg-gray-50" />
                    </TableCell>
                    <TableCell className="font-bold dark:text-gray-100 line-clamp-1 max-w-[200px]">{prod.name}</TableCell>
                    <TableCell className="uppercase text-xs dark:text-gray-300">{prod.category}</TableCell>
                    <TableCell className="font-bold dark:text-gray-300">₹{prod.price}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          prod.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {prod.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <IconButton size="small" onClick={() => handleEditClick(prod)} className="text-blue-500">
                          <Edit className="h-4.5 w-4.5" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this product?")) {
                              deleteProdMutation.mutate(prod.id);
                            }
                          }}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Tab Panel 2: Orders list */}
      {tabIndex === 2 && orders && (
        <div className="space-y-4">
          <TableContainer component={Paper} className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 overflow-hidden">
            <Table>
              <TableHead className="bg-gray-50 dark:bg-slate-900/60">
                <TableRow>
                  <TableCell className="font-bold dark:text-gray-300">Order ID</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Customer</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Subtotal</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Total Paid</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Status</TableCell>
                  <TableCell className="font-bold dark:text-gray-300 text-center">Change Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((ord) => (
                  <TableRow key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <TableCell className="font-mono font-bold dark:text-gray-100">{ord.id}</TableCell>
                    <TableCell className="dark:text-gray-300">
                      <p className="font-semibold text-sm">{ord.shippingAddress.fullName}</p>
                      <p className="text-xs text-gray-400">{ord.shippingAddress.phone}</p>
                    </TableCell>
                    <TableCell className="dark:text-gray-300">₹{ord.subtotal}</TableCell>
                    <TableCell className="font-bold dark:text-gray-300">₹{ord.total}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                          ord.status === "delivered"
                            ? "bg-emerald-100 text-emerald-700"
                            : ord.status === "processing"
                            ? "bg-amber-100 text-amber-700"
                            : ord.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : ord.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Select
                          value={ord.status}
                          size="small"
                          onChange={(e) => updateOrderMutation.mutate({ id: ord.id, status: e.target.value as any })}
                          className="rounded-xl bg-gray-50 dark:bg-slate-900 dark:text-white"
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="processing">Processing</MenuItem>
                          <MenuItem value="shipped">Shipped</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                          <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Tab Panel 3: Users */}
      {tabIndex === 3 && users && (
        <div className="space-y-4">
          <TableContainer component={Paper} className="rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm dark:bg-slate-800 overflow-hidden">
            <Table>
              <TableHead className="bg-gray-50 dark:bg-slate-900/60">
                <TableRow>
                  <TableCell className="font-bold dark:text-gray-300">Avatar</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Name</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Email</TableCell>
                  <TableCell className="font-bold dark:text-gray-300">Role</TableCell>
                  <TableCell className="font-bold dark:text-gray-300 text-center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((usr) => (
                  <TableRow key={usr.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <TableCell>
                      <Avatar src={usr.avatar} alt={usr.name} className="h-9 w-9 border" />
                    </TableCell>
                    <TableCell className="font-bold dark:text-gray-100">{usr.name}</TableCell>
                    <TableCell className="dark:text-gray-300">{usr.email}</TableCell>
                    <TableCell className="uppercase text-xs dark:text-gray-300">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold ${
                          usr.role === "admin" ? "bg-red-50 text-red-600 border border-red-200" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {usr.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <IconButton
                          disabled={usr.role === "admin"}
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this user?")) {
                              deleteUserMutation.mutate(usr.id);
                            }
                          }}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* CRUD Add/Edit Product Dialog */}
      <Dialog open={productDialog} onClose={() => setProductDialog(false)} PaperProps={{ className: "rounded-3xl p-4 dark:bg-slate-800 dark:text-white" }}>
        <DialogTitle className="font-bold text-lg border-b dark:border-slate-700 pb-2">
          {editingProduct ? "Edit Product Details" : "Create New Product"}
        </DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent className="space-y-4 pt-4">
            <TextField
              fullWidth
              label="Product Name"
              required
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              InputProps={{ className: "rounded-xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              required
              value={prodDesc}
              onChange={(e) => setProdDesc(e.target.value)}
              InputProps={{ className: "rounded-xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Price (INR)"
                type="number"
                required
                value={prodPrice}
                onChange={(e) => setProdPrice(parseFloat(e.target.value))}
                InputProps={{ className: "rounded-xl dark:text-white" }}
                InputLabelProps={{ className: "dark:text-gray-400" }}
              />
              <TextField
                fullWidth
                label="Original Price (Optional)"
                type="number"
                value={prodOriginal}
                onChange={(e) => setProdOriginal(parseFloat(e.target.value))}
                InputProps={{ className: "rounded-xl dark:text-white" }}
                InputLabelProps={{ className: "dark:text-gray-400" }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormControl fullWidth>
                <InputLabel className="dark:text-gray-400">Category</InputLabel>
                <Select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value as any)}
                  className="rounded-xl dark:text-white"
                  label="Category"
                >
                  <MenuItem value="boys">Boys</MenuItem>
                  <MenuItem value="girls">Girls</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel className="dark:text-gray-400">Stock Status</InputLabel>
                <Select
                  value={prodStock ? "yes" : "no"}
                  onChange={(e) => setProdStock(e.target.value === "yes")}
                  className="rounded-xl dark:text-white"
                  label="Stock Status"
                >
                  <MenuItem value="yes">In Stock</MenuItem>
                  <MenuItem value="no">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              fullWidth
              label="Sizes (Comma separated)"
              placeholder="XS,S,M,L,XL"
              value={prodSizes}
              onChange={(e) => setProdSizes(e.target.value)}
              InputProps={{ className: "rounded-xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <TextField
              fullWidth
              label="Colors (Comma separated)"
              placeholder="Black,White,Blue"
              value={prodColors}
              onChange={(e) => setProdColors(e.target.value)}
              InputProps={{ className: "rounded-xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
          </DialogContent>
          <DialogActions className="border-t dark:border-slate-700 pt-3">
            <Button onClick={() => setProductDialog(false)} className="text-gray-500 font-bold normal-case">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="bg-sage-dark hover:bg-emerald-700 text-white rounded-xl font-bold normal-case"
            >
              {editingProduct ? "Save Changes" : "Create Product"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
};
