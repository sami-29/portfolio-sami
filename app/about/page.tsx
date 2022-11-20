import AboutCard from "../../components/AboutCard";
import cards from "./aboutData";

export default function About() {
  return (
    <main className='mb-10'>
      <div className='flex flex-col font-mono ml-auto mr-auto mt-24 px-4 sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl dark:text-white '>
          About me
        </h1>
        <p className='text-lg dark:text-gray-400 my-10'>
          I am Bentaleb Sami, a 20 year old algerian computer science student at
          the university of Badji Moukhtar Annaba i am currently third year
          which means i&apos;ll get my license diploma this year. <br /> I am
          also mostly a self taught web developer with 3 years of experience
          programming i started out with python, just solving leet code and
          project euler problems and fun projects, then i wanted to specialize
          in web development and i found the easier way is to start with
          frontend so i did just that.
          <br />I have made multiple projects which some of them are listed in
          this website some others are in my github and others are retired
          because i have made them in the start of my learning journey so they
          don&apos;t show the best version of my code.
        </p>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl  dark:text-white '>
          Tools
        </h2>
        <p className='text-base dark:text-white my-10'>
          The tools I use while developing.
        </p>
      </div>
      <div className='select-none px-4 sm:px:0 sm:w-3/4 m-auto grid md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 '>
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
