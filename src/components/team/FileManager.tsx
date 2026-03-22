"use client";

import { File, Image as ImageIcon, FileText, Download, MoreVertical, Upload } from "lucide-react";

const mockFiles = [
  { id: 1, name: "Brand_Guidelines.pdf", size: "2.4 MB", type: "pdf", date: "Oct 12, 2023" },
  { id: 2, name: "Hero_Banner_v2.png", size: "4.1 MB", type: "image", date: "Oct 15, 2023" },
  { id: 3, name: "Q3_SEO_Report.docx", size: "1.1 MB", type: "doc", date: "Oct 18, 2023" },
  { id: 4, name: "Ad_Copy_Variations.xlsx", size: "850 KB", type: "sheet", date: "Oct 20, 2023" },
  { id: 5, name: "Logo_Assets.zip", size: "12.5 MB", type: "archive", date: "Oct 21, 2023" },
];

export default function FileManager() {
  const getIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="text-red-400" size={32} />;
      case "image": return <ImageIcon className="text-blue-400" size={32} />;
      case "doc": return <FileText className="text-blue-500" size={32} />;
      case "sheet": return <File className="text-green-500" size={32} />;
      default: return <File className="text-purple-400" size={32} />;
    }
  };

  return (
    <div className="glass-card flex flex-col h-[600px] overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Project Files
        </h2>
        <button className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl transition-colors text-sm font-medium">
          <Upload size={16} />
          Upload Asset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mockFiles.map((file) => (
          <div key={file.id} className="p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/30 transition-colors flex flex-col group relative">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-muted rounded-xl">
                {getIcon(file.type)}
              </div>
              <button className="text-muted-foreground hover:text-foreground p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <h4 className="font-semibold text-foreground text-sm truncate" title={file.name}>
              {file.name}
            </h4>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{file.size}</span>
              <span>{file.date}</span>
            </div>

            {/* Hover actions */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl gap-2">
              <button className="p-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:scale-105 transition-transform">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
