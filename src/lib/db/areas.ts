import prisma from '@/lib/prisma';

export async function getAreas() {
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

export async function getAreaBySlug(slug: string) {
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
