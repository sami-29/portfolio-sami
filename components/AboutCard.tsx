import Image, { StaticImageData } from "next/image";

interface props {
  src: StaticImageData;
  title: string;
  description: string;
}

export default function AboutCard({ src, title, description }: props) {
  return (
    <div className='cursor-pointer md:pt-2 bg-white md:hover:bg-gray-300 dark:md:hover:bg-gray-700  flex h-40 sm:h-32 pl-3 md:pl-0 rounded-lg  md:flex-col md:h-64 bg-inherit border-2 dark:md:bg-gray-800 dark:bg-inherit border-gray-600'>
      <Image
        className='h-auto mr-2 my-auto md:h-1/2 md:w-auto w-20 md:m-auto '
        src={src}
        alt={title}
      />
      <div className='my-auto md:h-1/2 md:mt-4 p-2 dark:md:bg-gray-900 rounded-lg rounded-t-none'>
        <h3 className='text-xl dark:text-white'>{title}</h3>
        <p className='text-sm dark:text-gray-400'>{description}</p>
      </div>
    </div>
  );
}
