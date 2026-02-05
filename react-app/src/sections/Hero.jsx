import Button from '../components/Button.jsx';

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home" data-aos="fade-up">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3" data-aos="fade-up" data-aos-delay="120">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Pushkal Vashist <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">AI Enthusiast | Full Stack Developer | Learner</p>
      </div>

      <div
        className="absolute left-0 right-0 w-full z-10 c-space flex justify-center"
        style={{ bottom: '5rem' }}
        data-aos="fade-up"
        data-aos-delay="240">
        <a href="#about" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
