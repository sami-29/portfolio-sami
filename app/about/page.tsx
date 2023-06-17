import AboutCard from "../../components/AboutCard";
import cards from "./aboutData";

export default function About() {
  return (
    <main className='mb-10'>
      <div className='flex flex-col px-4 mt-24 ml-auto mr-auto font-mono sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl dark:text-white '>
          About me
        </h1>
        <p className='my-10 text-lg dark:text-gray-400'>
          Welcome to my portfolio! My name is Bentaleb Sami, a full-stack web
          developer with a passion for creating visually appealing and
          user-friendly websites. With 4 years of experience in both building
          projects and freelancing, I am a dedicated and skilled developer who
          is always looking for new challenges. As a computer science student at
          the University of Badji Moukhtar Annaba, I am constantly expanding my
          knowledge and experience in the field.
          <br /> I specialize in creating interactive and responsive websites
          that are not only visually stunning, but also easy to navigate and
          use. I have a strong understanding of web development technologies
          such as HTML, CSS, JavaScript, and various frameworks and libraries. I
          also have experience working with various back-end technologies such
          as Node.js and PHP, ensuring that your website not only looks great
          but also functions smoothly. <br /> I take pride in my attention to
          detail and strive to deliver high-quality work. I am a strong
          collaborator and communicator, and I enjoy working with clients to
          understand their needs and bring their vision to life.
          <br />
          Take a look at my portfolio to see some of my previous work and
          don&apos;t hesitate to contact me if you have any questions or are
          interested in working together. Let&apos;s bring your next project to
          life!
        </p>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl dark:text-white '>
          Tools
        </h2>
        <p className='my-10 text-base dark:text-white'>
          The tools I use while developing.
        </p>
      </div>
      <div className='grid px-4 m-auto select-none sm:px:0 sm:w-3/4 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 '>
        {cards.map((card, index) => {
          return (
            <AboutCard
              key={index}
              src={card.src}
              title={card.title}
              description={card.description}
            />
          );
        })}
      </div>
    </main>
  );
}
