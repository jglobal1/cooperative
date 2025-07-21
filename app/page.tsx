import Link from 'next/link';
import { Building2, FileText, Wallet, Shield, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
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
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your Corporate
            <span className="text-blue-600"> Requests</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Submit requests and manage withdrawal applications from anywhere. 
            No more office visits - everything you need in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/submit-request">
                <FileText className="mr-2 h-5 w-5" />
                Submit Request
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/withdrawal">
                <Wallet className="mr-2 h-5 w-5" />
                Apply for Withdrawal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Your data is protected with enterprise-grade security measures and encrypted communications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Fast Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Streamlined approval process means faster response times and quicker resolution of your requests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>24/7 Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Access the platform anytime, anywhere. No need to visit the office during business hours.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CorpPortal</span>
            </div>
            <p className="text-gray-400 mb-4">
              Simplifying corporate processes, one request at a time.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 CorpPortal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}