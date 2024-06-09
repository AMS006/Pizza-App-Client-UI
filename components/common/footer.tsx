// components/Footer.js
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <Image src="/logo.jpg" alt="Website Logo" width={100} height={80} className="mr-3" />

                </div>
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <Link href="/" className="hover:text-gray-400">Home</Link>
                    <Link href="/" className="hover:text-gray-400">About Us</Link>
                    <Link href="/" className="hover:text-gray-400">Contact</Link>
                    <Link href="/" className="hover:text-gray-400">Services</Link>
                </div>
                <div className="flex space-x-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>
            <div className="text-center mt-4 text-gray-500">
                &copy; {new Date().getFullYear()} Pizza House. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
