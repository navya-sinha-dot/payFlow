import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const Landing = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
      </motion.div>

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left md:pl-10"
              variants={fadeInLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.3 }}
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
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-8"
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <img
                src="/payflow2.svg"
                alt="PayFlow Illustration"
                className="w-72 md:w-[400px] object-contain transform transition duration-500 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-purple-600"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Why Choose PayFlow?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-white" />,
                title: "Lightning Fast",
                desc: "Send money in seconds with our instant transfer technology. No waiting, no delays.",
                delay: 0.3,
              },
              {
                icon: <Shield className="h-8 w-8 text-white" />,
                title: "Bank-Level Security",
                desc: "Your money and data are protected with military-grade encryption and security protocols.",
                delay: 0.5,
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Easy to Use",
                desc: "Simple and intuitive interface. Send money as easily as sending a text message.",
                delay: 0.7,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-8 text-center bg-gray-900 border border-gray-700 shadow-xl hover:scale-105 transform transition duration-300"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: feature.delay }}
              >
                <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-purple-500">
                  {feature.title}
                </h3>
                <p className="text-purple-200">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-purple-950">
        <motion.div
          className="container mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Sending Money?
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust PayFlow for their money transfers.
          </p>
          <div className="flex justify-center mb-4">
            <a
              href="https://github.com/navya-sinha-dot/payFlow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 px-6 py-5 shadow-lg transition-transform transform hover:scale-105"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
