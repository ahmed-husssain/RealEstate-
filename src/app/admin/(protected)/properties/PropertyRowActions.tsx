'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { deletePropertyAction } from '@/lib/actions/admin-properties';

export function PropertyRowActions({
  propertyId,
  slug,
  title,
}: {
  propertyId: string;
  slug: string;
  title: string;
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await deletePropertyAction(propertyId);
      if (res.success) {
        setModalOpen(false);
        router.refresh();
      } else {
        setError(res.error || 'Failed to delete property listing');
      }
    } catch (err: any) {
      setError(err?.message || 'A network error occurred while deleting');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
          onClick={() => {
            setError(null);
            setModalOpen(true);
          }}
          title="Delete Property"
          className="p-1.5 h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={modalOpen}
        onClose={() => !isDeleting && setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Property Listing"
        itemName={title}
        itemType="property listing"
        warningMessage="This action will permanently delete this property listing along with all its uploaded images and specifications from the database."
        isLoading={isDeleting}
        error={error}
      />
    </>
  );
}
