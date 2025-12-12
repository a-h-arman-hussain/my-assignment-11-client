import React from "react";

const successStoriesData = [
  {
    id: 1,
    name: "Alice Johnson",
    university: "Harvard University",
    scholarship: "Global Excellence Scholarship",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    story:
      "Thanks to this scholarship, I could pursue my master's degree at Harvard without financial stress. It completely changed my career path!",
  },
  {
    id: 2,
    name: "Rahim Uddin",
    university: "Stanford University",
    scholarship: "Tech Innovators Fund",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    story:
      "Getting this scholarship allowed me to focus on research and innovation. I highly recommend this platform to aspiring students.",
  },
  {
    id: 3,
    name: "Maria Lopez",
    university: "Oxford University",
    scholarship: "Global Leaders Scholarship",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    story:
      "The application process was smooth, and the support I received was excellent. Today, I am studying my dream course in Oxford!",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStoriesData.map((story) => (
            <div
              key={story.id}
              className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={story.photo}
                  alt={story.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="text-neutral font-semibold">{story.name}</h3>
                  <p className="text-secondary text-sm">{story.university}</p>
                </div>
              </div>
              <p className="text-muted text-sm">{story.story}</p>
              <span className="inline-block mt-4 px-3 py-1 bg-primary rounded-full text-xs font-semibold text-base-100">
                {story.scholarship}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
