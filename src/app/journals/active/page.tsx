import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export const revalidate = 3600; // Revalidate every hour

const journalData = [
    { name: 'Sustainability', issn: '2071-1050', launched: 2009, articles: 15420, color: '#4caf50' },
    { name: 'Applied Sciences', issn: '2076-3417', launched: 2011, articles: 12850, color: '#e91e63' },
    { name: 'IJMS', issn: '1422-0067', launched: 2000, articles: 25100, color: '#9c27b0' },
    { name: 'JCM', issn: '2077-0383', launched: 2012, articles: 9840, color: '#2196f3' },
    { name: 'Sensors', issn: '1424-8220', launched: 2001, articles: 18760, color: '#ff9800' },
    { name: 'Molecules', issn: '1420-3049', launched: 1996, articles: 22300, color: '#00bcd4' },
    { name: 'Energies', issn: '1996-1073', launched: 2008, articles: 14200, color: '#ff5722' },
    { name: 'Mathematics', issn: '2227-7390', launched: 2013, articles: 8560, color: '#607d8b' },
    { name: 'Nutrients', issn: '2072-6643', launched: 2009, articles: 13400, color: '#8bc34a' },
    { name: 'Materials', issn: '1996-1944', launched: 2008, articles: 16800, color: '#3f51b5' },
];

export default function ActiveJournalsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-mdpi-gray-bg">
            <Navbar />
            <div className="max-w-[1280px] mx-auto px-4 py-6 w-full grow">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <LeftSidebar />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded border border-mdpi-border p-6 mb-6 shadow-sm">
                            <h1 className="text-2xl font-extrabold text-mdpi-text-dark mb-2">Metademic Journal List</h1>
                            <p className="text-[14px] text-mdpi-gray-text mb-6">
                                Metademic is a pioneer in scholarly open access publishing and currently publishes <strong className="text-mdpi-blue">511 journals</strong> and <strong className="text-mdpi-blue">9 conference proceedings</strong>. Browse all titles below or use the search filters to find specific academic disciplines.
                            </p>
                            
                            <div className="overflow-x-auto border border-mdpi-border rounded">
                                <table className="w-full text-left text-[13px]">
                                    <thead className="bg-[#f8f9fa] text-mdpi-text-dark border-b border-mdpi-border">
                                        <tr>
                                            <th className="px-4 py-3.5 font-bold">#</th>
                                            <th className="px-4 py-3.5 font-bold">Journal Name</th>
                                            <th className="px-4 py-3.5 font-bold text-center">ISSN</th>
                                            <th className="px-4 py-3.5 font-bold text-center">Launched</th>
                                            <th className="px-4 py-3.5 font-bold text-right">Total Articles</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-mdpi-border">
                                        {journalData.map((journal, index) => (
                                            <tr key={journal.name} className="hover:bg-mdpi-blue/[0.02] transition-colors group">
                                                <td className="px-4 py-4 text-mdpi-gray-text">{index + 1}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div 
                                                            className="w-9 h-9 rounded flex items-center justify-center text-white text-[11px] font-extrabold shadow-sm group-hover:scale-105 transition-transform"
                                                            style={{ backgroundColor: journal.color }}
                                                        >
                                                            {journal.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <a href={`/journal/${journal.name.toLowerCase()}`} className="font-bold text-[14px] text-mdpi-blue hover:text-mdpi-blue-dark hover:underline no-underline transition-colors">
                                                                {journal.name}
                                                            </a>
                                                            <span className="text-[11px] text-mdpi-green font-semibold">Open Access</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-mdpi-gray-text text-center font-mono">{journal.issn}</td>
                                                <td className="px-4 py-4 text-mdpi-gray-text text-center">{journal.launched}</td>
                                                <td className="px-4 py-4 text-mdpi-text-dark text-right font-bold truncate">
                                                    {journal.articles.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-6 flex justify-between items-center text-[13px] text-mdpi-gray-text">
                                <span>Showing 1-10 of 511 journals</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 border border-mdpi-border rounded bg-white hover:bg-mdpi-gray-bg disabled:opacity-50">Previous</button>
                                    <button className="px-3 py-1 border border-mdpi-border rounded bg-white hover:bg-mdpi-gray-bg">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-[260px] flex-shrink-0">
                        <RightSidebar />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
