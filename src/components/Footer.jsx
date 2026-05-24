import React from 'react';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Account',
      links: [
        { name: 'Log in', href: '/login' },
        { name: 'Sign Up', href: '/signup' },
      ],
    },
    {
      title: 'Information',
      links: [
        { name: 'Our Story', href: '#' },
        { name: 'How it works', href: '#' },
        { name: 'Terms & Privacy Policy', href: '#' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'Contact us', href: '/contact' },
        { name: 'RFQ Guide', href: '#' },
        { name: 'Submit Complaint', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 text-white py-16 font-sans text-left">
      <div className="container mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* قسم اللوجو والسوشيال ميديا */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
                <img 
                    src="/logo.svg" 
                    alt="IndusConnect" 
                    className="w-45 h-12 object-contain" 
                />
                <span className="text-2xl font-semibold tracking-tight -ml-37">IndusConnect</span>
            </div>

            {/* أيقونات السوشيال ميديا باستخدام react-icons */}
            <div className="flex gap-6 text-zinc-300 items-center">
               <a href="#" className="hover:text-white transition-colors">
                  <FaInstagram size={30} />
               </a>
               <a href="#" className="hover:text-white transition-colors">
                  <FaFacebookF size={20} />
               </a>
               <a href="#" className="hover:text-white transition-colors">
                  <RiTwitterXFill size={20} />
               </a>
               <a href="#" className="hover:text-white transition-colors">
                  <FaGoogle size={30} />
               </a>
            </div>
          </div>

          {/* الروابط */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-xl font-medium">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-zinc-300 hover:text-white transition-all text-[15px]">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* سطر الحقوق السفلي */}
        <div className="mt-20 pt-8 flex justify-center border-t border-zinc-500/30">
          <p className="text-zinc-400 text-sm tracking-wide">
            Indusconnect @ {currentYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;