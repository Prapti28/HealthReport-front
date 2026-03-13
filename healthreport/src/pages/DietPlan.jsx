import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DietPlanCard from "../components/diet/DietPlanCard";
// import { getDietPlan } from "../services/healthService";

const DietPlan = () => {
  const [dietData, setDietData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const data = await getDietPlan();
        setDietData(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load diet plan");
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlan();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-gray-600">Loading diet plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold">Diet Plan</h1>
              <p className="mt-2 text-sm text-gray-600">
                Personalized food recommendations based on your health report
              </p>
            </div>

            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold">Diet Summary</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {dietData.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DietPlanCard
                title="Recommended Foods"
                items={dietData.recommendedFoods}
                type="good"
              />

              <DietPlanCard
                title="Foods to Avoid"
                items={dietData.foodsToAvoid}
                type="avoid"
              />
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-5 text-lg font-semibold">Daily Meal Plan</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Breakfast</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {dietData.mealPlan.breakfast}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Lunch</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {dietData.mealPlan.lunch}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Dinner</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {dietData.mealPlan.dinner}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Snacks</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {dietData.mealPlan.snacks}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Lifestyle Advice</h2>

              <div className="space-y-3">
                {dietData.lifestyleTips.map((tip, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <p className="text-sm leading-6 text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;