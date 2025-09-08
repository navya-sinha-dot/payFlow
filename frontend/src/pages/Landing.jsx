import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => {
  const token = localStorage.getItem("token"); // ✅ check if signed in

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div data-aos="fade-down" data-aos-delay="100">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <div data-aos="fade-up" data-aos-delay="200">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Send Money
              <span className="block text-purple-500">Instantly</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              The fastest and most secure way to transfer money to friends,
              family, and businesses worldwide.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {/* Always show Get Started */}
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              {/* ✅ Only show Sign In if user is NOT signed in */}
              {!token && (
                <Link to="/signin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-600 text-purple-400 hover:text-white hover:border-purple-500 hover:bg-purple-400 text-lg px-8 py-6"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16 text-purple-500"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Why Choose PayFlow?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="card-elevated rounded-xl p-8 text-center hover-lift bg-gray-900"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Lightning Fast
              </h3>
              <p className="text-purple-200">
                Send money in seconds with our instant transfer technology. No
                waiting, no delays.
              </p>
            </div>

            <div
              className="card-elevated rounded-xl p-8 text-center hover-lift bg-gray-900"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Bank-Level Security
              </h3>
              <p className="text-purple-200">
                Your money and data are protected with military-grade encryption
                and security protocols.
              </p>
            </div>

            <div
              className="card-elevated rounded-xl p-8 text-center hover-lift bg-gray-900"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Easy to Use
              </h3>
              <p className="text-purple-200">
                Simple and intuitive interface. Send money as easily as sending
                a text message.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-purple-900">
        <div
          className="container mx-auto text-center"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Sending Money?
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust PayFlow for their money transfers.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
            >
              Create Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
