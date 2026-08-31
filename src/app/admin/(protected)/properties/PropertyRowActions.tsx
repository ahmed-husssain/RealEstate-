'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/Button';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { deletePropertyAction } from '@/lib/actions/admin-properties';

export function PropertyRowActions({ propertyId, slug, title }: { propertyId: string; slug: string; title: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      setIsDeleting(true);
      try {
        const res = await deletePropertyAction(propertyId);
        if (res.success) {
          router.refresh();
        } else {
          alert(res.error || 'Failed to delete property');
        }
      } catch (err: any) {
        alert(err.message || 'Error occurred');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-1.5 justify-end">
      <Link href={`/properties/${slug}`} target="_blank" title="View Public Listing">
        <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8 text-[#7e7365]">
          <ExternalLink className="w-3.5 h-3.5" />
        </Button>
      </Link>

      <Link href={`/admin/properties/${propertyId}/edit`} title="Edit Property">
        <Button variant="secondary" size="sm" className="p-1.5 h-8 w-8 text-[#1F1B16]">
          <Edit className="w-3.5 h-3.5" />
        </Button>
      </Link>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        isLoading={isDeleting}
        disabled={isDeleting}
        title="Delete Property"
        className="p-1.5 h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
