import Image, { StaticImageData } from "next/image";

interface props {
  img: StaticImageData;
  title: string;
  description: string;
  siteUrl: string;
  githubUrl: string;
}

export default function Project({
  img,
  title,
  description,
  siteUrl,
  githubUrl,
}: props) {
  return (
    <div>
      <div className='rounded-xl md:border-t-24 md:border-x-24 border-gray-300 dark:border-purple-300'>
        <Image src={img} alt={`${title} image`} />
      </div>

      <div className='sm:w-4/5 m-auto my-12 mb-32'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl dark:text-gray-200'>
          {title}
        </h2>
        <p className='dark:text-gray-400 my-6 mb-10  text-lg ml-6'>
          {description}
        </p>
        <div className='flex'>
          <a href={siteUrl} target='_blank' rel='noreferrer'>
            <button className='px-4 py-2  dark:bg-gray-800 dark:hover:bg-gray-700 rounded-3xl border border-gray-500 dark:text-gray-100'>
              Live Site
            </button>
          </a>
          <a href={githubUrl} target='_blank' rel='noreferrer'>
            <button className='px-4 py-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-3xl border border-gray-500 dark:text-gray-100'>
              Github repo
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
