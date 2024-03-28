import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8"
    >
      <h2 className="text-3xl font-bold mb-4">Welcome to Apex Realtors</h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg mb-6"
      >
        At Apex Realtors, we're not just in the business of buying, selling, or
        renting properties. We're in the business of turning dreams into
        reality. Our journey began with a simple yet profound vision: to
        redefine the real estate experience, one client at a time. With a
        foundation built on trust, integrity, and innovation, we've curated a
        team of passionate professionals dedicated to exceeding your
        expectations.
      </motion.p>
      <h3 className="text-2xl font-bold mb-2">Our Story</h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg mb-6"
      >
        Established in 2024, Apex Realtors emerged as a beacon of excellence in
        the competitive real estate landscape. Founded by <b>Praveen CM</b>, our agency
        was born out of a desire to revolutionize the way people navigate the
        complexities of property transactions. What started as a humble venture
        has grown into a renowned establishment known for its unparalleled
        service and commitment to client satisfaction.
      </motion.p>
      <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg mb-6"
      >
        At Apex Realtors, our mission is clear: to empower individuals and
        families to find their perfect home, investment, or commercial space. We
        strive to create meaningful connections, foster lasting relationships,
        and provide tailored solutions that address the unique needs of each
        client. With a client-centric approach and a dedication to excellence,
        we aim to be the trusted partner you can rely on every step of the way.
      </motion.p>
      <h3 className="text-2xl font-bold mb-2">What Sets Us Apart</h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg mb-6"
      >
        What sets Apex Realtors apart is our unwavering dedication to excellence
        in everything we do. From our transparent communication and personalized
        guidance to our extensive market knowledge and innovative technologies,
        we go above and beyond to deliver results that exceed expectations. We
        understand that every client is different, which is why we take the time
        to listen, understand, and customize our approach to suit your specific
        needs.
      </motion.p>
      <h3 className="text-2xl font-bold mb-2">Our Services</h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-lg mb-6"
      >
        Whether you're buying, selling, renting, or investing, Apex Realtors
        offers a comprehensive range of services to meet your every need. Our
        team of seasoned professionals brings a wealth of experience and
        expertise to the table, ensuring a seamless and stress-free experience
        from start to finish. From property valuations and market analysis to
        negotiations and closing, we're here to guide you every step of the way.
      </motion.p>
      <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-lg mb-6"
      >
        Ready to embark on your real estate journey with Apex Realtors? We
        invite you to explore our website, browse our listings, and discover the
        endless possibilities that await. Whether you're a first-time buyer,
        seasoned investor, or aspiring homeowner, we're here to make your dreams
        a reality. Contact us today to schedule a consultation and experience
        the Apex difference for yourself. Welcome to a world of endless
        opportunities with Apex Realtors.
      </motion.p>
    </motion.div>
  );
}

export default About;
