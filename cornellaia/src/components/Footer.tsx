export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="flex gap-4 mb-4">
            <span className="text-gray-600">
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
          </div>
          {/* <div className="text-sm text-gray-600">
            <p>Registered student organization of Cornell University.</p>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
