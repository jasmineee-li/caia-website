export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Learning Resources</h1>

      {/* PhD Students - Deep Learning */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          For PhD Students (Deep Learning)
        </h2>
        <div className="space-y-6">
          {/* Recommended Papers sections */}
          <div>
            <h3 className="text-xl font-medium mb-3">Recommended Papers</h3>

            <div className="ml-4">
              <h4 className="font-medium mb-2">General</h4>
              <a
                href="https://arxiv.org/abs/2109.13916"
                className="text-blue-600 hover:underline block"
              >
                Unsolved Problems in ML Safety
              </a>
            </div>

            {/* Additional paper categories */}
            <div className="ml-4 mt-4">
              <h4 className="font-medium mb-2">Adversarial Robustness</h4>
              {/* Add adversarial papers links */}
            </div>

            {/* Continue with other categories... */}
          </div>
        </div>
      </section>

      {/* PhD Students - Non-Deep Learning */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          For PhD Students (Math/Physics)
        </h2>
        <div className="space-y-4">
          <a
            href="https://sites.krieger.jhu.edu/jared-kaplan/files/2019/04/ContemporaryMLforPhysicists.pdf"
            className="text-blue-600 hover:underline block"
          >
            Contemporary ML for Physicists by Jared Kaplan
          </a>
        </div>
      </section>

      {/* Undergrad/Masters Students */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          For Undergrad/Masters Students
        </h2>

        {/* Textbooks & Course Notes */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3">Textbooks & Course Notes</h3>
          <div className="space-y-2 ml-4">
            <a
              href="https://www.aisafetybook.com/"
              className="text-blue-600 hover:underline block"
            >
              Introduction to AI Safety, Ethics, and Society
            </a>
            <a
              href="https://pratikac.github.io/pub/23_ese546.pdf"
              className="text-blue-600 hover:underline block"
            >
              ESE 5460 (Fall 2023)
            </a>
          </div>
        </div>

        {/* ARENA Curriculum */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3">ARENA Curriculum</h3>
          <div className="space-y-2 ml-4">
            <a
              href="https://arena3-chapter0-fundamentals.streamlit.app/"
              className="text-blue-600 hover:underline block"
            >
              Part 0: Introduction to PyTorch
            </a>
            {/* Add other ARENA links */}
          </div>
        </div>
      </section>
    </div>
  );
}
