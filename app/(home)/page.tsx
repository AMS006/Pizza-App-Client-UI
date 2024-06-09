import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowBigRight } from 'lucide-react'
import Link from "next/link";
import Testimonials from "./components/testimonials";
import Accordians from "./components/accordians";

export default function Home() {

  return (
    <>
      <section className="bg-white">
        <div className="container flex items-center justify-between py-24">
          <div>
            <h1 className="text-7xl font-black font-sans leading-2">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              <Link href="/menu">
                Order Now
              </Link>
              <ArrowBigRight className="ml-4" size={24} />
            </Button>
          </div>
          <div>
            <Image alt="pizza-main" src={'/pizza-main.png'} width={400} height={400} />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center py-4 text-primary">Testimonials</h1>
          <Testimonials />
        </div>
        <Accordians />
      </section>

    </>
  );
}
