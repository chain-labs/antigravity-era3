"use client";

import { Gradients } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";

type TableProps = {
  header: React.ReactNode[];
  body: Array<React.ReactNode[]>;
};

export default function Table({ header, body }: TableProps) {
  return (
    <div className="max-h-[300px] max-w-[80vw] w-full lg:w-fit overflow-y-auto [scroll-snap-type]:[y_mandatory] rounded-[6px] mr-[8px]">
      <table>
        <thead>
          <tr>
            {header.map((head, i) => (
              <th
                key={i}
                className={cn(Gradients.redToBlue, "p-[1px] sticky top-0 z-10")}
              >
                <div className={cn("bg-agblack", "px-[12px] py-[10px]")}>
                  <div
                    className={cn(
                      Gradients.whiteGradientText,
                      "uppercase tracking-widest text-[14px] leading-[24px] font-sans",
                      "[&_svg]:text-[24px]",
                      "grid grid-flow-col gap-[8px]",
                      "text-nowrap",
                      "[&_img]:[min-w-[24px] min-h-[24px]]",
                    )}
                  >
                    {head}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(Gradients.tableBlue, "relative")}>
          {body.map((row, i) => (
            <tr key={i} className="[scroll-snap-align]:[start]">
              {row.map((cell, j) => (
                <td key={j} className="border-[1px] border-agpurple">
                  <div
                    className={cn(
                      "uppercase tracking-widest text-[14px] font-general-sans font-medium",
                      "[&_svg]:text-[24px]",
                      "flex gap-[8px]",
                      "px-[12px] py-[10px]",
                    )}
                  >
                    {cell}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
