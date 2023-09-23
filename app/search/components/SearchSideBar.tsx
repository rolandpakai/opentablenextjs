import { PRICE } from "@prisma/client";
import Link from "next/link";
import { SearchParamsType } from "../page";

type ListLike = {
  id: number,
  name: string,
};

const priceOptions = [{
  name: "price",
  label: "$",
  price: PRICE.CHEAP,

},{
  name: "price",
  label: "$$",
  price: PRICE.REGULAR,
},{
  name: "price",
  label: "$$$",
  price: PRICE.EXPENSIVE,
}];

const getSearchHRef = (paramName: string, paramValue: string, searchParams: SearchParamsType) => {
  return {
    pathname: "/search",
    query: {
      ...searchParams,
      [paramName]: paramValue,
    }
  }
};

const getRoundedCssClass = (length: number, index: number) => {
  let className = "";

  switch (true) {
    case index === 0: className = "rounded-l"; break;
    case index === length - 1: className = "rounded-r"; break;
    default: className = "";
  }

  return className;
};

const renderList =<T extends ListLike>(
  type: string, 
  list: T[],
  searchParams: SearchParamsType,
  ) =>{
  return list.map(item => (
    <Link 
      key={item.id} 
      href={getSearchHRef(type, item.name, searchParams)}
      className="font-light text-reg capitalize"
    >
      {item.name}
    </Link>
  ));
}

export default function SearchSideBar({
    locations, 
    cuisines,
    searchParams,
  }: {
    locations: ListLike[], 
    cuisines: ListLike[],
    searchParams: SearchParamsType,
}) {

  const filterOptions = [{
    name: "city",
    options: locations,
  }, {
    name: "cuisine",
    options: cuisines,
  }];

  return (
    <div className="w-1/5">
      {
        filterOptions.map(({name, options}) => (
          <div key={name} className="border-b pb-4 flex flex-col">
            <h1 className="mb-2 capitalize">{name}</h1>
              {renderList(name, options, searchParams)}
          </div>
        ))
      }

      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {
            priceOptions.map(({name, label, price}, index) => { 
              return (
                <Link 
                  key={label}
                  href={getSearchHRef(name, price, searchParams)}
                  className={`border w-full text-reg font-light p-2 ${getRoundedCssClass(priceOptions.length, index)}`}
                >
                  {label}
                </Link>
            )})
          }
        </div>
      </div>
    </div>
  )
}