import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

async function fetchAreasFromDb() {
  try {
    const areas = await prisma.area.findMany({
      orderBy: [{ isPopular: 'desc' }, { name: 'asc' }],
      include: {
        properties: {
          select: {
            id: true,
            price: true,
            areaSize: true,
          },
        },
      },
    });

    return areas;
  } catch (error) {
    console.error('Error fetching areas from database:', error);
    return [];
  }
}

export const getAreas = async () => {
  return unstable_cache(
    fetchAreasFromDb,
    ['areas-list'],
    { revalidate: 120, tags: ['areas'] }
  )();
};

async function fetchAreaBySlugFromDb(slug: string) {
  try {
    const area = await prisma.area.findUnique({
      where: { slug },
      include: {
        properties: {
          include: {
            area: true,
            agent: true,
            images: {
              orderBy: { displayOrder: 'asc' },
            },
          },
          orderBy: { isFeatured: 'desc' },
        },
      },
    });

    if (!area) return null;

    return {
      ...area,
      properties: area.properties.map((p) => ({
        ...p,
        price: Number(p.price),
        areaSize: Number(p.areaSize),
      })),
    };
  } catch (error) {
    console.error(`Error fetching area "${slug}":`, error);
    return null;
  }
}

export const getAreaBySlug = async (slug: string) => {
  return unstable_cache(
    () => fetchAreaBySlugFromDb(slug),
    ['area-detail', slug],
    { revalidate: 120, tags: ['areas', `area-${slug}`] }
  )();
};
