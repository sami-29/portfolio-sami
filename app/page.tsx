import Image from "next/image";

import github from "../public/assets/github.webp";
import linkedin from "../public/assets/linkedin.webp";

export default function Home() {
  return (
    <main className='mb-10'>
      <div className='font-mono ml-auto mr-auto mt-24 w-10/12 sm:w-3/4 xl:w-1/2'>
        <h1 className='select-none text-4xl sm:text-5xl md:text-5xl lg:text-6xl dark:text-white '>
          Fullstack web developer creating interactive and responsive websites.
        </h1>
        <p className='text-base md:text-xl  dark:text-gray-400 my-20'>
          Welcome to my portfolio! I am Bentaleb Sami, a full-stack web
          developer with a passion for creating interactive and responsive
          websites. With 3 years of experience in both building projects and
          freelancing, I am a dedicated and skilled developer. As a computer
          science student at the University of Badji Moukhtar Annaba, I am
          constantly expanding my knowledge and experience in the field.
          Let&apos;s work together to bring your next project to life!
        </p>

        <div className='flex content-center space-x-6 w-5/6'>
          <a
            href='https://www.github.com/sami-29'
            target='_blank'
            rel='noreferrer'>
            <button className=' text-gray-800 dark:text-white'>
              <Image
                className='dark:invert'
                src={github}
                alt='github icon'
                width={32}
                height={32}></Image>
            </button>
          </a>
          <a
            href='https://www.linkedin.com/in/sami-bentaleb-a96293221/'
            target='_blank'
            rel='noreferrer'>
            <button className='text-gray-800 dark:text-white'>
              <Image
                className='dark:invert'
                src={linkedin}
                alt='linkedin icon'
                width={32}
                height={32}></Image>
            </button>
          </a>
          <button className='-translate-y-1 px-10  md:px-6 md:py-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-500 rounded-3xl border border-gray-500 dark:text-gray-100'>
            <a
              href='mailto:sami.bentaleb.dev@gmail.com'
              target='_blank'
              rel='noreferrer'>
              Email me
            </a>
          </button>
        </div>
      </div>
    </main>
  );
}
