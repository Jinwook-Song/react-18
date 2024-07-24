export default function Banner() {
  return (
    <section className='h-96 bg-yellow-900 relative'>
      <div className="w-full h-full bg-cover opacity-70 bg-[url('./assets/images/banner.jpg')]"></div>
      <div className='absolute top-1/2 -translate-y-1/2 w-full text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='text-6xl'>Shot with US</h2>
        <p className='text-2xl'>Best products, High Quality</p>
      </div>
    </section>
  );
}
