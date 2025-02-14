import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Card,
  Avatar,
  Spin,
  Row,
  Col,
  Typography,
  Timeline,
  Drawer,
  Space,
  Form,
  Input,
  Select,
  message,
  Progress,
  Skeleton,
} from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  MenuOutlined,
  LoadingOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Mail, Phone, CheckCircle } from "lucide-react";

const { Header, Content, Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// Loading Screen Component
const LoadingScreen = () => (
  <div className="fixed inset-0 w-screen h-screen bg-gray-100 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-4"
    >
      <Card className="bg-slate-800 border-slate-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Skeleton.Avatar
              active
              size={80}
              shape="circle"
              className="[&_.ant-skeleton-avatar]:bg-slate-600"
            />
          </div>

          <Skeleton
            active
            paragraph={{ rows: 3 }}
            className="[&_.ant-skeleton-title]:bg-slate-600 [&_.ant-skeleton-paragraph>li]:bg-slate-600"
          />

          <div className="mt-8 flex justify-center">
            <Text className="text-blue-400 text-xl font-medium animate-pulse">
              Loading HelpDesk...
            </Text>
          </div>

          <div className="mt-6">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  </div>
);
// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/pricing", label: "Pricing" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          HelpDesk
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center">
          <div className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base hover:text-blue-600 transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Get Started Button */}
        <div className="hidden md:flex">
          <Button type="primary" className="px-6">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MenuOutlined className="text-black text-2xl" /> {/* ✅ AntD Icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-5 flex flex-col space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block text-base hover:text-blue-600 transition-colors ${
                location.pathname === item.path
                  ? "text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/">
            <Button type="primary" className="w-full mt-4">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
// Hero Section
const HeroSection = () => {
  return (
    <div className="bg-white min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div {...fadeIn}>
              <Title
                level={1}
                className="text-5xl font-bold text-gray-900 mb-6"
              >
                Elevate Your Customer Support
              </Title>
              <Paragraph className="text-lg text-gray-600 mb-8">
                A powerful and intuitive help desk solution designed to enhance
                team efficiency and customer satisfaction.
              </Paragraph>
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Button>
                <Button
                  size="large"
                  className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  Learn More
                </Button>
              </Space>
            </motion.div>
          </Col>
          <Col xs={24} lg={12} className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/public/725_generated.jpg"
                alt="Help Desk"
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageOutlined className="text-3xl text-blue-500" />,
      title: "Smart Ticket Management",
      description:
        "Automated routing and prioritization to streamline your support workflow and reduce response times.",
    },
    {
      icon: <TeamOutlined className="text-3xl text-blue-500" />,
      title: "Team Collaboration",
      description:
        "Real-time collaboration tools to help your team work together seamlessly on complex support issues.",
    },
    {
      icon: <SafetyCertificateOutlined className="text-3xl text-blue-500" />,
      title: "Security First",
      description:
        "Enterprise-grade security with end-to-end encryption and compliance with major security standards.",
    },
    {
      icon: <ClockCircleOutlined className="text-3xl text-blue-500" />,
      title: "24/7 Availability",
      description:
        "Round-the-clock support system with automated responses and escalation protocols.",
    },
    {
      icon: <DollarOutlined className="text-3xl text-blue-500" />,
      title: "Cost Effective",
      description:
        "Flexible pricing plans that grow with your business needs while maintaining premium features.",
    },
    {
      icon: <CheckCircleOutlined className="text-3xl text-blue-500" />,
      title: "Customer Satisfaction",
      description:
        "Built-in feedback systems and analytics to measure and improve customer satisfaction.",
    },
  ];

  return (
    <div className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <Title level={2} className="mb-4">
            Powerful Features for Modern Support Teams
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to provide exceptional customer support and
            streamline your team's workflow
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="h-full hover:shadow-lg transition-shadow duration-300"
                  bordered={false}
                >
                  <div className="text-center">
                    <div className="mb-6 inline-block p-4 bg-blue-50 rounded-full">
                      {feature.icon}
                    </div>
                    <Title level={4} className="mb-4">
                      {feature.title}
                    </Title>
                    <Paragraph className="text-gray-600">
                      {feature.description}
                    </Paragraph>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

// About Page
// const AboutPage = () => {
//   const team = [
//     {
//       name: "Sarah Johnson",
//       role: "CEO & Founder",
//       image: "/api/placeholder/150/150",
//     },
//     { name: "Michael Chen", role: "CTO", image: "/api/placeholder/150/150" },
//   ];

//   return (
//     <div className="bg-white pt-16 pb-16">
//       {/* Hero Section */}
//       <div className="bg-blue-600 text-white py-20 text-center">
//         <Title level={1} className="text-4xl font-bold">
//           About HelpDesk
//         </Title>
//         <Paragraph className="text-lg text-gray-200 max-w-2xl mx-auto mt-4">
//           We’re dedicated to revolutionizing customer support with innovative
//           technology and exceptional service.
//         </Paragraph>
//       </div>

//       {/* Team Section */}
//       <div className="py-16 max-w-7xl mx-auto px-6 text-center">
//         <Title level={2} className="text-3xl font-semibold text-gray-900 mb-6">
//           Meet Our Team
//         </Title>
//         <Row gutter={[32, 32]} className="mt-8">
//           {team.map((member, index) => (
//             <Col xs={24} sm={12} md={6} key={index}>
//               <Card className="text-center border">
//                 <Avatar
//                   src={member.image}
//                   size={100}
//                   className="mb-4 mx-auto"
//                 />
//                 <Title level={4} className="text-lg font-semibold">
//                   {member.name}
//                 </Title>
//                 <Paragraph className="text-gray-600">{member.role}</Paragraph>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>

//       {/* CTA Section */}
//       <div className="py-16 bg-blue-600 text-white text-center">
//         <Title level={2} className="text-3xl font-semibold mb-4">
//           Ready to Enhance Your Customer Support?
//         </Title>
//         <Paragraph className="text-lg mb-6">
//           Join thousands of businesses using HelpDesk today.
//         </Paragraph>
//         <Link to="/signup">
//           <Button
//             type="primary"
//             size="large"
//             className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-3"
//           >
//             Get Started
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      title: "Starter",
      price: "$29",
      features: [
        "Up to 3 team members",
        "Basic ticket management",
        "Email support",
        "5GB storage",
      ],
    },
    {
      title: "Professional",
      price: "$99",
      features: [
        "Up to 10 team members",
        "Advanced ticket management",
        "Priority support",
        "25GB storage",
        "Custom branding",
        "API access",
      ],
      highlighted: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited team members",
        "Full feature access",
        "24/7 priority support",
        "Unlimited storage",
        "Custom integration",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="py-24 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <Title level={2} className="mb-4">
            Simple, Transparent Pricing
          </Title>
          <Paragraph className="text-xl text-gray-600">
            Choose the plan that best fits your needs
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]} justify="center">
          {plans.map((plan, index) => (
            <Col xs={24} md={8} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  className={`h-full transition-all duration-300 ${
                    plan.highlighted
                      ? "shadow-xl border-blue-500 border-2"
                      : "hover:shadow-lg"
                  }`}
                  bordered={!plan.highlighted}
                >
                  <div className="text-center">
                    <Title level={3} className="mb-4">
                      {plan.title}
                    </Title>
                    <div className="text-3xl font-bold mb-6">{plan.price}</div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      type={plan.highlighted ? "primary" : "default"}
                      size="large"
                      block
                      className={
                        plan.highlighted ? "bg-blue-600 hover:bg-blue-700" : ""
                      }
                    >
                      Get Started
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

// Contact Section
const ContactSection = () => {
  const onFinish = (values) => {
    message.success(
      "Thank you for your message. We will get back to you soon!"
    );
  };

  return (
    <div className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <Title level={2} className="mb-4">
            Get in Touch
          </Title>
          <Paragraph className="text-xl text-gray-600">
            We'd love to hear from you
          </Paragraph>
        </motion.div>

        <Row gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <motion.div {...fadeIn}>
              <Card className="h-full shadow-lg">
                <Form
                  name="contact"
                  onFinish={onFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input placeholder="Your Name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input placeholder="Your Email" />
                  </Form.Item>

                  <Form.Item
                    name="subject"
                    rules={[
                      { required: true, message: "Please select a subject!" },
                    ]}
                  >
                    <Select placeholder="Select Subject">
                      <Select.Option value="support">
                        Technical Support
                      </Select.Option>
                      <Select.Option value="sales">Sales Inquiry</Select.Option>
                      <Select.Option value="partnership">
                        Partnership
                      </Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="message"
                    rules={[
                      { required: true, message: "Please input your message!" },
                    ]}
                  >
                    <TextArea rows={4} placeholder="Your Message" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <motion.div {...fadeIn} className="h-full">
              <Card className="h-full shadow-lg">
                <Title level={3} className="mb-8">
                  Contact Information
                </Title>
                <Space direction="vertical" size="large" className="w-full">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 mr-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">support@helpdesk.com</div>
                    </div>
                  </div>
                  <div>
                    <Title level={4} className="mb-4">
                      Office Hours
                    </Title>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </Space>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "Updates"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Partners", "Blog"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Tutorials", "API Reference", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
    },
  ];

  return (
    <footer className="bg-white text-gray-900 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Row gutter={[48, 48]}>
          {footerSections.map((section, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <Title level={4} className="text-lg font-semibold mb-4">
                {section.title}
              </Title>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <Row justify="space-between" align="middle">
            <Col>
              <Link to="/" className="text-2xl font-bold">
                HelpDesk
              </Link>
              <Paragraph className="text-gray-500 mt-2">
                © 2025 HelpDesk. All rights reserved.
              </Paragraph>
            </Col>
            <Col>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Layout className="min-h-screen">
        <Navigation />
        <Content>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeaturesSection />
                  <PricingSection />
                  {/* <AboutPage /> */}
                  <ContactSection />
                </>
              }
            />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            <Route path="/pricing" element={<PricingSection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
