import { convertToDisplayTime } from "../../../../utils/convertToDisplayTime";
import { format } from "date-fns";

const getPeopleByPartySize = (partySize: string) => {
  if (parseInt(partySize, 10) === 1) {
    return `${partySize} person`;
  } else {
    return `${partySize} people`;
  }
}

export default function Header({ 
  name, 
  image,
  date,
  partySize,
}: { 
  name: string, 
  image: string,
  date: string,
  partySize: string,
}) {
  const [day, time] = date.split('T');

  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img
          src={ image }
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">
            { name }
          </h1>
          <div className="flex mt-3">
            <p className="mr-6">{ format(new Date(date), "ccc, MMM d") }</p>
            <p className="mr-6">{ convertToDisplayTime(time) }</p>
            <p className="mr-6">{ getPeopleByPartySize(partySize) } </p>
          </div>
        </div>
      </div>
    </div>
  )
}
