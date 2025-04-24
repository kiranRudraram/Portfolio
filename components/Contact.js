// components/Contact.js
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
      <form className="max-w-lg mx-auto space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-800 rounded text-white"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-gray-800 rounded text-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea
            className="w-full p-2 bg-gray-800 rounded text-white"
            rows="5"
            placeholder="Let's connect!"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#1E90FF] rounded-lg text-white hover:bg-[#1E90FF]/80 transition"
        >
          Send Message
        </button>
      </form>
    </motion.section>
  );
}
