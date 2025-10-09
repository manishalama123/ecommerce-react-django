import React, { useState } from 'react';
import { Package, User, Calendar, DollarSign, Filter, Search } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useOrder } from '../../api/fetchApi';
import { baseRequest } from '../../utils/baseRequest';

const AdminOrderListPage = () => {
    const queryClient = useQueryClient();
    const { user } = useSelector(state => state.auth);
    const { data: orders, isLoading, isError, error } = useOrder();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mutation for updating order status
    const updateStatusMutation = useMutation({
        mutationFn: async ({ orderId, status }) => {
            const response = await baseRequest.patch(
                `/order/${orderId}/`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${user?.access}`
                    }
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
            toast.success('Order status updated successfully!');
        },
        onError: (error) => {
            toast.error('Failed to update order status');
            console.error('Error updating status:', error);
        },
    });

    const getStatusColor = (status) => {
        const colors = {
            paid: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const handleStatusChange = (orderId, newStatus) => {
        updateStatusMutation.mutate({ orderId, status: newStatus });
    };

    const filteredOrders = orders?.filter(order => {
        const matchesSearch = 
            order.id?.toString().includes(searchTerm) ||
            order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.contact_number?.includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    }) || [];

    if (isError) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center text-red-600">
                    <p>Error loading orders: {error?.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by order ID, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                            <option value="all">All Orders</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-800 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No orders found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                {/* Order Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Order #{order.id}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <User className="w-4 h-4" />
                                            <div>
                                                <p className="font-medium text-gray-900">{order.email}</p>
                                                <p className="text-xs">{order.contact_number}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Package className="w-4 h-4" />
                                            <span>{order.items?.length || 0} items</span>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Address:</span> {order.address}
                                    </div>

                                    {/* Payment Method */}
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Payment:</span> 
                                        <span className="ml-1 capitalize">{order.payment_method}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        <span className="text-xl font-bold text-gray-900">
                                            ${parseFloat(order.total_price || 0).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            disabled={updateStatusMutation.isLoading}
                                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                                        >
                                            <option value="paid">Paid</option>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                        <button className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats Summary */}
            {orders && orders.length > 0 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
                    {['paid', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => {
                        const count = orders.filter(o => o.status?.toLowerCase() === status).length;
                        return (
                            <div key={status} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                                <p className="text-2xl font-bold text-gray-900">{count}</p>
                                <p className="text-sm text-gray-600 capitalize">{status}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminOrderListPage;