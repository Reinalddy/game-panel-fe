import { useAuth } from "../auth/useAuth";

export default function Dashboard() {
    const { user } = useAuth();

    // dummy hosting data
    const hosting = {
        name: "Hosting Basic",
        status: "Active",
        ip: "103.123.45.67",
        domain: "example.com",
        expires_at: "2026-07-20",
        cpu: 40,
        ram: 60,
        disk: 25,
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-indigo-600 text-white px-6 py-4">
                <h1 className="text-xl font-bold">Game Hosting Panel</h1>
                <p className="text-sm opacity-80">
                    Welcome, {user?.email}
                </p>
            </header>

            <main className="p-6 space-y-6">
                {/* Service Card */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-lg font-bold">
                                {hosting.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Domain: {hosting.domain}
                            </p>
                            <p className="text-sm text-gray-500">
                                IP Address: {hosting.ip}
                            </p>
                        </div>

                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                            {hosting.status}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600">
                        Expired at:{" "}
                        <span className="font-medium">
                            {hosting.expires_at}
                        </span>
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                            Open Console
                        </button>
                        <button className="border px-4 py-2 rounded-lg text-sm">
                            Restart Server
                        </button>
                    </div>
                </div>

                {/* Resource Usage */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ResourceCard
                        title="CPU Usage"
                        value={hosting.cpu}
                        unit="%"
                    />
                    <ResourceCard
                        title="RAM Usage"
                        value={hosting.ram}
                        unit="%"
                    />
                    <ResourceCard
                        title="Disk Usage"
                        value={hosting.disk}
                        unit="%"
                    />
                </div>
            </main>
        </div>
    );
}

function ResourceCard({
    title,
    value,
    unit,
}: {
    title: string;
    value: number;
    unit: string;
}) {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-2">
                {value}
                {unit}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
