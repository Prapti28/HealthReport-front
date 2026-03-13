import { NavLink } from "react-router-dom";

const navItems = [
    { name: "Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload Report", path: "/upload-report" },
    { name: "Report Analysis", path: "/report-analysis/1" },
    { name: "Health Insights", path: "/insights" },
    { name: "Health History", path: "/history" },
    { name: "Diet Plan", path: "/dietplan" },
    { name: "AI Health Assistant", path: "/assistant" },
];

const Sidebar = () => {
    return (
        <aside className="hidden min-h-screen w-64 border-r border-gray-200 bg-white md:block">
            <div className="px-6 py-6">
                <h2 className="text-lg font-semibold text-gray-900">AI Health</h2>
                <p className="mt-1 text-sm text-gray-500">Navigation</p>
            </div>

            <nav className="px-4 pb-6">
                <div className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;