"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, Wallet, DollarSign, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Withdrawal() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    accountNumber: '',
    bankName: '',
    currentBalance: '',
    withdrawalAmount: '',
    withdrawalType: '',
    reason: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Withdrawal Application Submitted",
        description: "Your withdrawal application has been submitted with ID #WDR-" + Math.floor(Math.random() * 1000) + ". It will be reviewed within 2-3 business days.",
      });
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        employeeId: '',
        accountNumber: '',
        bankName: '',
        currentBalance: '',
        withdrawalAmount: '',
        withdrawalType: '',
        reason: '',
        emergencyContact: '',
        emergencyPhone: ''
      });
    }, 2000);
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
              <Link href="/withdrawal" className="text-blue-600 font-medium">
                Withdrawal
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Withdrawal Application</h1>
          <p className="text-gray-600">Apply for withdrawal from your savings account. Please ensure all information is accurate.</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center text-green-900">
              <Wallet className="mr-2 h-5 w-5" />
              Savings Withdrawal Application
            </CardTitle>
            <CardDescription className="text-green-700">
              Complete this form to request a withdrawal from your savings account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID *</Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      placeholder="Enter your employee ID"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Banking Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Banking Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Select onValueChange={(value) => handleSelectChange('bankName', value)} required>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-bank">First Bank of Nigeria</SelectItem>
                        <SelectItem value="gtbank">Guaranty Trust Bank</SelectItem>
                        <SelectItem value="zenith">Zenith Bank</SelectItem>
                        <SelectItem value="uba">United Bank for Africa</SelectItem>
                        <SelectItem value="access">Access Bank</SelectItem>
                        <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your account number"
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Withdrawal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Withdrawal Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentBalance">Current Savings Balance *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="currentBalance"
                        name="currentBalance"
                        type="number"
                        value={formData.currentBalance}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        required
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="withdrawalAmount">Withdrawal Amount *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="withdrawalAmount"
                        name="withdrawalAmount"
                        type="number"
                        value={formData.withdrawalAmount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        required
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdrawalType">Withdrawal Type *</Label>
                  <Select onValueChange={(value) => handleSelectChange('withdrawalType', value)} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select withdrawal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partial">Partial Withdrawal</SelectItem>
                      <SelectItem value="full">Full Withdrawal</SelectItem>
                      <SelectItem value="emergency">Emergency Withdrawal</SelectItem>
                      <SelectItem value="loan">Loan Against Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Withdrawal *</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Please explain the reason for your withdrawal..."
                    rows={4}
                    required
                    className="resize-none"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Emergency Contact</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Enter emergency contact name"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      placeholder="Enter emergency contact phone"
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Withdrawal applications are subject to approval and may take 2-3 business days to process. 
                  Emergency withdrawals may be processed faster but require additional documentation.
                </p>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 px-8 h-12"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}