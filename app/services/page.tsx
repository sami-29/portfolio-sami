import servicesData from "./servicesData";

export default function Services() {
  return (
    <main>
      <div className='dark:text-gray-400 flex flex-col font-mono ml-auto mr-auto mt-24 px-4 sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl dark:text-white '>
          Services
        </h1>
        <p className='text-lg  mt-10'>The services i offer :</p>
        <ol className='text-lg  my-8'>
          {servicesData.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ol>
        <p>Rate : 10-15$/hr.</p>
      </div>
    </main>
  );
}
