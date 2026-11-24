"use client";

import { Download, Printer } from "lucide-react";
import { profile } from "@/lib/data";
import { Magnetic } from "./Motion";

export default function ResumeActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Magnetic>
        <a href={profile.resumePdf} download className="btn-primary">
          <Download size={16} /> Download PDF
        </a>
      </Magnetic>
      <Magnetic>
        <button onClick={() => window.print()} className="btn-ghost">
          <Printer size={16} /> Print
        </button>
      </Magnetic>
    </div>
  );
}
