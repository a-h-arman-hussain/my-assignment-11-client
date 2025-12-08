import React, { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    position: "Masters in CS Student",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    message:
      "This platform helped me find scholarships I never knew existed. Highly recommended!",
  },
  {
    id: 2,
    name: "Sophia Lee",
    position: "PhD Student",
    photo: "https://randomuser.me/api/portraits/women/31.jpg",
    message:
      "The scholarship applications were simple and fast. I got funded in no time!",
  },
  {
    id: 3,
    name: "Michael Smith",
    position: "MBA Student",
    photo: "https://randomuser.me/api/portraits/men/28.jpg",
    message:
      "Thanks to the guidance here, I successfully secured my dream scholarship abroad.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonialsData.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <section className="py-12 bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Testimonials</h2>

        <div className="relative max-w-xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${
                index === current ? "block" : "hidden"
              } bg-gray-700 p-6 rounded-2xl shadow-lg transition`}
            >
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-yellow-400"
              />
              <p className="text-gray-300 mb-4">"{testimonial.message}"</p>
              <h3 className="text-white font-semibold">{testimonial.name}</h3>
              <p className="text-yellow-400 text-sm">{testimonial.position}</p>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
