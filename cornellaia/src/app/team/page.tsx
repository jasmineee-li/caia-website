import ProfileCard from "@/components/ProfileCard";

export default function Team() {
  return (
    <main>
      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="width-full">
          <h1 className="text-4xl font-bold text-cornell-red mb-12">
            Our Team
          </h1>

          {/* Core Team Section */}
          <div className="mb-16 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-8">Core Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
              <ProfileCard
                imageSrc="/TEAM_jasmine_li.png"
                name="Jasmine Li"
              />
              <ProfileCard
                imageSrc="/TEAM_jonathn_chang.png"
                name="Jonathn Chang"
              />
              <ProfileCard
                imageSrc="/TEAM_suvadip_sana.png"
                name="Suvadip Sana"
              />
              <ProfileCard
                imageSrc="/TEAM_jinzhou_wu.png"
                name="Jinzhou Wu"
              />
              <ProfileCard
                imageSrc="/TEAM_vincent_cheng.png"
                name="Vincent Cheng"
              />
              <ProfileCard
                imageSrc="/TEAM_leo_piff.jpg"
                name="Leonhard Piff"
              />
            </div>
          </div>

          {/* Advisors Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-8">Advisors</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
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
