import { InputsType } from "./AuthModal";

export default function AuthModalInputs({
  inputs, 
  isSignIn,
  handleChangeInputs,
}: {
  inputs: InputsType,
  isSignIn: boolean,
  handleChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) {
  return (
    <div>
      {isSignIn ? null : (<div className="my-3 flex justify-between text-sm">
       <input 
          name="firstName"
          type="text" 
          placeholder="First Name"
          className="border rounded p-2 py-3 w-[49%]" 
          value={inputs.firstName}
          onChange={handleChangeInputs}
        />
        <input 
          name="lastName"
          type="text" 
          placeholder="Last Name"
          className="border rounded p-2 py-3 w-[49%]" 
          value={inputs.lastName}
          onChange={handleChangeInputs}
        />
      </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input 
          name="email"
          type="email" 
          placeholder="Email"
          className="border rounded p-2 py-3 w-full" 
          value={inputs.email}
          onChange={handleChangeInputs}
        />
      </div>

      {isSignIn ? null : (<div className="my-3 flex justify-between text-sm">
        <input 
          name="phone"
          type="text" 
          placeholder="Phone"
          className="border rounded p-2 py-3 w-[49%]" 
          value={inputs.phone}
          onChange={handleChangeInputs}
        />
        <input 
          name="city"
          type="text" 
          placeholder="City"
          className="border rounded p-2 py-3 w-[49%]" 
          value={inputs.city}
          onChange={handleChangeInputs}
        />
      </div>
      )}
      
      <div className="my-3 flex justify-between text-sm">
        <input 
          name="password"
          type="password" 
          placeholder="Password"
          className="border rounded p-2 py-3 w-full" 
          value={inputs.password}
          onChange={handleChangeInputs}
        />
      </div>
    </div>
  )
}
