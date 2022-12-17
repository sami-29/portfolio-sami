export default function Services() {
  return (
    <main>
      <div className='flex flex-col font-mono ml-auto mr-auto mt-24 px-4 sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl dark:text-white '>
          Services
        </h1>
        <p className='text-lg dark:text-gray-400 mt-10'>
          The services i offer :
        </p>
        <ol className='text-lg dark:text-gray-400 my-8'>
          <li>Static/Dynamic Websites</li>
          <li>Animations and 3D</li>
          <li>Revisiting and debugging code</li>
          <li>Fullstack websites (beginner)</li>
          <li>Headless Ecommerce for highly performant frontend (beginner)</li>
        </ol>
      </div>
    </main>
  );
}
