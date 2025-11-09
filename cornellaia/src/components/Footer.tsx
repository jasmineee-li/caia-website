export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
            <div className="flex flex-col gap-1 mb-2 text-gray-600">
            <span>
              Email us at{" "}
              <a
              href="mailto:cornellaialignment@gmail.com"
              className="text-cornell-red hover:text-gray-600"
              >
              cornellaialignment@gmail.com
              </a>
            </span>
            {/* <a
              href="https://instagram.com/cornellaia"
              className="text-gray-600 hover:text-cornell-red"
            >
              Instagram
            </a> */}
            <p>
              This organization is a registered student organization of Cornell
              University.
            </p>
            <a
              href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
              className="text-cornell-red hover:text-gray-600 underline"
            >
              Equal Education &amp; Employment
            </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
