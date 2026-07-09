import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="grid lg:grid-cols-2 gap-12 items-center py-20">

      <div>
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
          Discover books.
          <br />
          Exchange stories.
          <br />
          Meet readers.
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-lg">
          BookSwap is a community-driven book exchange app
          connecting readers through the books they love.
        </p>


        <div className="mt-8 flex gap-4">
          <Button>
            Join Waitlist
          </Button>

          <Button variant="secondary">
            Explore App
          </Button>
        </div>
      </div>


      <div className="
        relative
        h-[520px]
        rounded-[40px]
        bg-purple-100
        flex
        items-center
        justify-center
      ">

        <div className="
          w-[260px]
          h-[500px]
          rounded-[36px]
          bg-white
          shadow-xl
          border
          flex
          items-center
          justify-center
        ">
          <p className="text-gray-400">
            App Preview
          </p>
        </div>

      </div>

    </section>
  );
}