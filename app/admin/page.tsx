"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Search, Filter, Eye, Check, X, Clock, AlertTriangle, FileText, Wallet, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockRequests = [
  {
    id: 'REQ-001',
    type: 'request',
    name: 'John Doe',
    email: 'john@company.com',
    department: 'IT',
    subject: 'New laptop request',
    requestType: 'Equipment',
    priority: 'Medium',
    status: 'pending',
    date: '2025-01-15',
    description: 'Need a new laptop for development work'
  },
  {
    id: 'REQ-002',
    type: 'request',
    name: 'Jane Smith',
    email: 'jane@company.com',
    department: 'HR',
    subject: 'Annual leave application',
    requestType: 'Leave',
    priority: 'Low',
    status: 'approved',
    date: '2025-01-14',
    description: 'Requesting 5 days annual leave for vacation'
  },
  {
    id: 'WDR-001',
    type: 'withdrawal',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    employeeId: 'EMP-001',
    amount: '$5,000',
    withdrawalType: 'Partial',
    reason: 'Medical emergency',
    status: 'pending',
    date: '2025-01-15',
    bankName: 'First Bank',
    accountNumber: '1234567890'
  },
  {
    id: 'WDR-002',
    type: 'withdrawal',
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    employeeId: 'EMP-002',
    amount: '$2,500',
    withdrawalType: 'Emergency',
    reason: 'Home repairs after flood',
    status: 'approved',
    date: '2025-01-13',
    bankName: 'GTBank',
    accountNumber: '0987654321'
  }
];

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { toast } = useToast();

  const filteredData = mockRequests.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.type === 'request' ? item.subject : item.reason).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const requests = filteredData.filter(item => item.type === 'request');
  const withdrawals = filteredData.filter(item => item.type === 'withdrawal');

  const handleStatusChange = (id: string, newStatus: string) => {
    toast({
      title: `Status Updated`,
      description: `Request ${id} has been ${newStatus}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600"><Check className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Urgent</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const stats = {
    totalRequests: mockRequests.filter(item => item.type === 'request').length,
    totalWithdrawals: mockRequests.filter(item => item.type === 'withdrawal').length,
    pendingItems: mockRequests.filter(item => item.status === 'pending').length,
    approvedToday: mockRequests.filter(item => item.status === 'approved' && item.date === '2025-01-15').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CorpPortal</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/submit-request" className="text-gray-700 hover:text-blue-600 transition-colors">
                Submit Request
              </Link>
              <Link href="/withdrawal" className="text-gray-700 hover:text-blue-600 transition-colors">
                Withdrawal
              </Link>
              <Link href="/admin" className="text-blue-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and review all requests and withdrawal applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalRequests}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Withdrawals</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalWithdrawals}</p>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingItems}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Today</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approvedToday}</p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, ID, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full md:w-96 grid-cols-2">
            <TabsTrigger value="requests">General Requests ({requests.length})</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals ({withdrawals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{request.subject}</h3>
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>ID:</strong> {request.id}</p>
                          <p><strong>Name:</strong> {request.name}</p>
                          <p><strong>Department:</strong> {request.department}</p>
                          <p><strong>Type:</strong> {request.requestType}</p>
                          <p><strong>Date:</strong> {request.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStatusChange(request.id, 'approved')}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleStatusChange(request.id, 'rejected')}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {requests.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No requests found matching your criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="withdrawals">
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <Card key={withdrawal.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{withdrawal.withdrawalType} Withdrawal</h3>
                          {getStatusBadge(withdrawal.status)}
                          <Badge variant="outline" className="text-green-600 border-green-600">{withdrawal.amount}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>ID:</strong> {withdrawal.id}</p>
                          <p><strong>Name:</strong> {withdrawal.name}</p>
                          <p><strong>Employee ID:</strong> {withdrawal.employeeId}</p>
                          <p><strong>Bank:</strong> {withdrawal.bankName}</p>
                          <p><strong>Account:</strong> {withdrawal.accountNumber}</p>
                          <p><strong>Reason:</strong> {withdrawal.reason}</p>
                          <p><strong>Date:</strong> {withdrawal.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {withdrawal.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStatusChange(withdrawal.id, 'approved')}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleStatusChange(withdrawal.id, 'rejected')}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {withdrawals.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No withdrawal applications found matching your criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}