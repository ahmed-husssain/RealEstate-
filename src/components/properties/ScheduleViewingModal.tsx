'use client';

import React, { useState } from 'react';
import { Modal } from '@/ui/Modal';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Badge } from '@/ui/Badge';
import { Property } from '@/types';
import { Calendar, Clock, CheckCircle2, Video, UserCheck, AlertCircle } from 'lucide-react';
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
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
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
        message: `Format: ${viewingType === 'in-person' ? 'Private In-Person Tour' : 'Live 4K Virtual Tour'}. Property: ${property.title}`,
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
        setErrorMessage(res.error || 'Failed to submit viewing request');
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
      title="Private Viewing Appointment"
      subtitle={property.title}
      maxWidth="lg"
    >
      {isSubmitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-medium text-2xl text-[#1F1B16]">
              Appointment Confirmed
            </h4>
            <p className="text-xs text-[#7e7365] max-w-md mx-auto">
              Our Senior Managing Advisor, <strong className="text-[#1F1B16]">{property.agent.name}</strong>, has received your request and will contact you directly at <strong className="text-[#1F1B16]">{email || phone}</strong>.
            </p>
          </div>
          <div className="bg-[#f5efe6] border border-[#d8cebe] rounded-2xl p-4 text-xs font-mono text-left max-w-sm mx-auto space-y-1">
            <p><strong className="text-[#7e7365]">Format:</strong> {viewingType === 'in-person' ? 'Private In-Person Tour' : 'Live Virtual Walkthrough'}</p>
            <p><strong className="text-[#7e7365]">Time:</strong> {date || 'Preferred Date'} at {timeSlot}</p>
            <p><strong className="text-[#7e7365]">Location:</strong> {property.location.address}</p>
          </div>
          <Button variant="primary" size="md" onClick={handleResetAndClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Viewing Type Selector */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-2">
              Viewing Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setViewingType('in-person')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
                  viewingType === 'in-person'
                    ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-inset-highlight'
                    : 'bg-[#f5efe6] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Private In-Person</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingType('virtual')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
                  viewingType === 'virtual'
                    ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-inset-highlight'
                    : 'bg-[#f5efe6] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Live 4K Virtual Tour</span>
              </button>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-1.5">
                Preferred Time
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#5c3822]"
              >
                <option value="10:00 AM">10:00 AM (Morning Light)</option>
                <option value="01:00 PM">01:00 PM (Midday)</option>
                <option value="04:30 PM">04:30 PM (Golden Hour)</option>
                <option value="06:00 PM">06:00 PM (Sunset / Twilight)</option>
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3">
            <Input
              label="Full Name"
              placeholder="e.g. Lord Harrison Sterling"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Email Address"
                type="email"
                placeholder="client@advisory.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Direct Phone"
                type="tel"
                placeholder="+1 (555) 019-2831"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Discretion Note */}
          <div className="bg-[#f5efe6] border border-[#d8cebe]/70 rounded-xl p-3 text-[11px] text-[#7e7365] leading-relaxed">
            All private viewings adhere to strict client confidentiality and non-disclosure standards.
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
              Request Private Tour
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
