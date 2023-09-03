import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-gray-800 text-white py-4 text-center btn"
        >
            <div className="container mx-auto">
                <p>&copy; 2023 BACKGROUND BE GONE</p>
            </div>
        </motion.footer>
    );
};

export default Footer;
