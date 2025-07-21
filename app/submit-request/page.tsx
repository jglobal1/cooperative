"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, FileText, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function SubmitRequest() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    requestType: '',
    subject: '',
    description: '',
    priority: '',
    attachments: null
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
        title: "Request Submitted Successfully",
        description: "Your request has been submitted and assigned ID #REQ-" + Math.floor(Math.random() * 1000) + ". You will receive an email confirmation shortly.",
      });
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: '',
        requestType: '',
        subject: '',
        description: '',
        priority: '',
        attachments: null
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
              <Link href="/submit-request" className="text-blue-600 font-medium">
                Submit Request
              </Link>
              <Link href="/withdrawal" className="text-gray-700 hover:text-blue-600 transition-colors">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Request</h1>
          <p className="text-gray-600">Fill out the form below to submit your corporate request. All fields marked with * are required.</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center text-blue-900">
              <FileText className="mr-2 h-5 w-5" />
              Request Details
            </CardTitle>
            <CardDescription className="text-blue-700">
              Please provide detailed information about your request
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select onValueChange={(value) => handleSelectChange('department', value)} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Request Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="requestType">Request Type *</Label>
                  <Select onValueChange={(value) => handleSelectChange('requestType', value)} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipment">Equipment Request</SelectItem>
                      <SelectItem value="leave">Leave Application</SelectItem>
                      <SelectItem value="reimbursement">Expense Reimbursement</SelectItem>
                      <SelectItem value="access">System Access</SelectItem>
                      <SelectItem value="training">Training Request</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select onValueChange={(value) => handleSelectChange('priority', value)} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your request"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide detailed information about your request..."
                  rows={6}
                  required
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>
                  <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 px-8 h-12"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
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