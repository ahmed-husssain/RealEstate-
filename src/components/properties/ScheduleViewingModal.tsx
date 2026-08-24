'use client';

import React, { useState } from 'react';
import { Modal } from '@/ui/Modal';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Property } from '@/types';
import { CheckCircle2, Video, UserCheck, AlertCircle } from 'lucide-react';
import { submitInquiryAction } from '@/lib/actions/inquiry';
import { InquiryType } from '@prisma/client';
import confetti from 'canvas-confetti';

export interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function ScheduleViewingModal({
  isOpen,
  onClose,
  property,
}: ScheduleViewingModalProps) {
  const [viewingType, setViewingType] = useState<'in-person' | 'virtual'>('in-person');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteHp, setWebsiteHp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await submitInquiryAction({
        propertyId: property.id,
        name,
        email,
        phone,
        type: InquiryType.VIEWING,
        preferredDate: date,
        timeSlot,
        message: `Type: ${viewingType === 'in-person' ? 'On-site Visit' : 'Video Tour'}. Property: ${property.title} (${property.location.address})`,
        website_hp: websiteHp,
      });

      if (res.success) {
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#5c3822', '#2e3a2f', '#D8CEBE', '#847666'],
          });
        } catch (err) {}
      } else {
        setErrorMessage(res.error || 'Failed to submit request');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title="Book a Property Visit"
      subtitle={property.title}
      maxWidth="lg"
    >
      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-medium text-xl text-[#1F1B16]">
              Visit Request Received
            </h4>
            <p className="text-xs text-[#7e7365] max-w-md mx-auto">
              Our agent, <strong className="text-[#1F1B16]">{property.agent.name}</strong>, will contact you shortly at <strong className="text-[#1F1B16]">{phone || email}</strong> to confirm the timing.
            </p>
          </div>
          <div className="bg-[#f5efe6] border border-[#d8cebe] rounded-2xl p-4 text-xs font-mono text-left max-w-sm mx-auto space-y-1">
            <p><strong className="text-[#7e7365]">Format:</strong> {viewingType === 'in-person' ? 'On-site Visit' : 'Video Tour'}</p>
            <p><strong className="text-[#7e7365]">Time:</strong> {date || 'Preferred Date'} at {timeSlot}</p>
            <p><strong className="text-[#7e7365]">Property:</strong> {property.title}</p>
          </div>
          <Button variant="primary" size="md" onClick={handleResetAndClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Anti-spam honeypot (hidden from real users) */}
          <input
            type="text"
            name="website_hp"
            value={websiteHp}
            onChange={(e) => setWebsiteHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden opacity-0 pointer-events-none absolute -left-[9999px]"
          />

          {/* Viewing Type Selector */}
          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-2">
              Visit Option
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setViewingType('in-person')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  viewingType === 'in-person'
                    ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822]'
                    : 'bg-[#f5efe6] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>On-Site Visit</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingType('virtual')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  viewingType === 'virtual'
                    ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822]'
                    : 'bg-[#f5efe6] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video Call Tour</span>
              </button>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Preferred Date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <div>
              <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1.5">
                Preferred Time
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs outline-none focus:border-[#5c3822]"
              >
                <option value="11:00 AM">11:00 AM (Morning)</option>
                <option value="02:00 PM">02:00 PM (Afternoon)</option>
                <option value="04:30 PM">04:30 PM (Evening)</option>
                <option value="06:00 PM">06:00 PM (Sunset)</option>
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3">
            <Input
              label="Your Full Name"
              placeholder="e.g. Muhammad Ahmed Khan"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Phone / WhatsApp"
                type="tel"
                placeholder="0300 1234567"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="ahmed@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading}>
              Confirm Visit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
