export default function GetInvolved() {
  return (
    <main>
      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="w-full mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-4xl font-bold text-cornell-red">
              Upcoming Events
            </h1>
            <a
              href="https://luma.com/cornellaia"
              className="bg-cornell-red text-bold text-white px-4 py-3 rounded-lg bg-opacity-90 transition w-auto self-start"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe to our Events Calendar
            </a>
          </div>
          <div className="">
            <iframe
              src="https://luma.com/embed/calendar/cal-NrH7EP037bvvQtm/events?lt=light"
              className="w-full rounded-lg border min-h-[500px]"
              style={{ border: "1px solid #bfcbda88" }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
          <div className="mt-12">
            <h1 className="text-4xl font-bold text-cornell-red mb-8">
              Past Events
            </h1>
            {/* <div className="bg-gray-50 rounded-lg border border-slate-200 px-4 md:px-8 py-6"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                "gZ1HLC8ZVDneIqZ",
                "IXGr5rIHSYR4urE",
                "PLy4Dev5zraVoAo",
                "kObcYzfFqgVPvTN",
                "v9Juq969L7tifIN",
                "SuD0alEFo8h3ea1",
                "UmCIEAb6WnAeZE8",
              ].map(eventId => (
                <iframe
                key={eventId}
                src={`https://luma.com/embed/event/evt-${eventId}/simple`}
                className="rounded-xl shadow-sm w-full h-[500px] lg:h-[450px]"
                style={{ border: "1px solid #cfd8e380" }}
                allow="fullscreen; payment"
                aria-hidden="false"
                tabIndex={0}
                ></iframe>
              ))}
              </div>
            {/* </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}
