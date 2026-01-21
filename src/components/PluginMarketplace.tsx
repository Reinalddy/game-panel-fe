import { useEffect, useState } from "react";
import { getPlugins, installPlugin } from "../api/plugins";
import type { Plugin } from "../types/plugin";

export default function PluginMarketplace() {
    const [plugins, setPlugins] = useState<Plugin[]>([]);
    const [installed, setInstalled] = useState<number[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const fetchPlugins = async () => {
            const res = await getPlugins({ search, page });

            setPlugins(res.data.data.plugins.data);
            setInstalled(res.data.data.installed);
            setLastPage(res.data.data.plugins.last_page);
        };

        fetchPlugins();
    }, [search, page]);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">
                Plugin Marketplace
            </h2>

            {/* Search */}
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1); // reset page saat search
                }}
                placeholder="Search plugin..."
                className="border p-2 rounded w-full mb-4"
            />

            {/* Plugin List */}
            <div className="grid md:grid-cols-2 gap-4">
                {plugins.map((plugin) => (
                    <div
                        key={plugin.id}
                        className="border rounded-lg p-4"
                    >
                        <h3 className="font-semibold">
                            {plugin.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {plugin.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Version {plugin.version}
                        </p>

                        {installed.includes(plugin.id) ? (
                            <span className="inline-block mt-3 text-green-600 text-sm">
                                Installed
                            </span>
                        ) : (
                            <button
                                onClick={async () => {
                                    await installPlugin(plugin.id);
                                    setInstalled((prev) => [
                                        ...prev,
                                        plugin.id,
                                    ]);
                                }}
                                className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                            >
                                Install
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="text-sm text-gray-600">
                    Page {page} of {lastPage}
                </span>

                <button
                    disabled={page === lastPage}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}