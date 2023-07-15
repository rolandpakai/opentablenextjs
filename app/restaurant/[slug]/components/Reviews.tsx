

export default function Reviews() {
  return (
    <div>
      <h1 className='font-bold text-3xl mt-10 mb-7 border-b pb-5'>
        What 87 people are saying
      </h1>
      <div>
        {/* REVIEW CARD */}
        <div className='border-b pb-7 mb-7'>
          <div className='flex'>
            <div className='w-1/6 flex flex-col items-center'>
              <div className='rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center'>
                <div className='text-white text-2xl'>MC</div>
              </div>
              <p className='text-center'>MariaC</p>
            </div>
            <div className='ml-10 w-5/6'>
              <div className='flex items-center'>
                <div className='flex mr-5'>*****</div>
              </div>
              <div className='mt-5'>
                <p className='text-lg font-light'>
                  Steak was delicious. Service was prompt and courteous. Lovely view of the Danube. Seemed reasonably priced as hotel restaurants go. It was a pleasant surprise as we found ourselves unable to get a reservation elsewhere on a busy Saturday night.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* REVIEW CARD */}
      </div>
    </div>
  )
}
