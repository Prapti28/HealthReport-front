import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const features = [
  {
    title: "Report Analysis",
    text: "Upload blood test or medical reports and understand results in simple language.",
  },
  {
    title: "Health Insights",
    text: "Identify abnormal values, track health score, and view important health patterns.",
  },
  {
    title: "Diet Recommendation",
    text: "Get food and lifestyle suggestions based on detected deficiencies or risks.",
  },
  {
    title: "AI Health Assistant",
    text: "Ask questions about your report and receive personalized health guidance.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-wide text-blue-600">
                AI Health Report Analyzer
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
                Understand your medical reports with clarity
              </h1>

              <p className="mb-8 max-w-xl text-base leading-7 text-gray-600">
                Upload your health reports, detect abnormal values, get easy explanations,
                personalized diet suggestions, and track your health over time in one platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="grid gap-4">
                <div className="rounded-2xl bg-gray-100 p-5">
                  <h3 className="mb-2 text-base font-semibold">Health Score</h3>
                  <p className="mb-1 text-3xl font-bold">72 / 100</p>
                  <p className="text-sm text-gray-500">
                    Quick summary of your overall health condition
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <p className="mb-2 text-sm text-gray-500">Hemoglobin</p>
                    <p className="text-lg font-semibold">10.2</p>
                    <p className="mt-1 text-sm text-red-600">Low</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <p className="mb-2 text-sm text-gray-500">Cholesterol</p>
                    <p className="text-lg font-semibold">205</p>
                    <p className="mt-1 text-sm text-amber-600">Slightly High</p>
                  </div>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-gray-900">AI Suggestion</p>
                  <p className="text-sm leading-6 text-gray-700">
                    Increase iron-rich foods like spinach, dates, and beetroot. Reduce oily
                    food and maintain daily physical activity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-6 pb-20">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold">Core Features</h2>
              <p className="text-sm text-gray-600">
                Everything needed to make health reports easier to understand
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-6 text-gray-600">{feature.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;