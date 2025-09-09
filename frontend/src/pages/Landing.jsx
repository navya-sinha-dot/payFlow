import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div data-aos="fade-down" data-aos-delay="100">
        <Navbar />
      </div>

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div
              className="w-full md:w-1/2 text-center md:text-left md:pl-10" // added md:pl-8
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Send Money
                <span className="block text-purple-600">Instantly</span>
              </h1>
              <p className="text-xl text-purple-200 mb-10 max-w-xl">
                The fastest and most secure way to transfer money.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to={token ? "/dashboard" : "/signup"}>
                  <Button
                    size="lg"
                    className="bg-purple-700 hover:bg-purple-700 text-white text-lg px-8 py-5 shadow-lg transition-transform transform hover:scale-105"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {!token && (
                  <Link to="/signin">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-purple-600 text-purple-400 hover:text-white hover:border-purple-500 hover:bg-purple-400 text-lg px-8 py-5 shadow-lg transition-transform transform hover:scale-105"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div
              className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-8"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <img
                src="/payflow2.svg"
                alt="PayFlow Illustration"
                className="w-72 md:w-[400px] object-contain transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16 text-purple-600"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Why Choose PayFlow?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="rounded-2xl p-8 text-center bg-gray-900 border border-gray-700 shadow-xl hover:scale-105 transform transition duration-300"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-500">
                Lightning Fast
              </h3>
              <p className="text-purple-200">
                Send money in seconds with our instant transfer technology. No
                waiting, no delays.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 text-center bg-gray-900 border border-gray-700 shadow-xl hover:scale-105 transform transition duration-300"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-500">
                Bank-Level Security
              </h3>
              <p className="text-purple-200">
                Your money and data are protected with military-grade encryption
                and security protocols.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 text-center bg-gray-900 border border-gray-700 shadow-xl hover:scale-105 transform transition duration-300"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-500">
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

      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-purple-950">
        <div
          className="container mx-auto text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Sending Money?
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust PayFlow for their money transfers.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
