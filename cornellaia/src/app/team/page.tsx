import ProfileCard from "@/components/ProfileCard";

export default function Team() {
  return (
    <main>
      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="width-full">
          <h1 className="text-4xl font-bold text-cornell-red mb-12">
            Our Team
          </h1>

          {/* Executive Board Section */}
          <div className="mb-16 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-8">Executive Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ProfileCard
                imageSrc="/TEAM_jasmine_li.png"
                name="Jasmine Li"
                role="Full Team Lead"
              />

              <ProfileCard
                imageSrc="/TEAM_jaime_fernandez.jpeg"
                name="Jaime Fernandez"
                role="Co-Lead"
              />
              <ProfileCard
                imageSrc="/TEAM_leo_piff.jpg"
                name="Leonhard Piff"
                role="Intro Fellowship Lead"
              />
              <ProfileCard
                imageSrc="/TEAM_ashton_chew.jpeg"
                name="Ashton Chew"
                role="Outreach Lead"
              />
            </div>
          </div>

          {/* Advisors Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-8">Advisors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileCard
                imageSrc="/TEAM_lionel_levine.jpeg"
                name="Lionel Levine"
                role="Faculty Advisor"
              />
              <ProfileCard
                imageSrc="/TEAM_tzu.webp"
                name="Tzu Kit Chan"
                role="Affiliate Advisor"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
