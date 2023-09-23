import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestaurantCard from './components/RestaurantCard';
import { PrismaClient, Location, Cuisine, PRICE, Review } from '@prisma/client';

export type RestaurantCardType = {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  slug: string;
  location: Location;
  cuisine: Cuisine;
  reviews: Review[];
};

export type SearchParamsType = {
  city?: string;
  cuisine?: string; 
  price?: PRICE;
}

const prisma = new PrismaClient();

const fetchRestaurantsBySearchParams = async (searchParams: SearchParamsType): Promise<RestaurantCardType[]> => {
  const where: any = {};
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      }
    };

    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      }
    };

    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };

    where.price = price;
  }

  let restaurants = await prisma.restaurant.findMany({where, select});

  return restaurants;
}

const fetchLocations = async () => {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  return locations;
}

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  return cuisines;
}


export default async function Search({
  searchParams
  }: {
    searchParams: SearchParamsType
  }) {
  
  const restaurants = await fetchRestaurantsBySearchParams(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
      <>
        <Header />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
          <div className="w-5/6">
            {
              restaurants.length ? (
                <>
                  {restaurants.map(restaurant => (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant}
                    />
                  ))}
                </>
              ) : (
              <p>Sorry, we found no restaurant.</p>
              )
            }
          </div>
      </div>
    </>
  );
}