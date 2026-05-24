import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline, IoTimeOutline, IoHeadsetOutline, IoCloudUploadOutline } from 'react-icons/io5';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: '',
    details: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // إيميل الشركة - غير هذا البريد إلى إيميل الشركة الحقيقي
  const COMPANY_EMAIL = "support@indusconnect.com";

  // Handle file selection with 15MB limit
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    
    if (file) {
      const maxSize = 15 * 1024 * 1024; // 15MB in bytes
      
      if (file.size > maxSize) {
        setFileError(`File size exceeds 15MB limit. Current file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        setSelectedFile(null);
        e.target.value = ''; // Clear input
        return;
      }
      
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تجهيز محتوى الإيميل
    const subject = `Complaint: ${formData.issueType || 'General Issue'} - from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Issue Type: ${formData.issueType || 'Not specified'}

Complaint Details:
${formData.details}

${selectedFile ? `\nAttachment: ${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB)` : ''}

---
This message was sent from IndusConnect Contact Form
    `.trim();

    // فتح عميل البريد الإلكتروني
    const mailtoLink = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // إظهار رسالة نجاح
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Reset form after submission (optional)
      if (selectedFile) {
        alert(`Note: Your file "${selectedFile.name}" couldn't be attached via email.\nPlease send it separately to ${COMPANY_EMAIL}\n\nYour complaint details have been opened in your email client.`);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-32 lg:pt-40 pb-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - كما في الصورة */}
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-12 tracking-tight"
        >
          Add Complaint / Contact Us
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Row 1: Name & Email */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-lg font-bold text-slate-800">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-5 py-4 rounded-xl border-[1.5px] border-slate-300 focus:border-black focus:ring-0 transition-all placeholder:text-slate-400 font-medium"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="block text-lg font-bold text-slate-800">Email</label>
              <input
                type="email"
                name="email"
                placeholder="name@gmail.com"
                className="w-full px-5 py-4 rounded-xl border-[1.5px] border-slate-300 focus:border-black focus:ring-0 transition-all placeholder:text-slate-400 font-medium"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
          </div>

          {/* Row 2: Complaint Type (Select) */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-slate-800">Complaint Type</label>
            <select 
              name="issueType"
              className="w-full px-5 py-4 rounded-xl border-[1.5px] border-slate-300 focus:border-black focus:ring-0 transition-all bg-white font-medium appearance-none"
              onChange={handleChange}
              value={formData.issueType}
              required
            >
              <option value="">Select an issue</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Supplier Delivery">Supplier Delivery</option>
              <option value="Payment Problem">Payment Problem</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Row 3: Complaint Details (Textarea) */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-slate-800">Complaint Details</label>
            <textarea
              name="details"
              rows="6"
              placeholder="Describe your issue in details ..."
              className="w-full px-5 py-4 rounded-xl border-[1.5px] border-slate-300 focus:border-black focus:ring-0 transition-all placeholder:text-slate-400 font-medium resize-none"
              onChange={handleChange}
              value={formData.details}
              required
            ></textarea>
          </div>

          {/* Row 4: Upload File - Working with 15MB limit */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-slate-800">
              Upload File <span className="text-slate-400 font-normal text-sm ml-2">(Optional, Max 15MB)</span>
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="cursor-pointer bg-[#E2E8F0] hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
                <IoCloudUploadOutline size={20} />
                choose file
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  accept="image/*,application/pdf,.doc,.docx,.txt"
                />
              </label>
              <span className={`font-medium italic ${selectedFile ? 'text-green-600' : 'text-slate-500'}`}>
                {selectedFile ? selectedFile.name : 'No file chosen'}
              </span>
            </div>
            {fileError && (
              <p className="text-red-500 text-xs mt-1">{fileError}</p>
            )}
            {selectedFile && !fileError && (
              <p className="text-green-600 text-xs mt-1">
                ✓ File selected: {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB / 15MB
              </p>
            )}
            <p className="text-xs text-slate-400 mt-1">
              Note: Attachments are not supported via email link. Please send files separately to {COMPANY_EMAIL}
            </p>
          </div>

          {/* Submit Button - Black Style */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="cursor-pointer w-full bg-black text-white py-5 rounded-full font-bold text-lg shadow-xl hover:bg-slate-800 transition-all mt-10"
          >
            {isLoading ? "Opening Email..." : "Submit Complaint"}
          </motion.button>
        </form>

        {/* Bottom Info Section - منع النسخ */}
        <div 
          className="grid md:grid-cols-3 gap-6 mt-24 select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 shadow-sm">
            <IoShieldCheckmarkOutline className="text-3xl text-slate-800" />
            <h4 className="font-bold text-slate-900">Privacy Protected</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Your information is safe with us.</p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 shadow-sm">
            <IoTimeOutline className="text-3xl text-slate-800" />
            <h4 className="font-bold text-slate-900">Response Time</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">We usually reply within 24-48 hours.</p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 shadow-sm">
            <IoHeadsetOutline className="text-3xl text-slate-800" />
            <h4 className="font-bold text-slate-900">Need Help?</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Contact our support team anytime.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ContactUs;