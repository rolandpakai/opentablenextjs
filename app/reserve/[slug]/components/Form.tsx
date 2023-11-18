"use client"

import { useEffect, useState } from "react"
import useReservation from "../../../../hooks/useReservation";
import { CircularProgress } from "@mui/material";

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const { loading, error, createReservation } = useReservation();
  const [day, time] = date.split('T');

  useEffect(() => {
    if (inputs.bookerFirstName && 
      inputs.bookerLastName && 
      inputs.bookerPhone && 
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }

    return setDisabled(true);
  }, [inputs]);

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      ...inputs,
      slug, 
      partySize, 
      day, 
      time,
    });
  }

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        name="bookerFirstName"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        value={inputs.bookerFirstName}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        name="bookerLastName"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        value={inputs.bookerLastName}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        name="bookerPhone"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        value={inputs.bookerPhone}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        name="bookerEmail"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        value={inputs.bookerEmail}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        name="bookerOccasion"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        value={inputs.bookerOccasion}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        name="bookerRequest"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        value={inputs.bookerRequest}
        onChange={handleChangeInputs}
      />
      <button
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
        disabled={disabled || loading}
        onClick={handleClick}
      >
        { loading ? <CircularProgress color="inherit" /> : "Complete reservation" }
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms
        of Use and Privacy Policy. Standard text message rates may apply.
        You may opt out of receiving text messages at any time.
      </p>
    </div>
  )
}
