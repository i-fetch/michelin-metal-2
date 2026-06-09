// ProductAuditPage.tsx
"use client";
import { INITIAL_PRODUCTS } from '@/lib/mockData'
import { AlertTriangle, Edit, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation';

const ProductAuditPage = () => {
    const router = useRouter();
    return (
        <div>
            <div className="space-y-6 text-left" id="subview-admin-products">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-bebas text-3xl text-tx-primary tracking-wide">Listing Master Audit List</h2>
                        <p className="text-xs text-tx-secondary">Total active database components with full schema validation guidelines.</p>
                    </div>

                    <button
                        onClick={() => router.push("/admin/products-auditing/new")}
                        className="cursor-pointer inline-flex items-center space-x-1.5 text-tx-secondary rounded-lg bg-green-brand px-4 py-2.5 text-xs font-semibold uppercase tracking-wider shadow hover:bg-green-brand/90 transition-all self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add New Material</span>
                    </button>
                </div>

                {/* Master List table */}
                <div className="rounded-xl border border-border-subtle bg-white overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-bg-subtle border-b border-border-subtle text-tx-muted uppercase font-semibold">
                                    <th className="py-3 px-4">Material Identity</th>
                                    <th className="py-3 px-4">Classification</th>
                                    <th className="py-3 px-4">Purity specs</th>
                                    <th className="py-3 px-4">Min order (MOQ)</th>
                                    <th className="py-3 px-4">Hazard ADR</th>
                                    <th className="py-3 px-4 text-center">Form Audit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-tx-secondary">
                                {INITIAL_PRODUCTS.map((p) => (
                                    <tr key={p._id} className="hover:bg-bg-subtle/40 transition-colors">
                                        {/* Product Title detail */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={p.images?.[0]}
                                                    className="h-9 w-12 object-cover rounded bg-gray-100 border flex-shrink-0"
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div>
                                                    <span
                                                        onClick={() => {}}
                                                        className="cursor-pointer font-bold text-tx-primary hover:text-green-brand transition-colors block text-sm"
                                                    >
                                                        {p.title}
                                                    </span>
                                                    <span className="font-mono-custom text-[10px] text-tx-muted uppercase block">
                                                        Slug: {p.slug}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* category */}
                                        <td className="py-4 px-4">
                                            <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-tx-secondary uppercase">
                                                {p.category.name}
                                            </span>
                                        </td>

                                        {/* purity */}
                                        <td className="py-4 px-4 font-mono-custom font-semibold text-tx-primary">
                                            {p.specs.purity || "Standard"}
                                        </td>

                                        {/* MOQ */}
                                        <td className="py-4 px-4 font-mono-custom text-tx-primary">
                                            {p.moq.value} {p.moq.unit.toUpperCase()}
                                        </td>

                                        {/* hazard */}
                                        <td className="py-4 px-4 font-mono-custom">
                                            <span className="inline-flex items-center space-x-1 max-w-[150px] truncate" title={p.specs.hazardCompliance}>
                                                <AlertTriangle className="h-3 w-3 text-gold-brand flex-shrink-0" />
                                                <span className="text-[10px] truncate">{p.specs.hazardCompliance || "Generic"}</span>
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() => {}}
                                                    className="cursor-pointer p-1.5 rounded-md hover:bg-green-alpha hover:text-green-brand transition-colors text-tx-secondary"
                                                    title="Modify spec sheet schema"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => {}}
                                                    className="cursor-pointer p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors text-tx-secondary"
                                                    title="Wipe from mock cluster"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductAuditPage