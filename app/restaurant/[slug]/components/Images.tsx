
export default function Images({images}: {images: string[]}) {
  return (
    <div>
      <h1 className='font-bol text-3xl mt-10 mb-7 border-b pb-5'>
        {images.length} photo(s)
      </h1>
      <div className='flex flex-wrap'>
        {images.map(image => (
          <img 
            key={image}
            className="w-56 h-44 mr-1 mb-1" 
            src={image}
            alt=""
          />
        ))}
      </div>
    </div>
  )
}
