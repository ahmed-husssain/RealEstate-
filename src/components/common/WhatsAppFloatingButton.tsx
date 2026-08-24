'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function WhatsAppFloatingButton({
  // Note: Phone number is a placeholder requiring official business credential input in production phase
  phoneNumber = '923008224110',
  defaultMessage = 'Hello Amber Property Corner, I would like to inquire about your prime real estate portfolio.',
}: WhatsAppFloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto">
      {/* Tooltip Label */}
      <div
        className={cn(
          'hidden sm:flex items-center gap-2 bg-[#1F1B16]/95 text-[#F8F4ED] text-xs font-mono px-3.5 py-2 rounded-full border border-[#6E7A67]/40 shadow-xl backdrop-blur-md transition-all duration-300 transform',
          isHovered
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-3 pointer-events-none'
        )}
      >
        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        <span>Chat with Amber Property Corner</span>
      </div>

      {/* WhatsApp Action Button with Official Brand Monogram */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact Amber Property Corner on WhatsApp"
        title="Chat with Amber Property Corner on WhatsApp"
        className="group relative w-14 h-14 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2 focus:ring-offset-[#f5efe6] cursor-pointer bg-[#22c55e] flex items-center justify-center p-0.5 border-2 border-white/80"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src="/amber-property-corner-whatsapp.png"
            alt="Amber Property Corner WhatsApp Concierge"
            fill
            sizes="56px"
            priority={false}
            className="object-contain"
          />
        </div>
      </a>
    </div>
  );
}

export default WhatsAppFloatingButton;
