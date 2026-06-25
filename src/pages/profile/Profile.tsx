import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/apiService";
import {
  User as UserIcon,
  ShoppingBag,
  MapPin,
  Lock,
  Edit,
  Camera,
  CheckCircle,
  Truck,
  RotateCcw,
  Clock,
} from "lucide-react";
import {
  Button,
  TextField,
  Alert,
  Tabs,
  Tab,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other} className="py-6">
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);

  // States for Profile update form
  const [editName, setEditName] = useState(user?.name || "");
  const [profileSuccess, setProfileSuccess] = useState("");

  // States for password update
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordAlert, setPasswordAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Fetch Order History via React Query
  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: () => apiService.getOrders(user?.id),
    enabled: !!user?.id,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    updateUser({ name: editName });
    setProfileSuccess("Profile updated successfully!");
    setTimeout(() => setProfileSuccess(""), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordAlert(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordAlert({ type: "error", message: "Please fill in all password fields." });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordAlert({ type: "error", message: "New passwords do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordAlert({ type: "error", message: "New password must be at least 6 characters." });
      return;
    }

    setPasswordAlert({ type: "success", message: "Password updated successfully!" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1 w-fit";
    switch (status) {
      case "delivered":
        return <span className={`${base} bg-emerald-100 text-emerald-700`}><CheckCircle className="h-3 w-3" /> Delivered</span>;
      case "shipped":
        return <span className={`${base} bg-blue-100 text-blue-700`}><Truck className="h-3 w-3" /> Shipped</span>;
      case "processing":
        return <span className={`${base} bg-amber-100 text-amber-700`}><RotateCcw className="h-3 w-3 animate-spin" /> Processing</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}><Clock className="h-3 w-3" /> Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative">
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 border-2 border-sage-dark shadow-md"
          />
          <button className="absolute bottom-0 right-0 bg-sage-dark hover:bg-emerald-700 text-white rounded-full p-2 border-2 border-white shadow shadow-black/10">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <span className="inline-block bg-sage-dark/10 text-sage-dark dark:bg-emerald-950/30 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {user?.role} Access
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-850">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className="text-sage-dark"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<UserIcon className="h-4 w-4" />} label="Edit Details" className="normal-case font-bold" />
          <Tab icon={<ShoppingBag className="h-4 w-4" />} label="Order History" className="normal-case font-bold" />
          <Tab icon={<MapPin className="h-4 w-4" />} label="Address Book" className="normal-case font-bold" />
          <Tab icon={<Lock className="h-4 w-4" />} label="Security" className="normal-case font-bold" />
        </Tabs>
      </div>

      {/* Tab Panels */}
      
      {/* 1. Edit details */}
      <TabPanel value={tabValue} index={0}>
        <div className="max-w-md bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Edit Personal Information</h3>
          {profileSuccess && <Alert severity="success" className="mb-4 rounded-2xl">{profileSuccess}</Alert>}
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <TextField
              fullWidth
              label="Full Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              variant="outlined"
              InputProps={{ className: "rounded-2xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <TextField
              disabled
              fullWidth
              label="Email Address (Cannot change)"
              value={user?.email || ""}
              variant="outlined"
              InputProps={{ className: "rounded-2xl dark:text-white opacity-80" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <Button
              type="submit"
              variant="contained"
              className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case px-6 py-2.5"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </TabPanel>

      {/* 2. Order History */}
      <TabPanel value={tabValue} index={1}>
        {loadingOrders ? (
          <LoadingSpinner />
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white dark:bg-slate-800 rounded-3xl border dark:border-slate-800">
            <ShoppingBag className="h-10 w-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-semibold">No orders placed yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm space-y-4"
              >
                {/* Order Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b dark:border-slate-850 pb-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="font-mono font-bold text-sm text-gray-800 dark:text-white">{order.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">Date Placed</p>
                    <p className="font-bold text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">Total Price</p>
                    <p className="font-extrabold text-sm text-gray-900 dark:text-white">₹{order.total}</p>
                  </div>
                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3.5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center justify-between text-sm">
                      <div className="flex gap-3 items-center">
                        <img src={item.product.images[0]} alt="" className="w-12 h-14 object-cover rounded-xl bg-gray-50" />
                        <div>
                          <p className="font-bold line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-400">
                            Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-extrabold">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping Details */}
                <div className="bg-gray-50 dark:bg-slate-850/50 rounded-2xl p-4 text-xs space-y-1 border dark:border-slate-800">
                  <p className="font-bold">Shipping To:</p>
                  <p>{order.shippingAddress.fullName} • {order.shippingAddress.phone}</p>
                  <p className="text-gray-400">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabPanel>

      {/* 3. Address Book */}
      <TabPanel value={tabValue} index={2}>
        <div className="max-w-md bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700/50 shadow-sm space-y-4">
          <h3 className="font-bold text-lg mb-2">Default Shipping Address</h3>
          <div className="border border-gray-250 dark:border-slate-700 rounded-3xl p-5 space-y-2 relative">
            <IconButton className="absolute right-4 top-4 text-gray-400">
              <Edit className="h-4 w-4" />
            </IconButton>
            <p className="font-bold text-sm">{user?.name || "John Doe"}</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              42, Green Heights, Phase II, Bandra East<br />
              Mumbai, Maharashtra - 400051<br />
              Phone: +91 9998887776
            </p>
          </div>
        </div>
      </TabPanel>

      {/* 4. Security */}
      <TabPanel value={tabValue} index={3}>
        <div className="max-w-md bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Change Password</h3>
          {passwordAlert && <Alert severity={passwordAlert.type} className="mb-4 rounded-2xl">{passwordAlert.message}</Alert>}
          <form onSubmit={handleChangePassword} className="space-y-4">
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              variant="outlined"
              InputProps={{ className: "rounded-2xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              InputProps={{ className: "rounded-2xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              variant="outlined"
              InputProps={{ className: "rounded-2xl dark:text-white" }}
              InputLabelProps={{ className: "dark:text-gray-400" }}
            />
            <Button
              type="submit"
              variant="contained"
              className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case px-6 py-2.5"
            >
              Update Password
            </Button>
          </form>
        </div>
      </TabPanel>

    </div>
  );
};
