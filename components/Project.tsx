import Image, { StaticImageData } from "next/image";

interface ButtonLinkProps {
  link: string | null;
  text: string;
}

function ButtonLink({ link, text }: ButtonLinkProps) {
  if (link === null) {
    return (
      <a>
        <button className='px-4 py-2 ml-4 text-gray-700 bg-gray-400 border border-gray-500 dark:bg-gray-400 rounded-3xl dark:text-gray-100 cursor-no-drop'>
          {text}
        </button>
      </a>
    );
  }
  return (
    <a href={link} target='_blank' rel='noreferrer'>
      <button className='px-4 py-2 ml-4 border border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-3xl dark:text-gray-100'>
        {text}
      </button>
    </a>
  );
}

interface Props {
  img: StaticImageData;
  title: string;
  description: string;
  siteUrl: string | null;
  githubUrl: string | null;
}

export default function Project({
  img,
  title,
  description,
  siteUrl,
  githubUrl,
}: Props) {
  return (
    <div>
      <div className='border-purple-200 rounded-xl md:border-t-24 md:border-x-24 dark:border-purple-300'>
        <Image src={img} alt={`${title} image`} />
      </div>

      <div className='m-auto my-12 mb-32 sm:w-4/5'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl dark:text-gray-200'>
          {title}
        </h2>
        <p className='my-6 mb-10 ml-6 text-lg dark:text-gray-400'>
          {description}
        </p>
        <div className='flex'>
          <ButtonLink link={siteUrl} text='Live Site' />
          <ButtonLink link={githubUrl} text='Github repo' />
        </div>
      </div>
    </div>
  );
}
